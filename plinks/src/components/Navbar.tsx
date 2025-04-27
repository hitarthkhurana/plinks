import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';

const Navbar: React.FC = () => {
  const { isConnected, account, connectWallet, disconnectWallet } = useWallet();

  // Helper function to truncate address for display
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="flex">
          <Link to="/" className="logo">PLINKS</Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/create">Create Link</Link>
          </nav>
        </div>
        <div>
          {isConnected ? (
            <div className="flex">
              <span style={{ marginRight: "1rem" }}>{truncateAddress(account || '')}</span>
              <button 
                onClick={disconnectWallet}
                className="button button-white"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="button button-white"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 