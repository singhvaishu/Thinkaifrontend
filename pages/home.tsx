

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import "../app/globals.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from the API when the component loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/post'); 
        setPosts(response.data);
        setFilteredPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching posts.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter posts by author based on the search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) =>
          post.author?.toLowerCase().includes(searchTerm?.toLowerCase())
        )
      );
    }
  }, [searchTerm, posts]);

  return (
    <div>
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">All Blog Posts</h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by author..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-2/3 p-4 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>

      
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Display posts while loading */}
        {loading ? (
          <p className="text-center text-gray-600">Loading posts...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                  {post.image && (
                    <img
                      src={"http://localhost:5000" + post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg mb-4 mt-4"
                    />
                  )}
                  <p className="text-gray-600 mt-2">{post.content ? post.content.slice(0, 100) : 'No content available'}...</p>

                  {/* Author and Date */}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">By:</span> {post.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Posted:</span> {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href="/about" className="inline-block mt-2 px-4 py-2 text-white bg-red-300 rounded-lg hover:bg-red-600 transition-colors">
                      Read more
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No posts found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
