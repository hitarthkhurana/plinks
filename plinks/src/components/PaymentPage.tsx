import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';
import { completePayment } from '../services/contractService';

interface PaymentDetails {
  recipient: string;
  amount: string;
  asset: string;
  memo: string;
  requestId?: string;
}

const PaymentPage: React.FC = () => {
  const { isConnected, signer, connectWallet } = useWallet();
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('recipient');
    const amount = params.get('amount');
    const asset = params.get('asset');
    const memo = params.get('memo') || '';
    const requestId = params.get('requestId') || undefined;

    if (recipient && amount && asset) {
      setPaymentDetails({
        recipient,
        amount,
        asset,
        memo,
        requestId
      });
    } else {
      setError('Invalid payment link. Missing required parameters.');
    }
    
    setIsLoading(false);
  }, []);

  const processPayment = async () => {
    if (!paymentDetails || !signer) return;
    
    try {
      setIsLoading(true);
      
      // Simple ETH transfer (in a real app, this would handle DOT/WLD via contracts)
      const tx = await signer.sendTransaction({
        to: paymentDetails.recipient,
        value: ethers.utils.parseEther(paymentDetails.amount)
      });
      
      await tx.wait();
      
      // If we have a requestId, mark the payment as complete in the contract
      if (paymentDetails.requestId) {
        try {
          await completePayment(signer, paymentDetails.requestId);
          console.log("Payment marked as complete in contract");
        } catch (contractError) {
          console.error("Error marking payment as complete:", contractError);
          // Continue even if contract interaction fails
        }
      }
      
      setPaymentComplete(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Transaction failed:', err);
      setError('Transaction failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="card text-center">
        <div style={{ margin: '0 auto', width: '3rem', height: '3rem', borderRadius: '50%', borderWidth: '2px', borderStyle: 'solid', borderColor: '#e5e7eb #e5e7eb #3b82f6 #e5e7eb', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '1rem' }}>Processing your request...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div style={{ color: 'red', fontWeight: 500 }}>{error}</div>
        <button 
          onClick={() => window.location.href = '/'}
          className="button mt-3"
          style={{ width: '100%' }}
        >
          Return Home
        </button>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="card text-center">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Payment Successful!</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Your payment has been processed successfully.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="button"
          style={{ width: '100%' }}
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-center mb-3">Complete Payment</h2>
      
      {paymentDetails && (
        <div>
          <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.25rem' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>Amount:</span>
              <span>{paymentDetails.amount} {paymentDetails.asset}</span>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>To:</span>
              <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{paymentDetails.recipient}</span>
            </p>
            {paymentDetails.memo && (
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 500 }}>Memo:</span>
                <span>{paymentDetails.memo}</span>
              </p>
            )}
          </div>
          
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="button"
              style={{ width: '100%' }}
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={processPayment}
              className="button button-green"
              style={{ width: '100%' }}
            >
              Confirm Payment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentPage; 