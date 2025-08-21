
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './component/Login';
import Blog from './component/Blog';
import User from './component/User';

function App() {


  return (
    <>
<<<<<<< HEAD
      <Login />

      <Routes>
        <Route path="/blog" element={<Blog />} />
      </Routes>


=======
      {/* <Blog /> */}
      <User/>
>>>>>>> 22f9e2239c8d4427c4e0f29b97c8abb878718f59
    </>
  )
}

export default App
