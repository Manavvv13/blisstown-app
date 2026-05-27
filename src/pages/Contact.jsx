import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submitContactForm } from '../utils/firebaseHelper';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Reveal on scroll logic for elements
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to Firebase Firestore (non-blocking)
    submitContactForm(formData).catch((error) => {
      console.error('Error saving contact lead to Firebase:', error);
    });

    // Display premium glass-morphic notification
    setShowNotification(true);

    // Reset Form Fields
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Auto-dismiss notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="contact-page">
      {/* Contact Hero Banner */}
      <section className="contact-hero">
        <div className="container contact-hero-content">
          <h1 className="font-display-xl contact-hero-title reveal-up">Contact Us</h1>
          <ul className="contact-breadcrumbs reveal-up">
            <li className="breadcrumb-item">
              <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
            </li>
            <li className="breadcrumb-separator">/</li>
            <li className="breadcrumb-item active">Contact Us</li>
          </ul>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-section container">
        <div className="contact-header reveal-up">
          <span className="font-subheading-lg contact-subtitle">Get In Touch</span>
          <h2 className="font-headline-lg contact-title">
            If You Have Any Query, <em>Please Feel Free</em> Contact Us
          </h2>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact Info Details */}
          <div className="contact-info-column reveal-up">
            {/* Address Card */}
            <div className="info-card glass-panel">
              <div className="info-card__icon-wrapper">
                <span className="material-symbols-outlined info-card__icon">location_on</span>
              </div>
              <div className="info-card__details">
                <h4 className="info-card__label">Address</h4>
                <p className="info-card__value">
                  GH-15B, Sector - 1, Greater Noida West, Gautam Buddh Nagar, UP-201309
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="info-card glass-panel">
              <div className="info-card__icon-wrapper">
                <span className="material-symbols-outlined info-card__icon">phone_in_talk</span>
              </div>
              <div className="info-card__details">
                <h4 className="info-card__label">Call Us Now</h4>
                <p className="info-card__value">
                  <a href="tel:+91-8447741102" className="info-card__link">
                    +91-8447741102
                  </a>
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="info-card glass-panel">
              <div className="info-card__icon-wrapper">
                <span className="material-symbols-outlined info-card__icon">mail</span>
              </div>
              <div className="info-card__details">
                <h4 className="info-card__label">Mail Us Now</h4>
                <p className="info-card__value">
                  <a href="mailto:info@blisstown.co" className="info-card__link">
                    info@blisstown.co
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-column reveal-up">
            <div className="contact-form-wrapper glass-panel">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  {/* Name Input */}
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      className="form-input"
                    />
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <span className="form-focus-line"></span>
                  </div>

                  {/* Email Input */}
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      className="form-input"
                    />
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <span className="form-focus-line"></span>
                  </div>
                </div>

                {/* Subject Input */}
                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    className="form-input"
                  />
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <span className="form-focus-line"></span>
                </div>

                {/* Message Input */}
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    className="form-textarea"
                  ></textarea>
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <span className="form-focus-line"></span>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Glassmorphic Success Notification Modal */}
      <div className={`notification-overlay ${showNotification ? 'show' : ''}`} onClick={closeNotification}>
        <div className="notification-card glass-panel-heavy" onClick={(e) => e.stopPropagation()}>
          <div className="notification-icon-wrapper">
            <span className="material-symbols-outlined notification-icon">check_circle</span>
          </div>
          <h3 className="font-headline-md notification-title">Submission Received</h3>
          <p className="font-body-md notification-text">
            Thank you for reaching out. A Bliss Town luxury concierge has received your request and will contact you shortly.
          </p>
          <button className="btn-primary" onClick={closeNotification} style={{ padding: '12px 28px', fontSize: '11px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
