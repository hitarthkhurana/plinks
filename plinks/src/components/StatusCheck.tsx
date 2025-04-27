import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';
import { getPaymentRequestDetails } from '../services/contractService';

const StatusCheck: React.FC = () => {
  const { isConnected, provider, connectWallet } = useWallet();
  const [requestId, setRequestId] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for requestId in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const requestIdParam = urlParams.get('requestId');
    
    if (requestIdParam) {
      setRequestId(requestIdParam);
      // If we have both a provider and a requestId, automatically perform the lookup
      if (isConnected && provider) {
        checkPaymentStatus(requestIdParam);
      }
    }
  }, [isConnected, provider]);

  const checkPaymentStatus = async (id: string) => {
    if (!provider || !id) {
      setError('Please connect your wallet and enter a valid Request ID.');
      return;
    }
    
    try {
      setIsLoading(true);
      const details = await getPaymentRequestDetails(provider, id);
      setPaymentDetails(details);
      setIsLoading(false);
    } catch (err) {
      console.error('Error getting payment details:', err);
      setError('Failed to fetch payment details. Please check the Request ID and try again.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPaymentDetails(null);
    
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    await checkPaymentStatus(requestId);
  };

  return (
    <div className="card">
      <h2 className="text-center mb-3">Check Payment Status</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Payment Request ID</label>
          <input
            type="text"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            className="form-input"
            placeholder="0x..."
            required
          />
        </div>
        
        <button
          type="submit"
          className={`button ${isConnected ? '' : 'button-green'}`}
          disabled={isLoading}
          style={{ width: '100%' }}
        >
          {isLoading ? 'Loading...' : (isConnected ? 'Check Status' : 'Connect Wallet')}
        </button>
      </form>
      
      {paymentDetails && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.25rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Payment Details</h3>
          
          <div style={{ marginBottom: '0.75rem' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>Recipient:</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{paymentDetails.to}</span>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>Asset:</span>
              <span>{paymentDetails.asset}</span>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>Amount:</span>
              <span>{paymentDetails.amount} {paymentDetails.asset}</span>
            </p>
            {paymentDetails.memo && (
              <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500 }}>Memo:</span>
                <span>{paymentDetails.memo}</span>
              </p>
            )}
            <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>Status:</span>
              <span style={{ 
                backgroundColor: paymentDetails.completed ? '#10B981' : '#F59E0B',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}>
                {paymentDetails.completed ? 'Completed' : 'Pending'}
              </span>
            </p>
          </div>
          
          {!paymentDetails.completed && (
            <div style={{ backgroundColor: '#FFFBEB', padding: '0.75rem', borderRadius: '0.25rem', borderLeft: '4px solid #F59E0B' }}>
              <p style={{ fontSize: '0.875rem', color: '#B45309' }}>
                This payment request is still pending. The recipient needs to complete the payment.
              </p>
            </div>
          )}
          
          {paymentDetails.completed && (
            <div style={{ backgroundColor: '#ECFDF5', padding: '0.75rem', borderRadius: '0.25rem', borderLeft: '4px solid #10B981' }}>
              <p style={{ fontSize: '0.875rem', color: '#065F46' }}>
                This payment has been successfully completed and verified on the blockchain.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusCheck; 