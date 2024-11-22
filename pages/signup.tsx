


import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../app/globals.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(false);  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password length and confirm password match
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://blogbackend-sigma.vercel.app/signup", { email, password, confirmPassword });

      // If signup is successful, redirect to login page
      if (response.data.message === "User registered successfully") {
        router.push("/login");
      }
    } catch (error: any) {
      // Check if the error is due to user already existing
      if (error.response && error.response.data.message === "Email already registered") {
        setUserExists(true); 
      } else {
        setError("Failed to register. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-md mx-auto p-4 mt-8">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
              minLength={6}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        {/* If user already exists, show signin link */}
        {userExists && (
          <p className="text-center text-sm text-red-500 mt-4">
            User already exists.{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-gray-700 cursor-pointer underline"
            >
              Sign in here.
            </span>
          </p>
        )}
      </main>
    </div>
  );
};

export default Signup;
