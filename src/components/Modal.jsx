import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditModal = ({ show, handleClose, handleSave, formData, handleChange, tagOptions, handleCheckboxChange }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="image" className="form-label">Image URL:</label>
                <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content:</label>
                <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category:</label>
                <select
                    className="form-select"
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                >
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                    <option value="4">Category 4</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Tags:</label>
                {tagOptions.map((tag) => (
                    <div key={tag} className='d-flex'>
                        <input
                            type="checkbox"
                            name={tag}
                            checked={formData.tagId === tag}
                            onChange={() => handleCheckboxChange(tag)}
                        />
                        <label className='mx-2'>{tag}</label>
                    </div>
                ))}
            </div>

            <div className="mb-3">
                <label className="form-label">Published:</label>
                <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                />
            </div>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export default EditModal;