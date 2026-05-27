import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Amenities.css';

const amenitiesData = [
  { icon: 'pool', text: 'Infinity Pool', desc: 'Submerge in our temp-controlled infinity pool overlooking the skyline.', delay: '0s' },
  { icon: 'concierge', text: 'Private Concierge', desc: 'Bespoke 24/7 butler and concierge services to assist your daily life.', delay: '0.1s' },
  { icon: 'wine_bar', text: 'Rooftop Lounge', desc: 'An open sky retreat tailored for intimate gatherings and stargazing.', delay: '0.2s' },
  { icon: 'fitness_center', text: 'Elite Wellness', desc: 'A state-of-the-art gym, luxury spa, and restorative yoga deck.', delay: '0.3s' },
];

const Amenities = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('[class*="reveal-"]');
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="amenities-section" id="about" ref={sectionRef}>
      {/* Canyon glow background decoration */}
      <div className="amenities-canyon-glow"></div>
      
      {/* Giant backdrop text */}
      <div className="amenities-bg-title">Amenities</div>

      <div className="amenities-header reveal-up">
        <span className="font-subheading-lg text-gold">The Art of Living</span>
        <h2 className="amenities-title">Exclusive Services</h2>
        <div className="amenities-divider"></div>
      </div>

      <div className="amenities-grid">
        {amenitiesData.map((item, index) => (
          <Link
            key={index}
            to="/project"
            className="amenity-card reveal-up"
            style={{ transitionDelay: item.delay, textDecoration: 'none' }}
          >
            <div className="amenity-card-header">
              <span className="material-symbols-outlined amenity-icon">{item.icon}</span>
              <h3 className="amenity-card-title">{item.text}</h3>
            </div>
            <p className="amenity-card-desc">{item.desc}</p>
            <div className="amenity-read-more">
              <span>Read More</span>
              <span className="material-symbols-outlined read-more-arrow">arrow_right_alt</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
