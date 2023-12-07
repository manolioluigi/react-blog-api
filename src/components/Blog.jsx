import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditModal from './Modal';

const Blog = () => {
    const [tagOptions, setTagOptions] = useState(['html', 'css', 'javascript', 'react', 'nodejs', 'mongodb']);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        content: '',
        category: 'uncategorized',
        tags: [],
        published: false,
    });
    const [modalData, setModalData] = useState({
        title: '',
        image: '',
        content: '',
        category: 'uncategorized',
        tags: [],
        published: false,
    });

    const [articles, setArticles] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [showModal, setShowModal] = useState(false);


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevModalData) => ({
            ...prevModalData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (tag) => {
        setFormData((prevFormData) => {
            const updatedTags = prevFormData.tags.includes(tag)
                ? prevFormData.tags.filter((t) => t !== tag)
                : [...prevFormData.tags, tag];

            return {
                ...prevFormData,
                tags: updatedTags,
            };
        });
    };

    const handleCheckboxModalChange = (tag) => {
        setModalData((prevModalData) => {
            const updatedTags = prevModalData.tags.includes(tag)
                ? prevModalData.tags.filter((t) => t !== tag)
                : [...prevModalData.tags, tag];

            return {
                ...prevModalData,
                tags: updatedTags,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim() !== '') {
            setArticles((prevArticles) => [...prevArticles, { id: Date.now(), ...formData }]);
            setFormData({
                title: '',
                image: '',
                content: '',
                category: 'uncategorized',
                tags: [],
                published: false,
            });
        }
    };


    const handleDelete = (id) => {
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
        if (editingId === id) {
            setEditingId(null);
        }
    };

    const handleEdit = (id, currentArticle) => {
        setEditingId(id);
        setEditTitle(currentArticle.title);
        setModalData({
            title: currentArticle.title || '',
            image: currentArticle.image || '',
            content: currentArticle.content || '',
            category: currentArticle.category || 'uncategorized',
            tags: currentArticle.tags || [],
            published: currentArticle.published || false,
        });
        //console.log(currentArticle);
        handleShowModal();
    };

    const handleSaveModalChanges = () => {
        console.log('Prima delle modifiche:', articles, editingId, modalData);

        setArticles((prevArticles) =>
            prevArticles.map((article) =>
                article.id === editingId ? { ...article, ...modalData } : article
            )
        );

        setEditingId(null);
        handleCloseModal();

        console.log('Dopo le modifiche:', articles, editingId, modalData);
    };

    useEffect(() => {
        console.log('Modal Data cambiato:', modalData);
    }, [modalData]);



    return (
        <div className='my-container d-flex flex-column align-items-center'>

            <div className="row width-full">
                <div className="col no-padding">
                    <form className='width-full no-padding mb-3' onSubmit={handleSubmit}>
                        <label className='form-label mt-3'>Title:</label>
                        <div className='d-flex'>
                            <input type="text" className='form-control' name="title" value={formData.title} onChange={handleChange} />
                        </div>
                        <label className='form-label mt-3'>Image URL:</label>
                        <div className='d-flex'>
                            <input type="text" className='form-control' name="image" value={formData.image} onChange={handleChange} placeholder='https://picsum.photos/200' />
                        </div>
                        <label className='form-label mt-3'>Content:</label>
                        <div className='d-flex'>
                            <textarea className='form-control' name="content" value={formData.content} onChange={handleChange}></textarea>
                        </div>
                        <label className='form-label mt-3'>Category:</label>
                        <div className='d-flex'>
                            <select className='form-select' name="category" value={formData.category} onChange={handleChange}>
                                <option value="uncategorized">Uncategorized</option>
                                <option value="categoryone">Category 1</option>
                                <option value="categorytwo">Category 2</option>
                            </select>
                        </div>
                        <label className='form-label mt-3'>Tags:</label>
                        <div className="d-flex flex-column">
                            {tagOptions.map((tag) => (
                                <div key={tag} className='d-flex'>
                                    <input
                                        type="checkbox"
                                        name={tag}
                                        checked={formData.tags.includes(tag)}
                                        onChange={() => handleCheckboxChange(tag)}
                                    />
                                    <label className='mx-2'>{tag}</label>
                                </div>
                            ))}
                        </div>
                        <label className='form-label mt-3'>Published:</label>
                        <input type="checkbox" name="published" className='mx-2' checked={formData.published} onChange={() => setFormData((prevFormData) => ({ ...prevFormData, published: !prevFormData.published }))} />
                        <div>
                            <button className='btn btn-primary' type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row width-full">
                <hr className='width-400' />
                <ul className='list-unstyled width-full no-padding-left'>
                    <EditModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleSave={handleSaveModalChanges}
                        formData={modalData}
                        handleChange={handleModalChange}
                        tagOptions={tagOptions}
                        handleCheckboxChange={handleCheckboxModalChange}
                    />
                    {articles.map((article) => (
                        <li key={article.id}>
                            <div className='row my-1'>
                                <div className="col-9 no-padding">
                                    <span className='mx-3'>{article.title}</span>
                                </div>
                                <div className="col-3 no-padding">
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-sm btn-warning' onClick={() => handleEdit(article.id, article)}>
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                        <button className='btn btn-sm btn-danger' onClick={() => handleDelete(article.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr className='width-400' />
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Blog;
