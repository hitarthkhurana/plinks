// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Plinks
 * @dev Minimal contract to track payment requests on Polkadot Asset Hub
 */
contract Plinks {
    // Structure to represent a payment request
    struct PaymentRequest {
        address to;
        string asset;
        uint256 amount;
        string memo;
        bool completed;
    }
    
    // Mapping to store all payment requests by a unique ID
    mapping(bytes32 => PaymentRequest) public paymentRequests;
    
    // Events for logging activities
    event PaymentRequested(bytes32 indexed requestId, address indexed to, string asset, uint256 amount, string memo);
    event PaymentCompleted(bytes32 indexed requestId, address indexed from, address indexed to);
    
    /**
     * @dev Create a new payment request
     * @param to Recipient address
     * @param asset Asset type (e.g., "DOT", "USDC")
     * @param amount Amount to be transferred
     * @param memo Optional memo for the transfer
     * @return requestId Unique identifier for the payment request
     */
    function requestPayment(address to, string memory asset, uint256 amount, string memory memo) public returns (bytes32) {
        // Generate a unique ID for the request
        bytes32 requestId = keccak256(abi.encodePacked(msg.sender, to, asset, amount, memo, block.timestamp));
        
        // Create and store the payment request
        paymentRequests[requestId] = PaymentRequest({
            to: to,
            asset: asset,
            amount: amount,
            memo: memo,
            completed: false
        });
        
        // Emit an event for the request
        emit PaymentRequested(requestId, to, asset, amount, memo);
        
        return requestId;
    }
    
    /**
     * @dev Mark a payment as completed
     * @param requestId ID of the payment request
     */
    function completePayment(bytes32 requestId) public {
        // Ensure the request exists and is not completed
        require(paymentRequests[requestId].amount > 0, "Payment request does not exist");
        require(!paymentRequests[requestId].completed, "Payment already completed");
        
        // Mark the payment as completed
        paymentRequests[requestId].completed = true;
        
        // Emit an event for the completion
        emit PaymentCompleted(
            requestId,
            msg.sender, 
            paymentRequests[requestId].to
        );
    }
} 