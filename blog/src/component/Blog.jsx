import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Carousel, Form } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    meta: "",
    description: "",
    tags: [],
    images: [],
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:7777/Get", { method: "GET" });
      const result = await res.json();
      if (result.data) {
        const formatted = result.data.map((item) => ({
          id: item._id,
          title: item.Product_Name,
          meta: item.Meta_Description,
          description: item.Description,
          images: item.Product_Images.map(
            (img) => `http://localhost:7777/${img}`
          ),
          tags: item.Tags || [],
        }));
        setBlogs(formatted);
      } else {
        toast.error("No blogs found!");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to fetch blogs!");
    }
  };

  const handleChange = (e, state, setState) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleImageAdd = (e, state, setState) => {
    const files = Array.from(e.target.files);
    const availableSlots = 5 - state.images.length;

    const filesToAdd = files.slice(0, availableSlots);

    const imagesWithPreview = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setState({ ...state, images: [...state.images, ...imagesWithPreview] });

    if (files.length > availableSlots) {
      toast.error("Maximum 5 images allowed!");
    }
  };

  const handleImageRemove = (index, state, setState) => {
    const updatedImages = state.images.filter((_, i) => i !== index);
    setState({ ...state, images: updatedImages });
  };

  const handleimagedelete = async (id) => {
    try {
      setShowDelete(false);
      const res = await fetch(`http://localhost:7777/Delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data) {
        toast.success("Blog deleted successfully!");
        fetchBlogs();
      } else {
        toast.error("Failed to delete blog: " + data.message);
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Something went wrong!");
    }
  };

  const handlesignleimageget = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:7777/Singleproduct/${id}`,
        { method: "GET" }
      );
      const result = await response.json();
      if (result.data) {
        const blogData = result.data;
        setSelectedBlog({
          id: blogData._id,
          title: blogData.Product_Name,
          meta: blogData.Meta_Description,
          description: blogData.Description,
          tags: blogData.Tags || [],
          images: blogData.Product_Images.map(
            (img) => `http://localhost:7777/${img}`
          ),
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const handleAddBlog = async () => {
    try {
      const formData = new FormData();
      newBlog.images.forEach((imgObj) =>
        formData.append("Images", imgObj.file)
      );
      formData.append("Product_Name", newBlog.title);
      formData.append("Description", newBlog.description);
      formData.append("Meta_Description", newBlog.meta);
      formData.append("Tags", JSON.stringify(newBlog.tags || []));

      const res = await fetch("http://localhost:7777/Add", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result) {
        toast.success(result.message || "Blog added successfully!");
        fetchBlogs();
        setNewBlog({
          title: "",
          meta: "",
          description: "",
          images: [],
          tags: [],
        });
        setShowAdd(false);
      } else {
        toast.error(result.message || "Failed to add blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleEditBlog = async (_id) => {
    if (!selectedBlog) return;
    try {
      const formData = new FormData();
      selectedBlog.images.forEach((imgObj) => {
        if (imgObj.file) formData.append("Images", imgObj.file);
      });
      formData.append("Product_Name", selectedBlog.title || "");
      formData.append("Description", selectedBlog.description || "");
      formData.append("Meta_Description", selectedBlog.meta || "");
      formData.append("Tags", JSON.stringify(selectedBlog.tags || []));
      const existingImages = selectedBlog.images
        .filter((img) => !img.file)
        .map((img) => img.replace("http://localhost:7777/", ""));
      formData.append("Existing_Images", JSON.stringify(existingImages));

      const res = await fetch(`http://localhost:7777/Update?id=${_id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (data || data.message === "Product updated successfully") {
        toast.success(data.message || "Blog updated successfully!");
        fetchBlogs();
        setShowEdit(false);
      } else {
        toast.error("Update failed: " + data.message);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token,"!!!!!!!!!!!!!!!!!!!!!!!");
      
      if (!token) {
        toast.error("No token found!");
        return;
      }

      const response = await fetch("http://localhost:7777/Logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Logged out successfully!");
        localStorage.removeItem("authToken");
        setShowLogout(false);

        window.location.href = "/admin";
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="text-center mb-10">
        <p className="text-gray-500 uppercase tracking-widest">Admin</p>
        <h2 className="text-3xl font-bold">
          Our Latest <span className="text-purple-600">Blogs</span>
        </h2>
      </div>
      <div className="flex justify-end gap-4 mb-4">
        <Button onClick={() => setShowLogout(true)}>Logout</Button>
        <Button onClick={() => setShowAdd(true)}>Add Blog</Button>
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
              <div className="flex justify-evenly p-3 ">
                <Button
                  onClick={() => {
                    setSelectedBlog({ ...blog });
                    handlesignleimageget(blog.id);
                    setSelectedIndex(idx);
                    setShowDetail(true);
                  }}
                >
                  View Detail
                </Button>
                <Button
                  className="bg-danger border-none ms-3"
                  onClick={() => {
                    setSelectedBlog(blog);
                    setSelectedIndex(idx);
                    setShowDelete(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Blog Details</Modal.Title>
          <Button
            variant="warning"
            className="ms-3"
            onClick={() => {
              setShowDetail(false);
              setShowEdit(true);
            }}
          >
            Edit
          </Button>
        </Modal.Header>
        <Modal.Body>
          <h5>{selectedBlog?.title}</h5>
          <p>
            <strong>Meta:</strong> {selectedBlog?.meta}
          </p>
          <p>
            <strong>Description:</strong> {selectedBlog?.description}
          </p>

          <p>
            <strong>Tags:</strong>{" "}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedBlog?.tags?.length > 0 ? (
                selectedBlog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full shadow-sm"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span>No Tags</span>
              )}
            </div>
          </p>

          {selectedBlog?.images?.length > 0 && (
            <div
              className="d-flex flex-wrap gap-2 mb-4"
              style={{
                maxHeight: "250px",
                overflowY: "auto",
                padding: "5px",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
              }}
            >
              {selectedBlog.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`blog-img-${i}`}
                  style={{
                    width: "120px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        size="sm"
        show={showDelete}
        onHide={() => setShowDelete(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to delete this blog? Once deleted it cannot be
          restored.
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-danger"
            onClick={() => {
              handleimagedelete(selectedBlog.id);
            }}
          >
            Delete
          </Button>
          <Button onClick={() => setShowDelete(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedBlog.title}
                  onChange={(e) =>
                    handleChange(e, selectedBlog, setSelectedBlog)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Meta</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="meta"
                  value={selectedBlog.meta}
                  onChange={(e) =>
                    handleChange(e, selectedBlog, setSelectedBlog)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={selectedBlog.description}
                  onChange={(e) =>
                    handleChange(e, selectedBlog, setSelectedBlog)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {selectedBlog?.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="badge bg-primary d-flex align-items-center"
                      style={{
                        gap: "6px",
                        padding: "6px 10px",
                        fontSize: "14px",
                      }}
                    >
                      {tag}
                      <MdCancel
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedBlog({
                            ...selectedBlog,
                            tags: selectedBlog.tags.filter(
                              (_, idx) => idx !== i
                            ),
                          });
                        }}
                      />
                    </span>
                  ))}
                </div>

                <Form.Control
                  type="text"
                  placeholder="Type tag & press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.target.value.trim();
                      if (value && !selectedBlog.tags.includes(value)) {
                        setSelectedBlog({
                          ...selectedBlog,
                          tags: [...(selectedBlog.tags || []), value],
                        });
                      }
                      e.target.value = "";
                    }
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Images</Form.Label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {selectedBlog.images.map((img, i) => (
                    <div key={i} className="position-relative">
                      <img
                        src={img}
                        alt="blog"
                        style={{
                          width: "100px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                      <Button
                        size="sm"
                        variant="danger"
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          borderRadius: "50%",
                        }}
                        onClick={() =>
                          handleImageRemove(i, selectedBlog, setSelectedBlog)
                        }
                      >
                        <MdCancel />
                      </Button>
                    </div>
                  ))}
                </div>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) =>
                    handleImageAdd(e, selectedBlog, setSelectedBlog)
                  }
                />
              </Form.Group>

              <div className="flex justify-end gap-2 mt-3">
                <Button variant="secondary" onClick={() => setShowEdit(false)}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleEditBlog(selectedBlog.id)}
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showAdd} onHide={() => setShowAdd(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={newBlog.title}
                onChange={(e) => handleChange(e, newBlog, setNewBlog)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Meta</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter meta"
                name="meta"
                value={newBlog.meta}
                onChange={(e) => handleChange(e, newBlog, setNewBlog)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                name="description"
                value={newBlog.description}
                onChange={(e) => handleChange(e, newBlog, setNewBlog)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {newBlog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="badge bg-primary d-flex align-items-center"
                    style={{
                      gap: "6px",
                      padding: "6px 10px",
                      fontSize: "14px",
                    }}
                  >
                    {tag}
                    <MdCancel
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setNewBlog({
                          ...newBlog,
                          tags: newBlog.tags.filter((_, idx) => idx !== i),
                        });
                      }}
                    />
                  </span>
                ))}
              </div>

              <Form.Control
                type="text"
                placeholder="Type tag & press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value && !newBlog.tags.includes(value)) {
                      setNewBlog({
                        ...newBlog,
                        tags: [...newBlog.tags, value],
                      });
                    }
                    e.target.value = "";
                  }
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Images</Form.Label>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {newBlog.images.map((imgObj, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={imgObj.preview}
                      alt="blog"
                      style={{
                        width: "100px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <Button
                      size="sm"
                      variant="danger"
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        borderRadius: "50%",
                      }}
                      onClick={() => handleImageRemove(i, newBlog, setNewBlog)}
                    >
                      <MdCancel />
                    </Button>
                  </div>
                ))}
              </div>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleImageAdd(e, newBlog, setNewBlog)}
              />
            </Form.Group>

            <div className="flex justify-end gap-2 mt-3">
              <Button variant="secondary" onClick={() => setShowAdd(false)}>
                Cancel
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  setBlogs([...blogs, newBlog]);
                  handleAddBlog();
                  setNewBlog({
                    title: "",
                    meta: "",
                    description: "",
                    images: [],
                    tags: [],
                  });
                  setShowAdd(false);
                }}
              >
                Add Blog
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showLogout}
        onHide={() => setShowLogout(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogout(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blog;
