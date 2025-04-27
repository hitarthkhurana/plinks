import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container main">
      <div className="text-center mb-3">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '1rem' }}>PLINKS</h1>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>1-Click Payment Links for Polkadot Asset Hub</p>
      </div>
      
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Create and Share Payment Links in Seconds</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          PLINKS makes it easy to request and receive payments using Polkadot's Asset Hub.
          Generate shareable payment links for DOT and other tokens that anyone can pay with a single click.
        </p>
        
        <div className="flex-center">
          <Link to="/create" className="button button-primary">
            Create Payment Link
          </Link>
        </div>
      </div>
      
      <div className="grid">
        <div className="card">
          <div style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '0.75rem' }}>🔗</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Simple Links</h3>
          <p style={{ color: '#6b7280' }}>
            Generate shareable payment links with specified recipient, amount, and token type.
          </p>
        </div>
        
        <div className="card">
          <div style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '0.75rem' }}>📱</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Easy Sharing</h3>
          <p style={{ color: '#6b7280' }}>
            Share links via email, text messages, or social media with anyone.
          </p>
        </div>
        
        <div className="card">
          <div style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '0.75rem' }}>💰</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>1-Click Payments</h3>
          <p style={{ color: '#6b7280' }}>
            Recipients can connect their MetaMask wallet and complete the payment in one click.
          </p>
        </div>
      </div>
      
      <div style={{ backgroundColor: '#f3f4f6', borderRadius: '0.5rem', padding: '1.5rem', marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>How It Works</h2>
        <ol style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li style={{ display: 'flex' }}>
            <span style={{ flexShrink: 0, height: '1.5rem', width: '1.5rem', borderRadius: '9999px', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>1</span>
            <span>Create a payment link with recipient address, amount, and token type</span>
          </li>
          <li style={{ display: 'flex' }}>
            <span style={{ flexShrink: 0, height: '1.5rem', width: '1.5rem', borderRadius: '9999px', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>2</span>
            <span>Share your generated link with anyone via email, text, or social media</span>
          </li>
          <li style={{ display: 'flex' }}>
            <span style={{ flexShrink: 0, height: '1.5rem', width: '1.5rem', borderRadius: '9999px', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>3</span>
            <span>Recipients open the link, connect their MetaMask wallet, and complete the payment</span>
          </li>
          <li style={{ display: 'flex' }}>
            <span style={{ flexShrink: 0, height: '1.5rem', width: '1.5rem', borderRadius: '9999px', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>4</span>
            <span>All payments are tracked on the Polkadot Asset Hub blockchain</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HomePage; 