import React, { useState } from 'react';
import { addContactLead } from '../utils/firebaseHelper';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate lead submission animation
    setTimeout(() => {
      await addContactLead(formData);
      setLoading(false);
      setSubmitted(true);
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <div className="contact-grid">
          
          {/* Left Column: Premium Brand Info */}
          <div className="contact-info reveal-up">
            <span className="font-label-sm contact-pretitle">Concierge & Relations</span>
            <h2 className="font-headline-lg contact-title">
              Begin Your <em>Legacy</em>.
            </h2>
            <p className="font-body-lg contact-description">
              Whether you wish to schedule a private viewing, inquire about bespoke customizations, or explore investment opportunities, our advisors are here to assist.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <div className="detail-text-box">
                  <h4 className="detail-heading">Private Office</h4>
                  <p className="detail-body">GH-15B, Sector - 1, Greater Noida West, UP, India</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div className="detail-text-box">
                  <h4 className="detail-heading">Direct Inquiry</h4>
                  <p className="detail-body">+91 84477 41102</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="detail-text-box">
                  <h4 className="detail-heading">Electronic Correspondence</h4>
                  <p className="detail-body">concierge@blisstown.co</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form */}
          <div className="contact-form-container glass-panel reveal-up">
            {submitted ? (
              <div className="contact-success-state">
                <div className="contact-success-icon-box">
                  <span className="material-symbols-outlined">mail_lock</span>
                </div>
                <h3 className="font-headline-md success-heading">Inquiry Transmitted</h3>
                <p className="font-body-md success-message">
                  Thank you. Your message has been encrypted and stored in our private ledger. A specialist will review it and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-group">
                  <label className="font-label-sm contact-label" htmlFor="contact-name">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ENTER YOUR FULL NAME"
                    required
                    className="contact-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="font-label-sm contact-label" htmlFor="contact-email">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL@DOMAIN.COM"
                    required
                    className="contact-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="font-label-sm contact-label" htmlFor="contact-subject">Inquiry Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="E.G., DUPLEX PENTHOUSE RESIDENCES"
                    required
                    className="contact-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="font-label-sm contact-label" htmlFor="contact-message">Detailed Request</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="DESCRIBE YOUR PREFERENCES OR QUESTIONS..."
                    required
                    className="contact-textarea"
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="btn-gold-border contact-submit-btn" disabled={loading}>
                  {loading ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
