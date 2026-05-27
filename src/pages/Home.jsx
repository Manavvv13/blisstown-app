import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import Stats from '../components/Stats';
import Project from '../components/Project';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import { submitContactForm } from '../utils/firebaseHelper';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

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

    // Show enquiry popup after 3 seconds
    const timer = setTimeout(() => {
      const popupDismissed = sessionStorage.getItem('blisstown_popup_dismissed');
      if (!popupDismissed) {
        setShowPopup(true);
      }
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('blisstown_popup_dismissed', 'true');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to Firebase Firestore (non-blocking) as a Contact Query
    submitContactForm({
      name: formData.name,
      email: formData.email,
      subject: 'JMDR Arihant Green - Enquiry Popup',
      message: `Phone: ${formData.phone}`
    }).catch((error) => {
      console.error('Error saving popup enquiry to Firebase:', error);
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowPopup(false);
      sessionStorage.setItem('blisstown_popup_dismissed', 'true');
      setFormData({ name: '', phone: '', email: '' });
    }, 2500);
  };

  return (
    <>
      <main>
        <Hero />
        <Introduction />
        <Stats />
        <Project />
        <Amenities />
        <Gallery />
        <Testimonials />
        <Newsletter />
      </main>

      {/* Enquiry Lead Capture Popup */}
      {showPopup && (
        <div className="popup-overlay" style={popupOverlayStyle}>
          <div className="popup-content glass-panel-heavy" style={popupContentStyle}>
            <span className="close-btn" onClick={closePopup} style={closeBtnStyle}>&times;</span>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src="/logo.png" alt="Blisstown Logo" style={{ height: '40px', objectFit: 'contain', filter: 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(255, 255, 255, 0.15))' }} />
              <h2 style={popupTitleStyle}>JMDR Arihant Green</h2>
              <p style={popupSubtitleStyle}>Request More Details</p>
            </div>
            
            {submitted ? (
              <div style={successMessageStyle}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--secondary)' }}>check_circle</span>
                <p style={{ marginTop: '16px', fontFamily: 'Montserrat', fontSize: '12px', letterSpacing: '0.1em' }}>THANK YOU! OUR CONCIERGE WILL CONTACT YOU SHORTLY.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputContainerStyle}>
                  <label style={labelStyle}>Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="ENTER YOUR FULL NAME" 
                    required 
                    style={inputStyle}
                  />
                </div>
                <div style={inputContainerStyle}>
                  <label style={labelStyle}>Mobile No</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="ENTER YOUR PHONE NUMBER" 
                    required 
                    style={inputStyle}
                  />
                </div>
                <div style={inputContainerStyle}>
                  <label style={labelStyle}>Your Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ENTER YOUR EMAIL ADDRESS" 
                    required 
                    style={inputStyle}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '16px', width: '100%' }}>Submit Details</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Inline styles for the lead capture popup (complying with white/gold luxury design)
const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(10, 17, 40, 0.4)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const popupContentStyle = {
  position: 'relative',
  width: '90%',
  maxWidth: '440px',
  padding: '48px 36px',
  border: '1px solid var(--secondary)',
  boxShadow: '0 25px 50px rgba(10, 17, 40, 0.1)'
};

const closeBtnStyle = {
  position: 'absolute',
  top: '16px',
  right: '24px',
  fontSize: '32px',
  cursor: 'pointer',
  color: 'var(--on-surface-variant)',
  transition: 'color 0.3s ease'
};

const popupTitleStyle = {
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: '28px',
  fontWeight: '400',
  color: 'var(--on-surface)',
  margin: '12px 0 4px 0'
};

const popupSubtitleStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--secondary)',
  margin: 0
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const labelStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '10px',
  fontWeight: '600',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--on-surface-variant)'
};

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--outline-variant)',
  color: 'var(--on-surface)',
  padding: '12px 0',
  fontSize: '13px',
  fontFamily: 'Montserrat, sans-serif',
  letterSpacing: '0.05em',
  outline: 'none',
  transition: 'border-color 0.3s'
};

const successMessageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 0',
  textAlign: 'center'
};

export default Home;
