import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email & Password are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:7777/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email:email, password:password }),
      });

      const data = await res.json();
      
      if (data.token) {
        localStorage.setItem("authToken", data.token); 
        toast.success("Login successful!");
        setTimeout(() => navigate("/blog"), 1000);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-screen-xl w-full mx-4 min-h-[600px]">
        {/* Left Image */}
        <div className="md:w-1/2 w-full">
          <img
            src="https://media.istockphoto.com/id/1588289977/es/foto/feliz-estudiante-negra-durante-una-clase-en-la-sala-de-conferencias-mirando-a-la-c%C3%A1mara.jpg?s=612x612&w=0&k=20&c=uYsHI--vkn0-X6gkHMTZnJMyR8396cM85GJcnsCdduU="
            alt="Welcome"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-12 bg-white">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-10 text-center">
            Welcome Admin
          </h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                alt="Email"
                className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70"
              />
              <input
                type="email"
                placeholder="Email"
                className="pl-12 pr-4 py-3 w-full rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-base shadow-sm transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
                alt="Password"
                className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-12 pr-12 py-3 w-full rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-base shadow-sm transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
