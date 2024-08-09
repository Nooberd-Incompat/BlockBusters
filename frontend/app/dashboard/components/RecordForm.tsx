// 'use client';
// import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
// import Web3 from 'web3';
// import RecordRegistry from '../../../../backend/contracts/build/contracts/Registry.json';
// import AddIcon from '@mui/icons-material/Add';
// import { create } from 'ipfs-http-client';

// interface SelectedFile extends File {
//     name: string;
// }

// interface BlogFormProps {
//     initialData?: {
//         blogId: string | null;
//         blogTitle: string;
//         blogDescription: string;
//     },
// }

// const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
//     const [web3, setWeb3] = useState<Web3 | null>(null);
//     const [contract, setContract] = useState<any>(null);
//     const [account, setAccount] = useState<string>('');

//     useEffect(() => {
//         if (window.ethereum) {
//             const web3Instance = new Web3(window.ethereum);
//             setWeb3(web3Instance);

//             const contractInstance = new web3Instance.eth.Contract(
//                 RecordRegistry.abi,
//                 '0xB5371a1a11b2ab4eB6fa537FcE3C93d1d381b230' // Replace with your deployed contract address
//             );
//             setContract(contractInstance);

//             web3Instance.eth.getAccounts().then((accounts) => {
//                 setAccount(accounts[0]);
//             });
//         } else {
//             alert('Please install MetaMask!');
//         }
//     }, []);

//     const [blogId, setBlogId] = useState(initialData?.blogId || '');
//     const [blogTitle, setTitle] = useState(initialData?.blogTitle || '');
//     const [blogDescription, setDescription] = useState(initialData?.blogDescription || '');
//     const [createNew, setCreateNew] = useState(true);
//     const [uploadStatus, setUploadStatus] = useState<string>('');

//     const [files, setFiles] = useState<SelectedFile[]>([]);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const [tagInputValue, setTagInputValue] = useState('');
//     const [tags, setTags] = useState<string[]>([]);

//     const handleRemoveFile = (index: number) => {
//         setFiles((prevFiles) => {
//             const newFiles = [...prevFiles];
//             newFiles.splice(index, 1);
//             return newFiles;
//         });
//     };

//     const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         if (value.endsWith(',')) {
//             setTags([...tags, value.slice(0, -1)]);
//             setTagInputValue('');
//         } else {
//             setTagInputValue(value);
//         }
//     };

//     const handleRemoveTag = (index: number) => {
//         const newTags = [...tags];
//         newTags.splice(index, 1);
//         setTags(newTags);
//     };

//     useEffect(() => {
//         if (initialData?.blogId !== undefined) {
//             setCreateNew(false);
//         }
//     }, [initialData?.blogId]);

//     const uploadDetailsAndFileToIPFS = async (title: string, description: string, file: File) => {
//         try {
//             console.log('Uploading details and file:', title, description, file.name);

//             const reader = new FileReader();
//             reader.readAsArrayBuffer(file);

//             return new Promise((resolve, reject) => {
//                 reader.onloadend = async () => {
//                     try {
//                         const fileBuffer = Buffer.from(reader.result as ArrayBuffer);

//                         const data = {
//                             title,
//                             description,
//                         };

//                         const jsonBuffer = Buffer.from(JSON.stringify(data));

//                         // Replace this with your actual IPFS client instance
//                         const client = create({ host: 'ipfs.io', port: 5003, protocol: 'https' });

//                         const result = await client.add(jsonBuffer);

//                         console.log('Details and file uploaded to IPFS:', result.path);
//                         setTimeout(() => {
//                             setUploadStatus(`File "${file.name}" uploaded successfully!`);
//                             resolve(result.path);
//                         }, 3000); // 3 seconds delay
//                     } catch (error) {
//                         console.error('Error uploading details and file to IPFS:', error);
//                         reject(new Error('Failed to upload details and file to IPFS'));
//                     }
//                 };

//                 reader.onerror = () => reject(new Error('Failed to read file'));
//             });
//         } catch (error) {
//             console.error('Error uploading details and file to IPFS:', error);
//             throw new Error('Failed to upload details and file to IPFS');
//         }
//     };

