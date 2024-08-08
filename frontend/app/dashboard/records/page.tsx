'use client';
import Link from 'next/link';


interface Blog {
    blog_id: string;
    blog_title: string;
    blog_description: string;
    blog_content: string;
}

async function getAllBlogs(): Promise<Blog[]> {
    try {
        const response = await fetch("http://127.0.0.1:8000/get-all-blogs");
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        return data.blogs;
    } catch (error) {
        console.error("Error fetching blogs data:", error);
        throw error;
    }
}

export default async function BlogsPage() {
    const blogs = await getAllBlogs()
    return (
        <>
            <div className="bg-black-700 shadow-md rounded-lg overflow-hidden">
                {blogs.map((blog) => (
                    <div
                        key={blog.blog_id}
                        className="w-full text-left px-6 py-4 hover:bg-black-600 border-b border-gray-500 last:border-b-0 "
                    >
                        <Link
                            href={`/dashboard/update-blog?id=${blog.blog_id}`}
                        >
                            <h4 className="text-lg font-semibold">{blog.blog_title}</h4>
                            <p className="text-gray-400 mt-1">{blog.blog_description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}