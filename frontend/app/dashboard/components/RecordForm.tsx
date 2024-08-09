'use client';
import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';

import AddIcon from '@mui/icons-material/Add';

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
    const [createNew, setCreateNew] = useState(true)

    const [files, setFiles] = useState<SelectedFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [tagInputValue, setTagInputValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles: SelectedFile[] = Array.from(event.target.files).map((file) => ({
                ...file,
                name: file.name,
            }));
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('blog_id', blogId);
        formData.append('blog_title', blogTitle);
        formData.append('blog_description', blogDescription);
        formData.append('create_new', createNew.toString());
        formData.append('tags', JSON.stringify(tags));

        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await fetch('/api/submit-blog', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.alert("Success!");
            } else {
                window.alert("Failed!");
                console.error("Blog create/update failed!");
            }
        } catch (error) {
            window.alert("Failed!");
            console.error('Error submitting blog:', error);
        }
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
                                    className="ml-2 text-white hover:text-gray-300"
                                    onClick={() => handleRemoveTag(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={tagInputValue}
                            onChange={handleTagInputChange}
                            className="flex-1 px-3 py-2 rounded-full text-sm text-black font-medium bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add comma seperated tags"
                        />
                    </div>
                </div>

                {/* File Input */}
                <div className="mb-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-black-800 text-white hover:bg-blue-500 py-2 px-4 rounded-full inline-flex items-center space-x-2"
                    >
                        <AddIcon />
                        <span>Select Files</span>
                    </button>
                </div>

                {files.length > 0 && (
                    <div className="border rounded-md p-4">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between mb-2">
                                <span className='text-black'>{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    X
                                    {/* <CrossIcon /> */}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="w-full flex justify-end">
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="py-2 px-20 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold "
                    >
                        {createNew ? 'Publish' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BlogForm;