//     const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             const newFiles = Array.from(event.target.files);
//             setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//         }
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         if (files.length === 0) {
//             window.alert("Please select a file to upload.");
//             return;
//         }

//         try {
//             // Upload each file along with the disease details
//             const ipfsHashes = await Promise.all(files.map(file =>
//                 uploadDetailsAndFileToIPFS(blogTitle, blogDescription, file)
//             ));

//             if (ipfsHashes.includes(null)) {
//                 window.alert("File upload to IPFS failed.");
//                 return;
//             }

//             // Assuming single file upload, you can extend this for multiple files
//             const ipfsHash = ipfsHashes[0];

//             const response = await addRecordToBlockchain(blogTitle, blogDescription, ipfsHash);

//             if (response!) {
//                 window.alert("Success!");
//             } else {
//                 window.alert("Failed to add record on the blockchain.");
//             }
//         } catch (error) {
//             console.error('Error submitting blog:', error);
//         }
//         async function addRecordToBlockchain(title, description, ipfsHash) {
//             if (typeof window.ethereum !== 'undefined') {
//                 const web3 = new Web3(window.ethereum);
//                 await window.ethereum.enable();

//                 const contract = new web3.eth.Contract(RecordRegistry.abi, '0xB5371a1a11b2ab4eB6fa537FcE3C93d1d381b230'); //address of the smart contract deployed on the Ganache network (for testting)
//                 const accounts = await web3.eth.getAccounts();

//                 try {
//                     await contract.methods.addRecord(title, description, ipfsHash).send({ from: accounts[0] });
//                     console.log('Record added successfully');
//                 } catch (error) {
//                     console.error('Error adding record:', error);
//                 }
//             } else {
//                 console.error('MetaMask not detected');
//             }
//         }

//         const formData = new FormData();
//         formData.append('blog_id', blogId);
//         formData.append('blog_title', blogTitle);
//         formData.append('blog_description', blogDescription);
//         formData.append('create_new', createNew.toString());
//         formData.append('tags', JSON.stringify(tags));

//         files.forEach((file) => {
//             formData.append('files', file);
//         });

//         try {
//             const response = await fetch('/api/submit-blog', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 window.alert("Success!");
//             } else {
//                 window.alert("Failed!");
//                 console.error("Blog create/update failed!");
//             }
//         } catch (error) {
//             window.alert("Failed!");
//             console.error('Error submitting blog:', error);
//         }
//     };

//     return (
//         <div>
//             <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
//                 <div className="mb-4">
//                     <label className="block text-black text-sm font-bold mb-2" htmlFor="blog_title">
//                         Record Title
//                     </label>
//                     <input
//                         className="shadow appearance-none rounded w-full py-2 px-3 bg-white-900 text-black leading-tight focus:outline-none focus:shadow-outline"
//                         id="blog_title"
//                         type="text"
//                         name="blog_title"
//                         value={blogTitle}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-black text-sm font-bold mb-2" htmlFor="blog_description">
//                         Record Description
//                     </label>
//                     <textarea
//                         className="shadow appearance-none rounded w-full py-2 px-3 bg-white-900 text-black leading-tight focus:outline-none focus:shadow-outline"
//                         id="blog_description"
//                         name="blog_description"
//                         rows={4}
//                         value={blogDescription}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 </div>

//                 {/* Tag input */}
//                 <div className="w-full mb-4">
//                     <div className="flex flex-wrap gap-2">
//                         {tags.map((tag, index) => (
//                             <div
//                                 key={index}
//                                 className="px-3 py-2 rounded-full text-sm font-medium bg-blue-500 text-white"
//                             >
//                                 {tag}
//                                 <button
//                                     type="button"
//                                     className="ml-2 text-sm text-white hover:text-gray-300"
//                                     onClick={() => handleRemoveTag(index)}
//                                 >
//                                     ×
//                                 </button>
//                             </div>
//                         ))}
//                         <input
//                             type="text"
//                             value={tagInputValue}
//                             onChange={handleTagInputChange}
//                             placeholder="Add a tag and press comma"
//                             className="flex-grow px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
//                         />
//                     </div>
//                 </div>

//                 {/* File upload */}
//                 <div className="w-full mb-4">
//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileSelect}
//                         className="hidden"
//                         multiple
//                     />
//                     <div
//                         className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer"
//                         onClick={() => fileInputRef.current?.click()}
//                     >
//                         <AddIcon />
//                         <p className="ml-2 text-sm">Click to upload files</p>
//                     </div>
//                     <ul className="mt-2">
//                         {files.map((file, index) => (
//                             <li key={index} className="flex items-center justify-between mb-2">
//                                 <p className="text-sm">{file.name}</p>
//                                 <button
//                                     type="button"
//                                     className="text-sm text-red-500 hover:underline"
//                                     onClick={() => handleRemoveFile(index)}
//                                 >
//                                     Remove
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Upload status */}
//                 {uploadStatus && (
//                     <div className="mb-4">
//                         <p className="text-sm text-green-500">{uploadStatus}</p>
//                     </div>
//                 )}

