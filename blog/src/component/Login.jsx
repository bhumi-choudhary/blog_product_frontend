import React from "react";
import { Card, Form, Button, FloatingLabel } from "react-bootstrap";

const Login = () => {
    return (
        <div class="min-h-screen flex items-center justify-center">
            <div class="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-screen-xl w-full mx-4 min-h-[600px]">


                <div class="md:w-1/2 w-full">
                    <img
                        src="https://media.istockphoto.com/id/1588289977/es/foto/feliz-estudiante-negra-durante-una-clase-en-la-sala-de-conferencias-mirando-a-la-c%C3%A1mara.jpg?s=612x612&w=0&k=20&c=uYsHI--vkn0-X6gkHMTZnJMyR8396cM85GJcnsCdduU="
                        alt="Welcome"
                        class="object-cover h-full w-full"
                    />
                </div>


                <div class="md:w-1/2 w-full flex flex-col justify-center p-12 bg-white">
                    <h2 class="text-4xl font-extrabold text-blue-600 mb-10 text-center">Welcome Admin</h2>

                    <form class="space-y-6">
                        <div class="relative">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                                alt="Email"
                                class="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                class="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-base shadow-sm transition duration-200"
                            />
                        </div>

                        <div class="relative">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
                                alt="Password"
                                class="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                class="pl-12 pr-4 py-3 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-base shadow-sm transition duration-200"
                            />
                        </div>

                        <button
                            type="submit"
                            class="w-full py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
                        >
                            Log In
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Login;
