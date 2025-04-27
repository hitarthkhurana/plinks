import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreateLink from './components/CreateLink';
import PaymentPage from './components/PaymentPage';
import StatusCheck from './components/StatusCheck';
import './App.css';

function App() {
  return (
    <div className="app">
      <WalletProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
            <header style={{ backgroundColor: '#3B82F6', padding: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', textDecoration: 'none', marginRight: '1.5rem' }}>
                  PLINKS
                </Link>
                <nav>
                  <Link to="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Home</Link>
                  <Link to="/create" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Create Link</Link>
                  <Link to="/status" style={{ color: 'white', textDecoration: 'none' }}>Check Status</Link>
                </nav>
              </div>
            </header>
            <main style={{ flex: '1', paddingTop: '1.5rem', paddingBottom: '3rem' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreateLink />} />
                <Route path="/pay" element={<PaymentPage />} />
                <Route path="/status" element={<StatusCheck />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WalletProvider>
    </div>
  );
}

export default App;
