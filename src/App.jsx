import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ChairmanMessage from './pages/ChairmanMessage';
import ManagementTeam from './pages/ManagementTeam';
import QualityPolicy from './pages/QualityPolicy';
import SafetyPolicy from './pages/SafetyPolicy';
import ProjectPage from './pages/ProjectPage';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

// Scroll to top on navigation helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
};

// Layout for public pages to ensure header/footer are present
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {

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

    const setupObserver = () => {
      document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    };

    const timeoutId = setTimeout(setupObserver, 200);
    
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Routes>
          {/* Public Website Routes */}
          <Route element={
            <PublicLayout />
          }>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/chairman-message" element={<ChairmanMessage />} />
            <Route path="/management-team" element={<ManagementTeam />} />
            <Route path="/quality-policy" element={<QualityPolicy />} />
            <Route path="/safety-policy" element={<SafetyPolicy />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          
          {/* Admin Dashboard - Standalone */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
