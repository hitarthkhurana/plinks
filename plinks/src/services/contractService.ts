import { ethers } from 'ethers';

// This is the ABI of your deployed Plinks contract
const PLINKS_ABI = [
  // Events
  "event PaymentRequested(bytes32 indexed requestId, address indexed to, string asset, uint256 amount, string memo)",
  "event PaymentCompleted(bytes32 indexed requestId, address indexed from, address indexed to)",
  
  // Functions
  "function requestPayment(address to, string memory asset, uint256 amount, string memory memo) public returns (bytes32)",
  "function completePayment(bytes32 requestId) public",
  "function paymentRequests(bytes32 requestId) public view returns (address to, string asset, uint256 amount, string memo, bool completed)"
];

// Replace with your deployed contract address on Westend
const CONTRACT_ADDRESS = "0x1CdaB5E4Ed70c52B73080CDA83c943790f2eDB95"; // REPLACE THIS WITH YOUR ACTUAL CONTRACT ADDRESS

export const createPaymentRequest = async (
  signer: ethers.Signer,
  to: string,
  asset: string,
  amount: string,
  memo: string
) => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PLINKS_ABI, signer);
    const parsedAmount = ethers.utils.parseEther(amount);
    
    const tx = await contract.requestPayment(to, asset, parsedAmount, memo);
    const receipt = await tx.wait();
    
    // Find the PaymentRequested event
    const event = receipt.events?.find((e: any) => e.event === 'PaymentRequested');
    if (event) {
      return event.args?.requestId;
    }
    
    throw new Error('Payment request failed');
  } catch (error) {
    console.error('Error creating payment request:', error);
    throw error;
  }
};

export const completePayment = async (
  signer: ethers.Signer,
  requestId: string
) => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PLINKS_ABI, signer);
    
    const tx = await contract.completePayment(requestId);
    await tx.wait();
    
    return true;
  } catch (error) {
    console.error('Error completing payment:', error);
    throw error;
  }
};

export const getPaymentRequestDetails = async (
  provider: ethers.providers.Provider,
  requestId: string
) => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, PLINKS_ABI, provider);
    
    const result = await contract.paymentRequests(requestId);
    
    return {
      to: result.to,
      asset: result.asset,
      amount: ethers.utils.formatEther(result.amount),
      memo: result.memo,
      completed: result.completed
    };
  } catch (error) {
    console.error('Error getting payment request details:', error);
    throw error;
  }
}; 