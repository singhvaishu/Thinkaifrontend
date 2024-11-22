
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import "../app/globals.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
  
    try {
      const response = await fetch("https://blogbackend-sigma.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        
      
        router.push("/dashboard");
  
        if (data.message === 'Invalid credentials. Please try again with the correct password.') {
          setErrorMessage(data.message);
        }
      } else {
      
        setUserNotFound(true);
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div>
      <Navbar />
      <main className="max-w-md mx-auto p-4 mt-8">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
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
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white p-3 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>


        {errorMessage && (
          <p className="text-center text-sm text-red-500 mt-4">{errorMessage}</p>
        )}

        {/* If user not found, show signup link */}
        {userNotFound && (
          <p className="text-center text-sm text-red-500 mt-4">
            User not found.{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-gray-700 cursor-pointer underline"
            >
              Sign up here.
            </span>
          </p>
        )}
      </main>
    </div>
  );
};

export default Login;
