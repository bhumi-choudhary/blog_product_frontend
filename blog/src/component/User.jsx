import React, { useEffect, useState } from "react";
import { Card, Button, Carousel } from "react-bootstrap";
import { NavLink } from "react-router"; // ✅ fix: use react-router-dom

const User = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:7777/Get", { method: "GET" });
      const result = await res.json();

      const formatted = result.data.map((item) => ({
        id: item._id,
        title: item.Product_Name,
        meta: item.Meta_Description,
        description: item.Description,
        tags: item.Tags || [],
        images: item.Product_Images.map(
          (img) => `http://localhost:7777/${img}`
        ),
      }));
      setBlogs(formatted);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container my-5">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-gray-500 uppercase tracking-widest">Blog</p>
        <h2 className="text-4xl font-extrabold">
          Our Latest <span className="text-purple-600">Blogs</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Explore insights, tutorials and updates from our team
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, idx) => (
          <Card
            key={idx}
            className="shadow-lg border-0 rounded-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 bg-white"
          >
            {/* Carousel */}
            <div className="overflow-hidden">
              <Carousel interval={2000} pause="hover" controls={false} indicators={false}>
                {blog.images.map((img, i) => (
                  <Carousel.Item key={i}>
                    <img
                      className="d-block w-100 transform hover:scale-110 transition duration-500"
                      style={{ height: "220px", objectFit: "cover" }}
                      src={img}
                      alt={`Slide ${i}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            {/* Card Body */}
            <Card.Body className="p-4">
              <Card.Title className="text-xl font-bold mb-2 line-clamp-2">
                {blog.title}
              </Card.Title>
              <Card.Text className="text-gray-600 mb-3 line-clamp-2">
                {blog.meta}
              </Card.Text>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <NavLink to={`/blog/${blog.id}`}>
                  <Button
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white fw-semibold shadow-md hover:opacity-90"
                  >
                    View Detail
                  </Button>
                </NavLink>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default User;
