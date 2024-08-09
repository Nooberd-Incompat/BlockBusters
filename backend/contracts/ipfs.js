const axios = require('axios');
const FormData = require('form-data');

const IPFS_API_URL = 'http://localhost:5003/api/v0';

async function addFile(fileContent) {
    try {
        const form = new FormData();
        form.append('file', fileContent);

        const response = await axios.post(`${IPFS_API_URL}/add`, form, {
            headers: {
                ...form.getHeaders()
            }
        });

        return response.data.Hash;
    } catch (error) {
        console.error('Failed to add file to IPFS:', error);
        throw error;
    }
}

async function getFile(ipfsHash) {
    try {
        const response = await axios.get(`${IPFS_API_URL}/cat/${ipfsHash}`, {
            responseType: 'text'  // Ensure the response type is set to 'text'
        });
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve file from IPFS:', error);
        throw error;
    }
}

module.exports = { addFile, getFile };
