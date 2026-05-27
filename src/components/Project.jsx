import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Project.css';

const Project = () => {
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
    <section className="featured-project-section" id="project" ref={sectionRef}>
      <div className="featured-project-container container">
        
        {/* Section Header */}
        <div className="project-section-header reveal-up">
          <h2 className="project-section-title">Latest projects</h2>
          <Link to="/project" className="btn-black-pill">
            All Projects
            <div className="arrow-circle">
              <span className="material-symbols-outlined">arrow_outward</span>
            </div>
          </Link>
        </div>

        {/* Single Centered Project */}
        <div className="single-project-container reveal-scale">
          <Link to="/project" className="project-grid-card">
            <div className="project-card-image-wrapper">
              <img 
                alt="JMDR Arihant Green - Signature Residences" 
                className="project-card-image" 
                src="/images/Bliss_Town_Developers_Pvt_Ltd_Tower_A.jpg" 
              />
              <div className="project-card-arrow-badge">
                <span className="material-symbols-outlined">arrow_outward</span>
              </div>
            </div>
            <div className="project-card-details text-center">
              <h3 className="project-card-name">JMDR Arihant Green</h3>
              <p className="project-card-category">Sector 1, Greater Noida West</p>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Project;
