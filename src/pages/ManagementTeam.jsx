import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManagementTeam.css';

const ManagementTeam = () => {
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
        <div className="management-page">
            {/* Page Header */}
            <header className="page-header reveal-up">
                <div className="container">
                    <span className="font-subheading-lg page-header__tag">Governance</span>
                    <h1 className="font-display-xl page-header__title">Management Team</h1>
                    <div className="breadcrumbs">
                        <Link to="/" className="breadcrumb-item" style={{ textDecoration: 'none' }}>Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-item breadcrumb-item--active">Management Team</span>
                    </div>
                </div>
            </header>

            {/* Main Content Section */}
            <section className="section container">
                <div className="management-grid grid-12">
                    {/* Intro Section */}
                    <div className="management-intro col-12 reveal-up">
                        <span className="font-subheading-lg text-gold">Leadership &amp; Execution</span>
                        <h2 className="font-headline-lg management-title">
                            Architects of <em>Long-Term Strategy</em>
                        </h2>
                        <div className="intro-paragraphs">
                            <p className="font-body-lg">
                                The execution and management of the company is based upon Senior and experienced people of Maxblis. There is a management committee comprising the Heads under the chairmanship of our Managing Director to plan Maxblis's long-term strategy and review performance and organize business as per the directions.
                            </p>
                            <p className="font-body-md text-slate">
                                It ensures achievement of strategic objectives. The Managing Director along with the Head of Finance, Information Technology, and Corporate Governance with the help of the Company Secretary ensure the Corporate Governance processes in the Company.
                            </p>
                        </div>
                    </div>

                    {/* Committee Cards Section */}
                    <div className="committees-section col-12 reveal-up">
                        <h3 className="font-headline-md committees-header">Board Committees &amp; Governance</h3>
                        
                        <div className="committees-grid">
                            {/* Card 1: Remuneration Committee */}
                            <div className="committee-card glass-panel">
                                <div className="committee-icon-wrapper">
                                    <span className="material-symbols-outlined committee-icon">workspace_premium</span>
                                </div>
                                <h4 className="font-headline-md committee-card__title">Remuneration Committee</h4>
                                <div className="committee-line"></div>
                                <p className="font-body-md committee-card__desc">
                                    Responsible for managerial remuneration in accordance with the Companies Act, ensuring fair alignment of leadership incentives with stakeholders' interests.
                                </p>
                            </div>

                            {/* Card 2: Audit Committee */}
                            <div className="committee-card glass-panel">
                                <div className="committee-icon-wrapper">
                                    <span className="material-symbols-outlined committee-icon">verified_user</span>
                                </div>
                                <h4 className="font-headline-md committee-card__title">Audit Committee</h4>
                                <div className="committee-line"></div>
                                <p className="font-body-md committee-card__desc">
                                    Responsible for ensuring the compliances of the Companies Act, overseeing internal control, risk assessment, and independent audit systems.
                                </p>
                            </div>

                            {/* Card 3: Committee of Directors */}
                            <div className="committee-card glass-panel">
                                <div className="committee-icon-wrapper">
                                    <span className="material-symbols-outlined committee-icon">corporate_fare</span>
                                </div>
                                <h4 className="font-headline-md committee-card__title">Committee of Directors</h4>
                                <div className="committee-line"></div>
                                <p className="font-body-md committee-card__desc">
                                    Responsible for the strategic approval of projects, evaluation of new real estate opportunities, and other critical operational matters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ManagementTeam;
