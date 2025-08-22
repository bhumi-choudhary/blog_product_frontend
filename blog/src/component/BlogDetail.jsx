import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom"; 
import { IoMdArrowRoundBack } from "react-icons/io";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  // Fetch single blog
  const fetchBlog = async () => {
    try {
      const res = await fetch(`http://localhost:7777/Singleproduct/${id}`);
      const result = await res.json();
      const item = result.data;

      const formatted = {
        id: item._id,
        title: item.Product_Name,
        meta: item.Meta_Description,
        description: item.Description,
        tags: item.Tags || [],
        images: item.Product_Images.map(
          (img) => `http://localhost:7777/${img}`
        ),
      };
      setBlog(formatted);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container my-5">
      {/* Back Button */}
      <NavLink to="/" className="no-underline">
        <Button
          variant="light"
          className="mb-4 d-flex align-items-center gap-2 shadow-sm px-3 py-2 rounded-lg"
        >
          <IoMdArrowRoundBack size={20} />
          <span className="fw-semibold">Back</span>
        </Button>
      </NavLink>

      {/* Blog Title & Meta */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-dark mb-2">{blog.title}</h1>
        <p className="text-muted text-lg">{blog.meta}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full shadow-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* All Images Displayed */}
      <div
        className="d-flex flex-wrap gap-3 mb-5"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        {blog.images.map((img, i) => (
          <div key={i} style={{ width: "200px", textAlign: "center" }}>
            <h5 className="mb-2 text-center">Image {i + 1}</h5>
            <img
              src={img}
              alt={`blog-img-${i}`}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Blog Description */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-2xl font-semibold mb-3">Description</h4>
        <p className="text-gray-700 leading-relaxed" style={{ fontSize: "1.1rem" }}>
          {blog.description}
        </p>
      </div>
    </div>
  );
};

export default BlogDetail;
