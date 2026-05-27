import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { 
  fetchLeads, 
  updateLeadStatus, 
  deleteLead 
} from '../utils/firebaseHelper';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('blisstown_admin_authenticated') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State: 'contacts' | 'newsletters'
  const [activeTab, setActiveTab] = useState('contacts');
  
  // Leads Data States
  const [contactLeads, setContactLeads] = useState([]);
  const [newsletterLeads, setNewsletterLeads] = useState([]);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // UI Notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const contacts = await fetchLeads('contacts');
      const newsletters = await fetchLeads('newsletters');
      setContactLeads(contacts);
      setNewsletterLeads(newsletters);
    } catch (error) {
      console.error('Error fetching leads from Firebase:', error);
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      sessionStorage.setItem('blisstown_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
      triggerToast('Access granted. Welcome back, Admin.');
    } catch (error) {
      console.error('Authentication failed:', error);
      setLoginError('Invalid email or password. Please verify and try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('blisstown_admin_authenticated');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    triggerToast('Logged out of admin ledger.');
  };

  // Clear all data for active tab
  const handleClearAllData = async () => {
    const colName = activeTab === 'contacts' ? 'contacts' : 'newsletters';
    const typeLabel = activeTab === 'contacts' ? 'contact inquiries' : 'newsletter subscribers';
    
    if (window.confirm(`Are you sure you want to purge all ${typeLabel} from Firestore? This cannot be undone.`)) {
      triggerToast(`Purging ${typeLabel} database...`);
      try {
        const listToClear = activeTab === 'contacts' ? contactLeads : newsletterLeads;
        for (const lead of listToClear) {
          await deleteLead(colName, lead.id);
        }
        loadAllData();
        triggerToast(`All ${typeLabel} records purged from Firestore`);
      } catch (error) {
        console.error('Error purging data:', error);
        triggerToast('Failed to purge data');
      }
    }
  };

  // Contact Lead Handlers
  const handleContactStatusChange = async (id, newStatus) => {
    try {
      await updateLeadStatus('contacts', id, newStatus);
      loadAllData();
      triggerToast(`Inquiry status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const handleContactDelete = async (id) => {
    if (window.confirm('Delete this contact inquiry permanently?')) {
      try {
        await deleteLead('contacts', id);
        loadAllData();
        triggerToast('Inquiry lead deleted');
      } catch (error) {
        console.error('Error deleting contact lead:', error);
      }
    }
  };

  // Newsletter Lead Handlers
  const handleNewsletterStatusChange = async (id, newStatus) => {
    try {
      await updateLeadStatus('newsletters', id, newStatus);
      loadAllData();
      triggerToast(`Subscriber status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating subscriber status:', error);
    }
  };

  const handleNewsletterDelete = async (id) => {
    if (window.confirm('Remove this newsletter subscriber permanently?')) {
      try {
        await deleteLead('newsletters', id);
        loadAllData();
        triggerToast('Subscriber email removed');
      } catch (error) {
        console.error('Error deleting subscriber:', error);
      }
    }
  };

  // CSV Export Utility
  const handleExportCSV = () => {
    let headers = [];
    let rows = [];
    let filename = '';

    if (activeTab === 'contacts') {
      headers = ['ID', 'Date Submitted', 'Name', 'Email', 'Subject', 'Message', 'Status'];
      rows = contactLeads.map(l => [
        l.id,
        new Date(l.date).toLocaleString(),
        l.name,
        l.email,
        l.subject,
        l.message.replace(/"/g, '""'),
        l.status
      ]);
      filename = 'blisstown_contact_inquiries.csv';
    } else {
      headers = ['ID', 'Date Joined', 'Email', 'Status'];
      rows = newsletterLeads.map(l => [
        l.id,
        new Date(l.date).toLocaleString(),
        l.email,
        l.status
      ]);
      filename = 'blisstown_newsletter_subscribers.csv';
    }

    // Compile CSV Content
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    triggerToast(`Exported ${activeTab} data to CSV`);
  };

  // Helper to format Date
  const formatDate = (isoString) => {
    try {
      const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(isoString).toLocaleDateString('en-US', options);
    } catch (e) {
      return 'N/A';
    }
  };

  // Dynamic statistics calculations
  const stats = {
    totalContacts: contactLeads.length,
    newContacts: contactLeads.filter(l => l.status === 'New').length,
    totalNewsletters: newsletterLeads.length,
  };

  // Filter & Search Logic
  const getFilteredContacts = () => {
    return contactLeads.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.message.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredNewsletters = () => {
    return newsletterLeads.filter(lead => {
      const matchesSearch = lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-dashboard-page login-page-layout">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="admin-toast glass-panel">
            <span className="material-symbols-outlined toast-icon">info</span>
            <span className="toast-text">{toastMessage}</span>
          </div>
        )}

        <div className="login-container glass-panel-heavy">
          <div className="login-logo-block">
            <img src="/logo.png" alt="Blisstown Logo" className="login-logo-img" />
            <span className="login-logo-subtitle">Secure Access Portal</span>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {loginError && (
              <div className="login-error-message">
                <span className="material-symbols-outlined error-icon">warning</span>
                <span>{loginError}</span>
              </div>
            )}

            <div className="login-form-group">
              <label className="font-label-sm login-label" htmlFor="login-username">Admin Email</label>
              <input
                type="email"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ENTER ADMIN EMAIL"
                required
                className="login-input"
              />
            </div>

            <div className="login-form-group">
              <label className="font-label-sm login-label" htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER PASSWORD"
                required
                className="login-input"
              />
            </div>

            <button type="submit" className="btn-gold-border login-submit-btn">
              Authenticate
            </button>
          </form>

          <div className="login-footer">
            <button className="login-back-btn" onClick={() => navigate('/')}>
              <span className="material-symbols-outlined">arrow_back</span> Return to Public Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="admin-toast glass-panel">
          <span className="material-symbols-outlined toast-icon">info</span>
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Admin Navigation Header */}
      <header className="admin-nav-header">
        <div className="admin-nav-container">
          <div className="admin-logo-block">
            <img src="/logo.png" alt="Blisstown Logo" className="admin-logo-img" />
            <span className="admin-logo-text">Ledger</span>
          </div>

          <div className="admin-header-actions">
            <button className="btn-secondary admin-header-btn purge-btn" onClick={handleClearAllData}>
              <span className="material-symbols-outlined">delete_sweep</span> Purge All
            </button>
            <button className="btn-gold-border admin-home-btn" onClick={() => { handleLogout(); navigate('/'); }}>
              <span className="material-symbols-outlined">home</span> PUBLIC SITE
            </button>
            <button className="btn-secondary admin-header-btn purge-btn" onClick={handleLogout} style={{ color: 'var(--on-surface-variant)', borderBottomColor: 'transparent' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>logout</span> LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Wrapper */}
      <main className="admin-main container">
        
        {/* Live Performance Stats Banner */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card glass-panel">
            <div className="stat-card-header">
              <span className="font-label-sm stat-label">Total Inquiries</span>
              <span className="material-symbols-outlined stat-icon">chat</span>
            </div>
            <div className="stat-card-value font-headline-lg">
              {stats.totalContacts}
            </div>
            <div className="stat-card-footer">
              <span className="stat-subtext font-label-sm">
                RECORDS IN LEDGER
              </span>
            </div>
          </div>

          <div className="admin-stat-card glass-panel">
            <div className="stat-card-header">
              <span className="font-label-sm stat-label">New Queries</span>
              <span className="material-symbols-outlined stat-icon">mark_chat_unread</span>
            </div>
            <div className="stat-card-value font-headline-lg">
              {stats.newContacts}
            </div>
            <div className="stat-card-footer">
              <span className="stat-subtext font-label-sm">
                <strong className="status-badge new">{stats.newContacts}</strong> ACTION REQUIRED
              </span>
            </div>
          </div>

          <div className="admin-stat-card glass-panel">
            <div className="stat-card-header">
              <span className="font-label-sm stat-label">Newsletter Subscribers</span>
              <span className="material-symbols-outlined stat-icon">mail</span>
            </div>
            <div className="stat-card-value font-headline-lg">
              {stats.totalNewsletters}
            </div>
            <div className="stat-card-footer">
              <span className="stat-subtext font-label-sm">
                ACTIVE MEMBERS
              </span>
            </div>
          </div>
        </section>

        {/* Lead Management Section */}
        <section className="admin-leads-section glass-panel">
          
          {/* Tab Selection Row */}
          <div className="admin-tabs-row">
            <div className="admin-tabs">
              <button 
                className={`admin-tab-btn font-label-sm ${activeTab === 'contacts' ? 'active' : ''}`}
                onClick={() => { setActiveTab('contacts'); setSearchQuery(''); setStatusFilter('All'); }}
              >
                Contact Queries <span className="tab-count-badge">{stats.totalContacts}</span>
              </button>
              <button 
                className={`admin-tab-btn font-label-sm ${activeTab === 'newsletters' ? 'active' : ''}`}
                onClick={() => { setActiveTab('newsletters'); setSearchQuery(''); setStatusFilter('All'); }}
              >
                Newsletter Signups <span className="tab-count-badge">{stats.totalNewsletters}</span>
              </button>
            </div>

            <div className="admin-tab-actions">
              <button className="btn-gold-border export-csv-btn" onClick={handleExportCSV}>
                <span className="material-symbols-outlined">download</span> EXPORT CSV
              </button>
            </div>
          </div>

          {/* Filtering and Search Area */}
          <div className="admin-filters-row">
            <div className="search-bar-container">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                type="text"
                className="admin-search-input"
                placeholder={
                  activeTab === 'contacts' ? 'Search name, email, subject, message...' : 'Search subscriber email...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filters-group">
              {/* Status Filter */}
              <div className="filter-item">
                <label className="font-label-sm filter-label">Status</label>
                <select 
                  className="admin-filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  {activeTab === 'contacts' ? (
                    <>
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Archived">Archived</option>
                    </>
                  ) : (
                    <>
                      <option value="Active">Active</option>
                      <option value="Unsubscribed">Unsubscribed</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="admin-table-container">
            
            {/* Contact Queries Table */}
            {activeTab === 'contacts' && (
              <>
                {getFilteredContacts().length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th className="font-label-sm text-left">Date / ID</th>
                        <th className="font-label-sm text-left">Sender Details</th>
                        <th className="font-label-sm text-left">Subject</th>
                        <th className="font-label-sm text-left">Detailed Request Message</th>
                        <th className="font-label-sm text-left">Status</th>
                        <th className="font-label-sm text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredContacts().map(lead => (
                        <tr key={lead.id} className="admin-table-row">
                          <td>
                            <div className="table-cell-date">{formatDate(lead.date)}</div>
                            <div className="table-cell-id">{lead.id}</div>
                          </td>
                          <td>
                            <div className="table-cell-name">{lead.name}</div>
                            <div className="table-cell-contact-info">
                              <span><span className="material-symbols-outlined small-icon">mail</span> {lead.email}</span>
                            </div>
                          </td>
                          <td>
                            <div className="table-cell-subject">{lead.subject}</div>
                          </td>
                          <td>
                            <div className="table-cell-message-text">{lead.message}</div>
                          </td>
                          <td>
                            <select 
                              className={`status-selector-dropdown ${lead.status.replace(/\s+/g, '-').toLowerCase()}`}
                              value={lead.status}
                              onChange={(e) => handleContactStatusChange(lead.id, e.target.value)}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td>
                            <div className="table-actions-cell">
                              <button 
                                className="table-action-icon-btn delete" 
                                title="Delete Record"
                                onClick={() => handleContactDelete(lead.id)}
                              >
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="table-empty-state">
                    <span className="material-symbols-outlined empty-icon">mark_chat_unread</span>
                    <h4 className="empty-heading font-headline-md">No Inquiries Found</h4>
                    <p className="empty-desc font-body-md">There are no contact inquiries matching your search criteria.</p>
                  </div>
                )}
              </>
            )}

            {/* Newsletter Subscribers Table */}
            {activeTab === 'newsletters' && (
              <>
                {getFilteredNewsletters().length > 0 ? (
                  <table className="admin-table small-table">
                    <thead>
                      <tr>
                        <th className="font-label-sm text-left">Subscription Date</th>
                        <th className="font-label-sm text-left">Record ID</th>
                        <th className="font-label-sm text-left">Registered Email Address</th>
                        <th className="font-label-sm text-left">Status</th>
                        <th className="font-label-sm text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredNewsletters().map(lead => (
                        <tr key={lead.id} className="admin-table-row">
                          <td>
                            <div className="table-cell-date">{formatDate(lead.date)}</div>
                          </td>
                          <td>
                            <div className="table-cell-id">{lead.id}</div>
                          </td>
                          <td>
                            <div className="table-cell-email font-body-md">{lead.email}</div>
                          </td>
                          <td>
                            <select 
                              className={`status-selector-dropdown ${lead.status.toLowerCase()}`}
                              value={lead.status}
                              onChange={(e) => handleNewsletterStatusChange(lead.id, e.target.value)}
                            >
                              <option value="Active">Active</option>
                              <option value="Unsubscribed">Unsubscribed</option>
                            </select>
                          </td>
                          <td>
                            <div className="table-actions-cell">
                              <button 
                                className="table-action-icon-btn delete" 
                                title="Delete Record"
                                onClick={() => handleNewsletterDelete(lead.id)}
                              >
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="table-empty-state">
                    <span className="material-symbols-outlined empty-icon">unsubscribe</span>
                    <h4 className="empty-heading font-headline-md">No Subscribers Found</h4>
                    <p className="empty-desc font-body-md">There are no email newsletter leads currently matching.</p>
                  </div>
                )}
              </>
            )}

          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;
