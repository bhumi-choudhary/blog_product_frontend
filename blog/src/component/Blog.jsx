import React, { useState } from "react";
import { Button, Card, Modal, Carousel, Form } from "react-bootstrap";

const Blog = () => {
    // Multiple Blogs State
    const [blogs, setBlogs] = useState([
        {
            title: "Blog Title 1",
            meta: "Cumque deleniti temporibus ipsam atque a dolores quisquam.",
            description:
                "Mollitia reiciendis porro quo magni incidunt dolore amet atque facilis ipsum deleniti rem!",
            images: [
                "https://picsum.photos/600/300?random=1",
                "https://picsum.photos/600/300?random=2",
            ],
        },
        {
            title: "Blog Title 2",
            meta: "Iusto voluptatem sunt hic excepturi molestias.",
            description:
                "Quisquam velit delectus voluptate ullam, nobis laborum consequatur.",
            images: [
                "https://picsum.photos/600/300?random=3",
                "https://picsum.photos/600/300?random=4",
            ],
        },
    ]);

    // Add Blog State
    const [newBlog, setNewBlog] = useState({
        title: "",
        meta: "",
        description: "",
        images: [],
    });

    // Selected blog for detail/edit/delete
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Modals
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    // --------- Common Handlers ----------
    const handleChange = (e, state, setState) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleImageAdd = (e, state, setState) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setState({ ...state, images: [...state.images, ...newImages] });
    };

    const handleImageRemove = (index, state, setState) => {
        const updated = state.images.filter((_, i) => i !== index);
        setState({ ...state, images: updated });
    };

    return (
        <div className="container my-5">
            {/* Heading */}
            <div className="text-center mb-10">
                <p className="text-gray-500 uppercase tracking-widest">Blog</p>
                <h2 className="text-3xl font-bold">
                    Our Latest <span className="text-purple-600">Blogs</span>
                </h2>
            </div>

            {/* Add Blog Button */}
            <div className="flex justify-end mb-4">
                <Button onClick={() => setShowAdd(true)}>Add Blog</Button>
            </div>

            {/* Blog Cards */}
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

            {/* ---------- Detail Modal ---------- */}
            <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg" centered>
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

            {/* ---------- Delete Modal ---------- */}
            <Modal size="sm" show={showDelete} onHide={() => setShowDelete(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete this blog? Once deleted it cannot be restored.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="bg-danger"
                        onClick={() => {
                            setBlogs(blogs.filter((_, i) => i !== selectedIndex));
                            setShowDelete(false);
                        }}
                    >
                        Delete
                    </Button>
                    <Button onClick={() => setShowDelete(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* ---------- Edit Modal ---------- */}
            <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
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
                                    onChange={(e) => handleChange(e, selectedBlog, setSelectedBlog)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Meta</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="meta"
                                    value={selectedBlog.meta}
                                    onChange={(e) => handleChange(e, selectedBlog, setSelectedBlog)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    value={selectedBlog.description}
                                    onChange={(e) => handleChange(e, selectedBlog, setSelectedBlog)}
                                />
                            </Form.Group>

                            {/* Images */}
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
                                                ❌
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
                                    onClick={() => {
                                        const updated = [...blogs];
                                        updated[selectedIndex] = selectedBlog;
                                        setBlogs(updated);
                                        setShowEdit(false);
                                    }}
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

            {/* ---------- Add Modal ---------- */}
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

                        {/* Images */}
                        <Form.Group>
                            <Form.Label>Images</Form.Label>
                            <div className="d-flex flex-wrap gap-2 mb-2">
                                {newBlog.images.map((img, i) => (
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
                                            onClick={() => handleImageRemove(i, newBlog, setNewBlog)}
                                        >
                                            ❌
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
                                    setNewBlog({ title: "", meta: "", description: "", images: [] });
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