//                 <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     type="submit"
//                     onClick={handleSubmit}
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default BlogForm;

'use client';
import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import Web3 from 'web3';
import RecordRegistry from '../../../../backend/contracts/build/contracts/Registry.json';
import AddIcon from '@mui/icons-material/Add';
import { create } from 'ipfs-http-client';

interface SelectedFile extends File {
    name: string;
}

interface BlogFormProps {
    initialData?: {
        blogId: string | null;
        blogTitle: string;
        blogDescription: string;
    },
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData }) => {
    const [blogId, setBlogId] = useState(initialData?.blogId || '');
    const [blogTitle, setTitle] = useState(initialData?.blogTitle || '');
    const [blogDescription, setDescription] = useState(initialData?.blogDescription || '');
    const [createNew, setCreateNew] = useState(true);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const [files, setFiles] = useState<SelectedFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [tagInputValue, setTagInputValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.endsWith(',')) {
            setTags([...tags, value.slice(0, -1)]);
            setTagInputValue('');
        } else {
            setTagInputValue(value);
        }
    };

    const handleRemoveTag = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    useEffect(() => {
        if (initialData?.blogId !== undefined) {
            setCreateNew(false);
        }
    }, [initialData?.blogId]);

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Simulate a delay and then display success message
        setUploadStatus('Uploading...');
        setTimeout(() => {
            setUploadStatus('Success! The form was submitted successfully.');
        }, 3000); // 3 seconds delay for testing purposes
    };

    return (
        <div>
            <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-black text-sm font-bold mb-2" htmlFor="blog_title">
                        Record Title
                    </label>
                    <input
                        className="shadow appearance-none rounded w-full py-2 px-3 bg-white-900 text-black leading-tight focus:outline-none focus:shadow-outline"
                        id="blog_title"
                        type="text"
                        name="blog_title"
                        value={blogTitle}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black text-sm font-bold mb-2" htmlFor="blog_description">
                        Record Description
                    </label>
                    <textarea
                        className="shadow appearance-none rounded w-full py-2 px-3 bg-white-900 text-black leading-tight focus:outline-none focus:shadow-outline"
                        id="blog_description"
                        name="blog_description"
                        rows={4}
                        value={blogDescription}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Tag input */}
                <div className="w-full mb-4">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="px-3 py-2 rounded-full text-sm font-medium bg-blue-500 text-white"
                            >
                                {tag}
                                <button
                                    type="button"
                                    className="ml-2 text-sm text-white hover:text-gray-300"
                                    onClick={() => handleRemoveTag(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={tagInputValue}
                            onChange={handleTagInputChange}
                            placeholder="Add a tag and press comma"
                            className="flex-grow px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* File upload */}
                <div className="w-full mb-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        multiple
                    />
                    <div
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <AddIcon />
                        <p className="ml-2 text-sm">Click to upload files</p>
                    </div>
                    <ul className="mt-2">
                        {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between mb-2">
                                <p className="text-sm">{file.name}</p>
                                <button
                                    type="button"
                                    className="text-sm text-red-500 hover:underline"
                                    onClick={() => handleRemoveFile(index)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Upload status */}
                {uploadStatus && (
                    <div className="mb-4">
                        <p className={`text-sm ${uploadStatus.startsWith('Success') ? 'text-green-500' : 'text-blue-500'}`}>
                            {uploadStatus}
                        </p>
                    </div>
                )}

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
