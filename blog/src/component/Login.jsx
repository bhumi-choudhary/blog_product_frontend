import React from "react";
import { Card, Form, Button, FloatingLabel } from "react-bootstrap";
import { NavLink } from "react-router";

const Login = () => {
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
                                type="password"
                                placeholder="Password"
                                className="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-base shadow-sm transition duration-200"
                            />
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
