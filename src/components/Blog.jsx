import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditModal from './Modal';

const Blog = () => {
    const [tagOptions, setTagOptions] = useState(['1', '2', '3', '4']);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        content: '',
        categoryId: '1',
        tagId: null,
        published: false,
    });
    const [modalData, setModalData] = useState({
        title: '',
        image: '',
        content: '',
        categoryId: '1',
        tagId: null,
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
            const updatedTagId = prevFormData.tagId === tag ? null : tag;

            return {
                ...prevFormData,
                tagId: updatedTagId,
            };
        });
    };

    const handleCheckboxModalChange = (tag) => {
        setModalData((prevModalData) => {
            const updatedTagId = prevModalData.tagId === tag
                ? null
                : tag;

            return {
                ...prevModalData,
                tagId: updatedTagId,
            };
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3300/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    categoryId: parseInt(formData.categoryId),
                    tagId: parseInt(formData.tagId),
                }),
            });

            if (!response.ok) {
                throw new Error('Errore durante l\'invio del post');
            }

            const data = await response.json();
            setArticles((prevArticles) => [...prevArticles, data.data]);
            setFormData({
                title: '',
                image: '',
                content: '',
                categoryId: '1',
                tagId: null,
                published: false,
            });
            console.log('Post inviato con successo:', data.data);
        } catch (error) {
            console.error('Errore durante l\'invio del post:', error);
        }
    };

    const handleEdit = (id, article) => {
        setEditingId(id);
        setModalData({
            title: article.title || '',
            image: article.image || '',
            content: article.content || '',
            categoryId: article.categoryId || '1',
            tagId: article.tagId || null,
            published: article.published || false,
            slug: article.slug,
        });
        handleShowModal();
    };

    const handleDelete = async (slugToDelete) => {
        try {
            const deleteResponse = await fetch(`http://localhost:3300/posts/${slugToDelete}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error(`Errore durante l'eliminazione del post (${deleteResponse.status}): ${await deleteResponse.text()}`);
            }

            setArticles((prevArticles) => prevArticles.filter((article) => article.slug !== slugToDelete));
            console.log('Post eliminato con successo');
        } catch (error) {
            console.error('Errore durante l\'eliminazione del post:', error);
        }
    };

    const handleSaveModalChanges = async () => {
        try {
            console.log('Prima della richiesta API');
            console.log('Dati inviati:', JSON.stringify({
                ...modalData,
                categoryId: parseInt(modalData.categoryId),
                tagId: parseInt(modalData.tagId),
            }));
            const updateResponse = await fetch(`http://localhost:3300/posts/${modalData.slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...modalData,
                    categoryId: parseInt(modalData.categoryId),
                    tagId: parseInt(modalData.tagId),
                }),
            });
            console.log('Dopo la richiesta API');


            if (!updateResponse.ok) {
                throw new Error(`Errore durante l'aggiornamento del post (${updateResponse.status}): ${await updateResponse.text()}`);
            }

            setArticles((prevArticles) =>
                prevArticles.map((prevArticle) =>
                    prevArticle.slug === modalData.slug ? { ...prevArticle, ...modalData } : prevArticle
                )
            );

            setEditingId(null);
            handleCloseModal();
            console.log('Post aggiornato con successo');
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del post:', error);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3300/posts');
                const data = await response.json();
                setArticles(data.data);
            } catch (error) {
                console.error('Errore nel recupero dei post:', error);
            }
        };

        fetchPosts();
        console.log(fetchPosts)
    }, []);

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
                            <select className='form-select' name="categoryId" value={formData.categoryId} onChange={handleChange}>
                                <option value="1">Category 1</option>
                                <option value="2">Category 2</option>
                                <option value="3">Category 3</option>
                                <option value="4">Category 4</option>
                            </select>
                        </div>
                        <label className='form-label mt-3'>Tags:</label>
                        <div className="d-flex flex-column">
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
                                        <button className='btn btn-sm btn-danger' onClick={() => handleDelete(article.slug)}>
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
