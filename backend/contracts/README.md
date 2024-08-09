# Decentralized Rare Disease Registry

## Overview

The Decentralized Rare Disease Registry aims to leverage blockchain technology to create a secure, transparent, and efficient platform for managing and sharing rare disease data. This project combines Ethereum smart contracts, IPFS for decentralized storage, and OrbitDB for decentralized database functionality to create a robust and scalable solution for the rare disease community.

## Problem Statement

Rare disease data is often fragmented and difficult to access, hindering research and collaboration. Our solution addresses these issues by creating a decentralized registry that ensures data integrity, security, and accessibility.

## Solution Approach

Our platform provides a decentralized and secure environment for patients, researchers, and doctors to submit, share, and access rare disease data. By using blockchain and decentralized storage, we ensure data integrity and transparency while maintaining user privacy through encryption and secure authentication methods.

## Tech Stack

- **Blockchain Layer**: Ethereum, IPFS
- **Smart Contracts**: Solidity
- **Backend Services**: Node.js, Express.js, OrbitDB
- **Frontend Application**: React.js, Web3.js
- **Security**: MetaMask, data encryption

## Key Features

- **User Registration and Authentication**: Secure user authentication using MetaMask.
- **Data Submission and Storage**: Encrypted data storage on IPFS with smart contract-based registry.
- **Data Retrieval and Sharing**: Controlled data access via smart contracts.
- **Research Collaboration**: Platform for proposing, voting, and funding research projects.
- **Community Building**: Forums and chat features for decentralized social interactions.

## How to Run the Project

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Nooberd-Incompat/BlockBusters.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`bash
   cd decentralized-rare-disease-registry
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`
5. Follow the detailed implementation guide in the documentation to set up and run all components.

| Step                | Description                                                                                                                                                                                                                                 |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **User Registration** | - User creates an account through a decentralized identity system, linking their Ethereum wallet (e.g., MetaMask). <br> - User's Ethereum address and associated metadata are securely stored on-chain or in a decentralized identity registry. |
| **File Upload**       | - User selects a file to share and uploads it to IPFS, ensuring decentralized and distributed storage. <br> - IPFS node returns a unique IPFS hash for the file. <br> - The dApp interacts with a smart contract to record the IPFS hash and associate it with the user's Ethereum address on-chain. <br> - File metadata (IPFS hash, file name, file type, file size) is managed through decentralized storage solutions, ensuring tamper-proof records. |
| **Access Request**    | - Another user initiates an access request via the decentralized application (dApp). <br> - The dApp retrieves the IPFS hash and verifies the requester's Ethereum address on-chain. <br> - The smart contract processes the access request by checking the on-chain permissions associated with the file. <br> - If access is denied, the request is recorded on-chain, ensuring transparency, and the file owner is notified through the dApp. |
| **Access Granting**   | - File owner reviews the access request within the dApp. <br> - The dApp retrieves the requester's details and IPFS hash from the blockchain. <br> - The file owner grants access by interacting with the smart contract, updating the on-chain access control. <br> - The smart contract reflects the updated access permissions, ensuring decentralized access control. |
| **File Viewing**      | - The requester, now with granted access, views the file through the dApp. <br> - The dApp retrieves the IPFS hash and fetches the file content from the IPFS network. <br> - The file content is displayed securely to the user, leveraging decentralized storage and access protocols. |

### Contact Us:
For any queries or feedback, please reach out to us at [piyushjitendra.s22@iiits.in]
"""
