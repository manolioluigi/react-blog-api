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
                    defaultValue={formData.title}
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
                    defaultValue={formData.image}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content:</label>
                <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    defaultValue={formData.content}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category:</label>
                <select
                    className="form-select"
                    id="category"
                    name="category"
                    defaultValue={formData.category}
                    onChange={handleChange}
                >
                    <option value="uncategorized">Uncategorized</option>
                    <option value="categoryone">Category 1</option>
                    <option value="categorytwo">Category 2</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Tags:</label>
                {tagOptions.map((tag) => (
                    <div key={tag} className='d-flex'>
                        <input
                            type="checkbox"
                            name={tag}
                            defaultChecked={formData.tags.includes(tag)}
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
                    defaultChecked={formData.published}
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