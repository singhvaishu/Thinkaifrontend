
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); 
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); 

  // Check for localStorage on the client-side
  useEffect(() => {
    setIsClient(true); 
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    setToken(storedToken); 
    setUser(storedUser ? JSON.parse(storedUser) : null); 
  }, []);

 
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const handleLogout = () => {
    if (typeof window !== "undefined") {
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    window.location.href = "/login";
  };

  if (!isClient) return null; 

  return (
    <>
      <div className="w-full h-20 bg-gray-500 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <h1 className="text-red-300 text-lg font-bold">THINKAI</h1>

            {/* Navigation links */}
            <ul className="hidden md:flex gap-x-6 text-white items-center">
              <li>
                <Link href="/about">
                  <p className="cursor-pointer ">About Us</p>
                </Link>
              </li>
              <li>
                {/* <Link href="/services"> */}
                  <p className="cursor-pointer ">Services</p>
                {/* </Link> */}
              </li>
              <li>
                {/* <Link href="/contacts"> */}
                  <p className="cursor-pointer ">Contacts</p>
                {/* </Link> */}
              </li>
            </ul>

            {/* Profile Dropdown Button */}
            <div className="relative md:block">
              <button
                onClick={toggleDropdown}
                className="h-12 w-12 rounded-full bg-red-300 font-bold flex items-center justify-center"

              >
                <VscAccount 
                className="text-lg" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
                  <ul className="py-2">
                    {!token ? (
                      <>
                        <li className="px-4 py-2 hover:bg-gray-200">
                          <Link href="/login">
                            <p className="cursor-pointer">Login</p>
                          </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-200">
                          <Link href="/signup">
                            <p className="cursor-pointer">Signup</p>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="px-4 py-2 hover:bg-gray-200">
                          <Link href="/dashboard">
                            <p className="cursor-pointer">Dashboard</p>
                          </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-200">
                          <button onClick={handleLogout} className="cursor-pointer">
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive menu for mobile */}
      <div className="md:hidden bg-gray-500 text-white px-4">
        <ul className="flex flex-col gap-y-2 py-4">
          <li>
            <Link href="/about">
              <p className="cursor-pointer">About Us</p>
            </Link>
          </li>
          <li>
            
              <p className="cursor-pointer">Services</p>
            
          </li>
          <li>
           
              <p className="cursor-pointer">Contacts</p>
            
          </li>
          {!token ? (
            <>
              <li>
                <Link href="/login">
                  <p className="cursor-pointer">Login</p>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <p className="cursor-pointer">Signup</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/dashboard">
                  <p className="cursor-pointer">Dashboard</p>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="cursor-pointer">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
