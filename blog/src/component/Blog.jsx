import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Carousel, Form } from "react-bootstrap";
import { MdCancel } from "react-icons/md";
const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    console.log(blogs, "QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");

    const [newBlog, setNewBlog] = useState({
        title: "",
        meta: "",
        description: "",
        images: [],
    });

    const [selectedBlog, setSelectedBlog] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const fetchBlogs = async () => {
        try {
            const res = await fetch("http://localhost:7777/Get", {
                method: "GET",
            });
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

    const handleChange = (e, state, setState) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleImageAdd = (e, state, setState) => {
        const files = Array.from(e.target.files);
        const imagesWithPreview = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setState({ ...state, images: [...state.images, ...imagesWithPreview] });
    };
    const handleImageRemove = (index, state, setState) => {
        const updatedImages = state.images.filter((_, i) => i !== index);
        setState({ ...state, images: updatedImages });
    };

    const handleimagedelete = async (id) => {
        try {
            // Close the delete modal first
            setShowDelete(false);

            const res = await fetch(`http://localhost:7777/Delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();

            if (data) {
                alert("blog deleted successfully");

                // Refresh the blog list
                fetchBlogs();
            } else {
                console.error("Delete failed:", data.message);
                alert("Failed to delete blog: " + data.message);
            }
        } catch (err) {
            console.error("Error deleting blog:", err);
            alert("Something went wrong!");
        }
    };
    const handlesignleimageget = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:7777/Singleproduct/${id}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log("Single blog data:", data);
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };
    const handleAddBlog = async () => {
        try {
            const formData = new FormData();

            // Append actual files
            newBlog.images.forEach((imgObj) =>
                formData.append("Images", imgObj.file)
            );

            formData.append("Product_Name", newBlog.title);
            formData.append("Description", newBlog.description);
            formData.append("Meta_Description", newBlog.meta);

            const res = await fetch("http://localhost:7777/Add", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            console.log(result);

            if (result.success) {
                alert("Blog added successfully!");
                fetchBlogs(); // refresh blog list from backend
                setNewBlog({ title: "", meta: "", description: "", images: [] });
                setShowAdd(false);
            } else {
                alert("Failed to add blog: " + result.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };
    const handleEditBlog = async (_id) => {
        if (!selectedBlog) return;

        try {
            const formData = new FormData();

            // Append new files
            selectedBlog.images.forEach((imgObj) => {
                if (imgObj.file) formData.append("Images", imgObj.file);
            });

            // Append blog/product data
            formData.append("_id", _id); // match backend
            formData.append("Product_Name", selectedBlog.title);
            formData.append("Description", selectedBlog.description);
            formData.append("Meta_Description", selectedBlog.meta);

            // Append existing images (relative paths only)
            const existingImages = selectedBlog.images
                .filter((img) => !img.file)
                .map((img) => {
                    // Remove base URL only once
                    return img.replace("http://localhost:7777/public/", "");
                });
            formData.append("Existing_Images", JSON.stringify(existingImages));

            // Call backend
            const res = await fetch("http://localhost:7777/Update", {
                method: "PUT",
                body: formData,
            });

            const data = await res.json();

            if (data.success || data.message === "Product updated successfully") {
                alert("Blog updated successfully!");
                fetchBlogs();
                setShowEdit(false);
            } else {
                alert("Update failed: " + data.message);
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            alert("Something went wrong!");
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

            <div className="flex justify-end mb-4">
                <Button
                    onClick={() => {
                        setShowAdd(true);
                    }}
                >
                    Add Blog
                </Button>
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
                            <div className="flex justify-between">
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
                                    className="bg-danger border-none"
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
                    {selectedBlog && (
                        <>
                            <h5>Title</h5>
                            <p>{selectedBlog.title}</p>
                            <h5>Meta Description</h5>
                            <p>{selectedBlog.meta}</p>
                            <h5>Description</h5>
                            <p>{selectedBlog.description}</p>
                            <div className="flex justify-end">
                                <Button onClick={() => setShowDetail(false)} variant="success">
                                    Done
                                </Button>
                            </div>
                        </>
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
        </div>
    );
};

export default Blog;
