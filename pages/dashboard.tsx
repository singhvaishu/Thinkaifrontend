

import { useState, useEffect } from 'react';
import axios from 'axios';
import "../app/globals.css";
const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !author) {
      setError('Title, content, and author are required.');
      return;
    }

    setLoading(true);
    setError(null);

    // Create a FormData object to send data including the image
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);  
    if (image) {
      formData.append('image', image);
    }

    try {
      // Sending data to your backend API
      const response = await axios.post('http://localhost:5000/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setPosts([...posts, response.data.post]);  
      setTitle('');
      setContent('');
      setAuthor('');
      setImage(null);
      setLoading(false);
    } catch (error) {
      setError('Error creating post. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch posts from the backend when the dashboard is loaded
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post');
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Dashboard</h1>

        {/* Create Post Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">Create a New Post</h2>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-600">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-600">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">Upload Image (Optional)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white p-3 rounded-lg mt-4`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>

        {/* Post List - Displayed as Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <p className="text-sm text-gray-500 mt-2">Created By: {post.author}</p>
                <p className="text-sm text-gray-500">Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
                {post.image && (
                  <img src={"http://localhost:5000"+post.image} alt="Post Image" className="w-full mt-4 rounded-lg" />
                )}
                <div className="mt-4">
                  <button
                    onClick={() => alert(`Edit post: ${post._id} - ${post.title}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => alert(`Delete post: ${post._id}`)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
