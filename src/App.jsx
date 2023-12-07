// src/App.jsx
import React from 'react';
import Blog from './components/Blog';

const App = () => {
  return (
    <div className='container d-flex flex-column align-items-center my-5'>
      <h1 className='mb-5'>reactFormBlog.jsx</h1>
      <Blog />
    </div>
  );
};

export default App;
