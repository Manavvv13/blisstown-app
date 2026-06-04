import React, { useState } from 'react';
import { submitNewsletterForm } from '../utils/firebaseHelper';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
        setLoading(true);

        const result = await submitNewsletterForm(email);

        if (result === null) {
            alert('You are already subscribed!');
            return;
        }

        setSubscribed(true);
        setEmail('');

        setTimeout(() => {
            setSubscribed(false);
        }, 6000);

    } catch (error) {
        console.error('Error saving newsletter lead:', error);
        alert('Failed to subscribe. Please try again.');
    } finally {
        setLoading(false);
    }
};

    return (
        <section className="newsletter-section">
            <div className="newsletter-background-glow"></div>
            <div className="newsletter-container reveal-up">
                <h2 className="newsletter-title">Stay Informed.</h2>
                <p className="newsletter-subtitle">The World of Bliss</p>
                {subscribed ? (
                    <div className="newsletter-success">
                        <span className="material-symbols-outlined newsletter-success-icon">mail</span>
                        <p className="newsletter-success-text">Welcome to the inner circle. Your email is registered.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <input 
                            className="newsletter-input" 
                            placeholder="EMAIL ADDRESS" 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            disabled={loading}
                        />
                        <button className="newsletter-submit" type="submit" disabled={loading}>
                            {loading ? 'WAITING...' : 'SUBSCRIBE'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
