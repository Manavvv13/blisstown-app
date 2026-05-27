// LocalStorage helper for Blisstown Lead Management System

const CONTACT_KEY = 'blisstown_contact_leads';
const NEWSLETTER_KEY = 'blisstown_newsletter_leads';
const TOUR_KEY = 'blisstown_tour_leads';

// Helper to get items
export const getContactLeads = () => {
  const data = localStorage.getItem(CONTACT_KEY);
  return data ? JSON.parse(data) : [];
};

export const getNewsletterLeads = () => {
  const data = localStorage.getItem(NEWSLETTER_KEY);
  return data ? JSON.parse(data) : [];
};

export const getTourLeads = () => {
  const data = localStorage.getItem(TOUR_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save items
export const saveContactLeads = (leads) => {
  localStorage.setItem(CONTACT_KEY, JSON.stringify(leads));
};

export const saveNewsletterLeads = (leads) => {
  localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(leads));
};

export const saveTourLeads = (leads) => {
  localStorage.setItem(TOUR_KEY, JSON.stringify(leads));
};

// Add lead methods
export const addContactLead = (lead) => {
  const leads = getContactLeads();
  const newLead = {
    id: 'contact_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    status: 'New',
    ...lead
  };
  leads.unshift(newLead);
  saveContactLeads(leads);
  return newLead;
};

export const addNewsletterLead = (email) => {
  const leads = getNewsletterLeads();
  // Avoid duplicates
  if (leads.some(l => l.email.toLowerCase() === email.toLowerCase())) {
    return null;
  }
  const newLead = {
    id: 'newsletter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    email,
    date: new Date().toISOString(),
    status: 'Active'
  };
  leads.unshift(newLead);
  saveNewsletterLeads(leads);
  return newLead;
};

export const addTourLead = (lead) => {
  const leads = getTourLeads();
  const newLead = {
    id: 'tour_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    status: 'Pending',
    ...lead
  };
  leads.unshift(newLead);
  saveTourLeads(leads);
  return newLead;
};

// Generate Mock Data
export const generateMockLeads = () => {
  const mockContacts = [
    {
      id: 'contact_mock_1',
      name: 'Alistair Sterling',
      email: 'a.sterling@sterlingholdings.com',
      subject: 'Penthouse Pricing & Availability',
      message: 'I am interested in acquiring one of the duplex penthouses at Blisstown. Please share the floor plans, pricing sheets, and confirm if we can arrange a viewing next Thursday.',
      date: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
      status: 'New'
    },
    {
      id: 'contact_mock_2',
      name: 'Dr. Evelyn Vane',
      email: 'evelyn.vane@londonsurgery.co.uk',
      subject: 'Investment Query - 4BHK Villas',
      message: 'Looking to purchase three residential villas for my family portfolio. Do you offer bespoke customization options for interior finishes during the pre-construction phase?',
      date: new Date(Date.now() - 3600000 * 28).toISOString(), // 28 hours ago
      status: 'In Progress'
    },
    {
      id: 'contact_mock_3',
      name: 'Marcus Chen',
      email: 'mchen@apexglobal.sg',
      subject: 'Corporate Relocation Inquiry',
      message: 'We are looking to secure a block of premium residences for our executive team relocating from Singapore. Need detailed brochures and commercial terms.',
      date: new Date(Date.now() - 3600000 * 120).toISOString(), // 5 days ago
      status: 'Archived'
    }
  ];

  const mockNewsletters = [
    { id: 'news_mock_1', email: 'vip.investor@monacowealth.mc', date: new Date(Date.now() - 3600000 * 2).toISOString(), status: 'Active' },
    { id: 'news_mock_2', email: 'sarah.jenkins@curatedspaces.com', date: new Date(Date.now() - 3600000 * 12).toISOString(), status: 'Active' },
    { id: 'news_mock_3', email: 'richard.falk@heritagegroup.ae', date: new Date(Date.now() - 3600000 * 72).toISOString(), status: 'Active' },
    { id: 'news_mock_4', email: 'd.rossi@milanodesign.it', date: new Date(Date.now() - 3600000 * 144).toISOString(), status: 'Unsubscribed' }
  ];

  const mockTours = [
    {
      id: 'tour_mock_1',
      name: 'Lady Victoria Cavenham',
      email: 'v.cavenham@cavenhamestates.com',
      phone: '+44 7700 900077',
      preferredDate: '2026-06-15',
      preferredTime: 'Afternoon (2 PM - 5 PM)',
      residenceType: 'Duplex Penthouse',
      date: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
      status: 'Pending'
    },
    {
      id: 'tour_mock_2',
      name: 'Vikram Malhotra',
      email: 'vikram@malhotragroup.in',
      phone: '+91 98100 12345',
      preferredDate: '2026-06-02',
      preferredTime: 'Morning (10 AM - 12 PM)',
      residenceType: '4BHK Signature Villa',
      date: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hours ago
      status: 'Confirmed'
    },
    {
      id: 'tour_mock_3',
      name: 'Elena Rostova',
      email: 'elena.rostova@genevafamilyoffice.ch',
      phone: '+41 22 789 4556',
      preferredDate: '2026-06-25',
      preferredTime: 'Evening (5 PM - 7 PM)',
      residenceType: 'Sky Mansion',
      date: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
      status: 'Pending'
    }
  ];

  saveContactLeads(mockContacts);
  saveNewsletterLeads(mockNewsletters);
  saveTourLeads(mockTours);
};
