const express = require('express');
const bodyParser = require('body-parser');
const { Web3 } = require('web3');
const { addFile, getFile } = require('./ipfs');
const contract = require('@truffle/contract');
const multer = require('multer');

const app = express();
const port = 3000;

// Set up Web3 connection to the local blockchain (Ganache)
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

// Load the compiled smart contracts
const Identity = contract(require('./build/contracts/Identity.json'));
const Registry = contract(require('./build/contracts/Registry.json'));
const DataSharing = contract(require('./build/contracts/DataSharing.json'));

Identity.setProvider(web3.currentProvider);
Registry.setProvider(web3.currentProvider);
DataSharing.setProvider(web3.currentProvider);

// Middleware
app.use(bodyParser.json());

// API Endpoints
const upload = multer();

// Register a new disease
app.post('/registerDisease', upload.none(), async (req, res) => {
    // const { name, description, fileContent, fromAddress } = req.body;
    const name = req.body.name
    const description = req.body.description
    const fileContent = req.body.fileContent
    const fromAddress = req.body.fromAddress
    console.log(name, description, fileContent, fromAddress);
    try {
        // Add file to IPFS
        const ipfsHash = await addFile(fileContent);

        // Interact with the Registry smart contract to register the disease
        const registryInstance = await Registry.deployed();
        await registryInstance.registerDisease(name, description, ipfsHash, { from: fromAddress });

        res.send({ success: true, ipfsHash });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Retrieve a disease's data
app.get('/getDisease/:id', async (req, res) => {
    const diseaseId = req.params.id;

    try {
        const registryInstance = await Registry.deployed();
        const disease = await registryInstance.getDisease(diseaseId);

        // Retrieve file from IPFS
        const fileContent = await getFile(disease[2]);

        res.send({ name: disease[0], description: disease[1], fileContent, submitter: disease[3] });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Request access to disease data
app.post('/requestAccess', async (req, res) => {
    const { diseaseId, fromAddress } = req.body;

    try {
        const dataSharingInstance = await DataSharing.deployed();
        await dataSharingInstance.requestAccess(diseaseId, { from: fromAddress });

        res.send({ success: true });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Approve access to disease data
app.post('/approveAccess', async (req, res) => {
    const { requestId, fromAddress } = req.body;

    try {
        const dataSharingInstance = await DataSharing.deployed();
        await dataSharingInstance.approveAccess(requestId, { from: fromAddress });

        res.send({ success: true });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
