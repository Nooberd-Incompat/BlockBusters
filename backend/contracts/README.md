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
| **User Registration** | - User creates an account in the web2 client application, providing personal information (e.g., name, email). <br> - Web2 application stores user's information in the web2 database. <br> - User connects Ethereum wallet to web2 application. <br> - Web2 application associates user's Ethereum address with their account in the web2 database. |
| **File Upload**       | - User selects a file to share and uploads it to IPFS. <br> - IPFS node returns an IPFS hash for the uploaded file. <br> - Web2 application sends the IPFS hash and user's Ethereum address to the smart contract (uploadFile function). <br> - Smart contract stores IPFS hash, associating it with user's Ethereum address. <br> - Web2 application stores file metadata in the web2 database, associated with the user's account. |
| **Access Request**    | - Another user initiates an access request through the web2 application. <br> - Web2 application retrieves IPFS hash of the file from the database and requester's Ethereum address. <br> - Web2 application calls hasAccess function on the smart contract. <br> - Smart contract checks if the requester has access and returns the result to the web2 application. <br> - If access is denied, web2 application stores the access request in the database and notifies the file owner. |
| **Access Granting**   | - File owner reviews the access request through the web2 application. <br> - Web2 application retrieves access request details from the database. <br> - Web2 application calls grantAccess function on the smart contract. <br> - Smart contract updates access control mapping, granting the requester access to the file. <br> - Web2 application updates the access request status in the database to "approved". |
| **File Viewing**      | - Requester with granted access views the file through the web2 application. <br> - Web2 application retrieves IPFS hash from the database. <br> - Web2 application uses IPFS hash to retrieve file content from the IPFS network. <br> - Web2 application displays the file content to the user. |

### Contact Us:
For any queries or feedback, please reach out to us at [piyushjitendra.s22@iiits.in]
"""
