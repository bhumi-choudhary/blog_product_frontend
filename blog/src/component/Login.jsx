import React, { useState } from "react";
import { Card, Form, Button, FloatingLabel } from "react-bootstrap";
import { NavLink } from "react-router";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-screen-xl w-full mx-4 min-h-[600px]">


                <div className="md:w-1/2 w-full">
                    <img
                        src="https://media.istockphoto.com/id/1588289977/es/foto/feliz-estudiante-negra-durante-una-clase-en-la-sala-de-conferencias-mirando-a-la-c%C3%A1mara.jpg?s=612x612&w=0&k=20&c=uYsHI--vkn0-X6gkHMTZnJMyR8396cM85GJcnsCdduU="
                        alt="Welcome"
                        className="object-cover h-full w-full"
                    />
                </div>


                <div className="md:w-1/2 w-full flex flex-col justify-center p-12 bg-white">
                    <h2 className="text-4xl font-extrabold text-blue-600 mb-10 text-center">Welcome Admin</h2>

                    <form className="space-y-6">
                        <div className="relative">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                                alt="Email"
                                className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-base shadow-sm transition duration-200"
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
                                className="pl-12 pr-12 py-3 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-base shadow-sm transition duration-200"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.97 9.97 0 011.05-4.375M6.18 6.18A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 10a9.957 9.957 0 01-1.05 4.375M3 3l18 18"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <NavLink to='/blog'>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                            >
                                Log In
                            </button>
                        </NavLink>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Login;
