import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPage.css';

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState('project'); // 'project', 'site', 'unit'
  const [modalImage, setModalImage] = useState(null); // holds image src when modal is open

  useEffect(() => {
    // Reveal on scroll logic
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const openLightbox = (src) => {
    setModalImage(src);
  };

  const closeLightbox = () => {
    setModalImage(null);
  };

  return (
    <div className="project-page">
      {/* Page Header */}
      <section className="project-header">
        <div className="container">
          <h1 className="font-display-xl project-page-title reveal-up">Projects</h1>
          <nav className="project-breadcrumb reveal-up">
            <Link to="/" className="breadcrumb-item" style={{ textDecoration: 'none' }}>Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">Projects</span>
          </nav>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="project-detail-section section">
        <div className="container">
          <div className="project-intro-block text-center reveal-up">
            <span className="font-subheading-lg">Our Projects</span>
            <h2 className="font-headline-lg project-subtitle">Our Ongoing Residential Projects</h2>
            <h3 className="font-headline-md project-group-company">
              JMDR Arihant Green <em>- by Bliss Town Developers (Our Group Company)</em>
            </h3>
          </div>

          <div className="project-desc-grid reveal-up">
            <div className="desc-card glass-panel">
              <p className="font-body-lg">
                In today's scenario, home ownership is slipping out of reach for many middle-class families, with prices rising beyond
                affordability. Recognizing this challenge, Bliss Town Developers introduces a project that makes owning a dream home
                possible again - without compromising on quality, design or lifestyle.
              </p>
            </div>
            <div className="desc-card glass-panel">
              <p className="font-body-md">
                Presenting JMDR Arihant Green - an address that perfectly blends affordability with modern living. Strategically located in
                Sector 1, Noida-Greater Noida West, the project offers the ideal balance of comfort, convenience and aesthetics, making
                it a standout choice for today's aspiring homeowners.
              </p>
              <p className="font-body-md">
                Located in the heart of Greater Noida West's prime Sector 1, JMDR Arihant Green enjoys excellent connectivity to Delhi, Ghaziabad and Central Noida. With leading schools, hospitals, corporate hubs, malls and entertainment zones nearby, this address is set to become one of the most sought after residential destinations in NCR.
              </p>
            </div>
          </div>

          {/* Interactive Showcase Section */}
          <div className="project-showcase reveal-up">
            <div className="showcase-tabs">
              <button 
                className={`showcase-tab ${activeTab === 'project' ? 'active' : ''}`}
                onClick={() => setActiveTab('project')}
              >
                <span>Blisstown JMDR Arihant Green</span>
              </button>
              <button 
                className={`showcase-tab ${activeTab === 'site' ? 'active' : ''}`}
                onClick={() => setActiveTab('site')}
              >
                <span>Site Plan</span>
              </button>
              <button 
                className={`showcase-tab ${activeTab === 'unit' ? 'active' : ''}`}
                onClick={() => setActiveTab('unit')}
              >
                <span>Unit Plan</span>
              </button>
            </div>

            <div className="showcase-content">
              {/* Tab 1: Blisstown JMDR Arihant Green */}
              {activeTab === 'project' && (
                <div className="tab-pane-content fade-in">
                  <div className="pane-grid">
                    <div className="pane-image-wrapper">
                      <img 
                        src="/images/Bliss_Town_Developers_Pvt_Ltd_Tower_A.jpg" 
                        alt="JMDR Arihant Green Tower A" 
                        className="pane-image"
                        onClick={() => openLightbox('/images/Bliss_Town_Developers_Pvt_Ltd_Tower_A.jpg')}
                      />
                      <div className="image-overlay-hint">
                        <span className="material-symbols-outlined">zoom_in</span>
                        <span>Click to Enlarge</span>
                      </div>
                    </div>
                    <div className="pane-details">
                      <h4 className="font-headline-md">JMDR Arihant Green Co-developed by Bliss Town Developer</h4>
                      <span className="pane-location-badge">Sector 1, Greater Noida West</span>
                      
                      <div className="details-list">
                        <div className="detail-item">
                          <span className="material-symbols-outlined detail-icon">schedule</span>
                          <div>
                            <h5>Possession timeline</h5>
                            <p>Possession in Just 15 Months</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <span className="material-symbols-outlined detail-icon">location_on</span>
                          <div>
                            <h5>Premium Location</h5>
                            <p>Prime Location in Sector 1, Greater Noida West</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <span className="material-symbols-outlined detail-icon">space_dashboard</span>
                          <div>
                            <h5>Smart Engineering</h5>
                            <p>Minimum Loading utilizes maximum usable space</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Site Plan */}
              {activeTab === 'site' && (
                <div className="tab-pane-content fade-in">
                  <div className="pane-single-layout">
                    <div className="pane-image-wrapper site-plan-wrapper">
                      <img 
                        src="/images/siteplan.png" 
                        alt="Site Map" 
                        className="pane-image site-plan-image"
                        onClick={() => openLightbox('/images/siteplan.png')}
                      />
                      <div className="image-overlay-hint">
                        <span className="material-symbols-outlined">zoom_in</span>
                        <span>View Full Site Plan</span>
                      </div>
                    </div>
                    <div className="pane-single-description text-center">
                      <h4 className="font-headline-md">Architectural Site Plan</h4>
                      <p className="font-body-md">Click the diagram above to open the high-resolution site layout model.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Unit Plan */}
              {activeTab === 'unit' && (
                <div className="tab-pane-content fade-in">
                  <div className="pane-dual-layout">
                    <div className="pane-image-wrapper">
                      <img 
                        src="/images/floor_plan1_blisstown.png" 
                        alt="Floor Plan Layout 1" 
                        className="pane-image"
                        onClick={() => openLightbox('/images/floor_plan1_blisstown.png')}
                      />
                      <div className="image-overlay-hint">
                        <span className="material-symbols-outlined">zoom_in</span>
                        <span>Enlarge Plan A</span>
                      </div>
                    </div>
                    <div className="pane-image-wrapper">
                      <img 
                        src="/images/floor_plan1_blisstown.png" 
                        alt="Floor Plan Layout 2" 
                        className="pane-image"
                        onClick={() => openLightbox('/images/floor_plan1_blisstown.png')}
                      />
                      <div className="image-overlay-hint">
                        <span className="material-symbols-outlined">zoom_in</span>
                        <span>Enlarge Plan B</span>
                      </div>
                    </div>
                  </div>
                  <div className="pane-single-description text-center" style={{ marginTop: '30px' }}>
                    <h4 className="font-headline-md">Unit Floor Plans</h4>
                    <p className="font-body-md">Luxury apartments designed with maximum spatial efficiency. Click plans to zoom.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {modalImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
            <img src={modalImage} alt="Enlarged view" className="lightbox-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
