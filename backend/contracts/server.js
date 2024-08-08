const express = require('express');
const bodyParser = require('body-parser');
const { addFile, getFile } = require('./ipfs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to add a file to IPFS
app.post('/addFile', async (req, res) => {
    try {
        const fileContent = req.body.content;
        const cid = await addFile(fileContent);
        res.send({ cid });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Endpoint to retrieve a file from IPFS
app.get('/getFile/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const fileContent = await getFile(cid);
        res.send({ content: fileContent });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
