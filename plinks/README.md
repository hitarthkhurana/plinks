# Plinks - 1-Click Payment Links for Polkadot Asset Hub

Plinks is a web application that allows users to create shareable payment links for Polkadot Asset Hub tokens. Similar to PayPal.me or Venmo links, Plinks makes it easy to request and receive payments in DOT and other supported tokens.

## Project Overview

This project was created for the EasyA Harvard Hackathon. Plinks simplifies the payment process on Polkadot by generating shareable payment links that anyone can use to send tokens with just one click.

### Key Features

- Create payment links with specified recipient address, amount, asset type (DOT/USDT/USDC), and optional memo
- Share links via email, text, or social media
- One-click payments - recipients connect their MetaMask wallet and complete the transaction instantly
- Blockchain tracking of payment requests and completions via smart contract

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Web3 Integration**: Ethers.js with MetaMask
- **Blockchain**: Polkadot Asset Hub (EVM compatible)
- **Smart Contract**: Simple Solidity contract to track payment requests/completions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension

### Installation

1. Install dependencies
   ```
   npm install
   ```

2. Start the development server
   ```
   npm start
   ```

3. The application will be available at http://localhost:3000

## Smart Contract

The Plinks contract tracks payment requests and completions. The contract is located in `../contracts/Plinks.sol`. To deploy the contract:

1. Use Remix IDE to deploy the contract to the Polkadot Asset Hub testnet
2. Update the contract address in `src/services/contractService.ts`

## Usage

1. **Create a Payment Link**:
   - Navigate to the "Create Link" page
   - Enter recipient address, amount, and asset type
   - Add an optional memo for the payment
   - Generate and copy the payment link

2. **Share the Link**:
   - Send the link to anyone via email, text, or social media

3. **Receive Payment**:
   - Recipients open the link in their browser
   - Connect their MetaMask wallet
   - Complete the payment with one click

## Project Structure

- `src/components` - React components
- `src/contexts` - Context providers for state management
- `src/services` - Services for interacting with the blockchain

## Future Enhancements

- QR code generation for payment links
- Transaction history for users
- Support for additional tokens
- Mobile app version
