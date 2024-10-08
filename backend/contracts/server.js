const express = require('express');

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
const Web3 = require('web3');
const { addFile, getFile } = require('./ipfs');
const contract = require('@truffle/contract');
const multer = require('multer');
const cors = require("cors"); 

// Initialize the app and configure settings
const app = express();
const port = 8000;
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000", // This must be the origin of the client making the request
        credentials: true, // This allows the server to accept cookies from the client
    }),
);

// Connect to MongoDB
mongoose
    .connect(
        //change the connection string as per your mongodb setup
        "mongodb://sudip:sudiphalder@localhost:27017/?authMechanism=DEFAULT",
        {
            dbName: "web3ssh",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const authRoute = require("./auth");
app.use("/auth", authRoute);

// Set up Web3 connection to the local blockchain (Ganache)
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

// Load the compiled smart contracts
const Identity = contract(require('./build/contracts/Identity.json'));
const Registry = contract(require('./build/contracts/Registry.json'));
const DataSharing = contract(require('./build/contracts/DataSharing.json'));

Identity.setProvider(web3.currentProvider);
Registry.setProvider(web3.currentProvider);
DataSharing.setProvider(web3.currentProvider);

// Middleware
app.use(bodyParser.json());
const upload = multer();

app.post('/register', async (req, res) => {
    const { isDoctor, metaMaskAddress, ...otherFields } = req.body;

    // Validate and store the MetaMask address along with other user information
    // Example: Store in a MongoDB database

    const newUser = new User({
        isDoctor,
        metaMaskAddress,
        ...otherFields
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});


// API Endpoints
app.post('/registerDisease', upload.none(), async (req, res) => {
    const { name, description, fileContent, fromAddress } = req.body;
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
