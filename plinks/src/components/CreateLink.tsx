import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { createPaymentRequest } from '../services/contractService';

const CreateLink: React.FC = () => {
  const { isConnected, signer, connectWallet } = useWallet();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState('DOT');
  const [memo, setMemo] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentRequestId, setPaymentRequestId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isConnected) {
      await connectWallet();
      return;
    }
    
    if (!signer) {
      setError('Wallet not connected properly. Please try reconnecting.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create a payment request on the blockchain
      let requestId;
      try {
        requestId = await createPaymentRequest(signer, recipient, asset, amount, memo);
        console.log("Created payment request with ID:", requestId);
        setPaymentRequestId(requestId);
      } catch (contractError) {
        console.error("Contract error:", contractError);
        // If contract fails, continue without it (for demo resilience)
        console.log("Continuing without contract integration");
      }
      
      // Generate payment link including requestId if available
      const baseUrl = window.location.origin;
      const params = new URLSearchParams({
        recipient,
        amount,
        asset,
        memo
      });
      
      // Add requestId to params if available
      if (requestId) {
        params.append('requestId', requestId);
      }
      
      setGeneratedLink(`${baseUrl}/pay?${params.toString()}`);
      setIsLoading(false);
    } catch (err) {
      console.error('Error creating payment link:', err);
      setError('Failed to create payment link. Please try again.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="card">
      <h2 className="text-center mb-3">Create Payment Link</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="form-input"
            placeholder="0x..."
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input"
            placeholder="0.0"
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Asset</label>
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="form-input"
          >
            <option value="DOT">DOT</option>
            <option value="WLD">WLD (Testnet)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Memo (Optional)</label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="form-input"
            placeholder="Dinner bill, rent payment, etc."
          />
        </div>
        
        <button
          type="submit"
          className={`button ${isConnected ? '' : 'button-green'}`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : (isConnected ? 'Generate Link' : 'Connect Wallet')}
        </button>
      </form>
      
      {generatedLink && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.25rem' }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Your Payment Link:</p>
          <div className="flex">
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="form-input"
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, marginRight: 0 }}
            />
            <button
              onClick={copyToClipboard}
              className="button"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Copy
            </button>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Share this link with anyone to request payment.</p>
          </div>
          
          {paymentRequestId && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#edf2f7', borderRadius: '0.25rem', border: '1px solid #cbd5e0' }}>
              <p style={{ fontSize: '0.875rem', color: '#4a5568', marginBottom: '0.25rem', fontWeight: 500 }}>Payment Request ID:</p>
              <p style={{ wordBreak: 'break-all', fontSize: '0.75rem', fontFamily: 'monospace', backgroundColor: '#e2e8f0', padding: '0.5rem', borderRadius: '0.25rem' }}>
                {paymentRequestId}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#4a5568', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                This ID is stored on the blockchain and can be used to verify payment status.
              </p>
              <a 
                href={`/status?requestId=${paymentRequestId}`}
                className="button"
                style={{ 
                  display: 'inline-block', 
                  padding: '0.5rem 0.75rem', 
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  backgroundColor: '#4A5568',
                  width: 'auto'
                }}
              >
                Check Payment Status
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateLink;