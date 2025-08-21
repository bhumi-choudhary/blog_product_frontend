
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './component/Login';
import Blog from './component/Blog';
import User from './component/User';

function App() {


  return (
    <>
      <Login />

      <Routes>
        <Route path="/blog" element={<Blog />} />
      </Routes>


    </>
  )
}

export default App
