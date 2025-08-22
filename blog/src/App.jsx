import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Blog from "./component/Blog";
import User from "./component/User";
import BlogDetail from "./component/BlogDetail";
import NotFound from "./component/NotFound";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route
        path="/blog"
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        }
      />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/" element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
