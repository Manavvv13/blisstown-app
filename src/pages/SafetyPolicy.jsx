import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SafetyPolicy.css';

const SafetyPolicy = () => {
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

  return (
    <div className="policy-page">
      {/* Page Header */}
      <header className="page-header reveal-up">
        <div className="container">
          <span className="font-subheading-lg page-header__tag">Protection</span>
          <h1 className="font-display-xl page-header__title">Safety Policy</h1>
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumb-item" style={{ textDecoration: 'none' }}>Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/about-us" className="breadcrumb-item" style={{ textDecoration: 'none' }}>About Us</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item breadcrumb-item--active">Safety Policy</span>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="policy-content-section section">
        <div className="container">
          <div className="policy-grid">
            <div className="policy-info-block reveal-up">
              <span className="font-subheading-lg">Safety Policy</span>
              <h2 className="font-headline-lg policy-subtitle">Our Focus to create safe environment for Work</h2>
              
              <div className="policy-card glass-panel">
                <p className="font-body-lg policy-intro">
                  Blisstown exert every effort to abide by all regulations as they pertain to the construction industry which is set for
                  standards and good practices.
                </p>
              </div>

              <div className="policy-list">
                <div className="policy-list-item glass-panel">
                  <span className="material-symbols-outlined policy-icon">health_and_safety</span>
                  <p className="font-body-md">Maintain a safe and healthful work environment in order to prevent injuries.</p>
                </div>
                <div className="policy-list-item glass-panel">
                  <span className="material-symbols-outlined policy-icon">policy</span>
                  <p className="font-body-md">Follow all regulations that pertain to the construction industry.</p>
                </div>
                <div className="policy-list-item glass-panel">
                  <span className="material-symbols-outlined policy-icon">construction</span>
                  <p className="font-body-md">Minimize equipment damage.</p>
                </div>
                <div className="policy-list-item glass-panel">
                  <span className="material-symbols-outlined policy-icon">engineering</span>
                  <p className="font-body-md">Promote employee involvement with safety.</p>
                </div>
                <div className="policy-list-item glass-panel">
                  <span className="material-symbols-outlined policy-icon">analytics</span>
                  <p className="font-body-md">Suggest corrective actions to be taken to eliminate any further incidents.</p>
                </div>
                <div className="policy-list-item glass-panel">
                  <span className="material-symbols-outlined policy-icon">medical_services</span>
                  <p className="font-body-md"><strong>First Aid:</strong> Although we strive to have accident-free workplaces, in case of an injury Bliss Town provides First Aid service and provisions for medical care for all employees.</p>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="policy-experience-container reveal-up">
              <div className="experience-card glass-panel-heavy">
                <div className="experience-number-wrapper">
                  <span className="experience-number">25</span>
                </div>
                <div className="experience-text">
                  <span className="experience-label">Years</span>
                  <span className="experience-label">Working</span>
                  <span className="experience-label highlight">Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyPolicy;
