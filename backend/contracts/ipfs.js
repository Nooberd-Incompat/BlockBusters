async function createIpfsClient() {
    const IPFS = await import('ipfs-http-client');
    return IPFS.create({ host: 'localhost', port: '5001', protocol: 'http' });
}

// Function to add a file to IPFS
async function addFile(fileContent) {
    const ipfs = await createIpfsClient();
    const { cid } = await ipfs.add(fileContent);
    return cid.toString();
}

// Function to retrieve a file from IPFS
async function getFile(cid) {
    const ipfs = await createIpfsClient();
    const stream = ipfs.cat(cid);
    let data = '';

    for await (const chunk of stream) {
        data += chunk.toString();
    }

    return data;
}

module.exports = {
    addFile,
    getFile,
};
