import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Carousel } from "react-bootstrap";

const User = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

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
        images: item.Product_Images.map(
          (img) => `http://localhost:7777/public/${img}`
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
      <div className="text-center mb-10">
        <p className="text-gray-500 uppercase tracking-widest">Blog</p>
        <h2 className="text-3xl font-bold">
          Our Latest <span className="text-purple-600">Blogs</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, idx) => (
          <Card
            key={idx}
            className="shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Carousel interval={2000} pause="hover">
              {blog.images.map((img, i) => (
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100"
                    style={{ height: "200px", objectFit: "cover" }}
                    src={img}
                    alt={`Slide ${i}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text className="text-gray-600 line-clamp-2">
                {blog.meta}
              </Card.Text>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setSelectedBlog(blog);
                    setShowDetail(true);
                  }}
                >
                  View Detail
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <>
              <h5>Title</h5>
              <p>{selectedBlog.title}</p>
              <h5>Meta Description</h5>
              <p>{selectedBlog.meta}</p>
              <h5>Description</h5>
              <p>{selectedBlog.description}</p>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowDetail(false)}
                  variant="success"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default User;