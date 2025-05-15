import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './components.css'; // Import your CSS file for styling

function Categories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/category/")
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetch(`http://127.0.0.1:8000/api/product/?category=${selectedCategory}`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(err => console.log(err));
        }
    }, [selectedCategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="Categories-Container"> {/* Added a wrapper div with a class for styling */}
            <div className='Categories-Title'>
                <h1>View All Categories Below</h1>
            </div>
            <div className="Categories-Select">
                <label htmlFor="categorySelect">Select a Category:</label>
                <select id="categorySelect" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value="">--Select Category--</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.shortcode}>
                            {category.display_name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCategory && (
                <div className="Categories-Products">
                    <h2>Products in {categories.find(cat => cat.shortcode === selectedCategory)?.display_name}</h2>
                    {products.length > 0 ? (
                        <div className="Categories-Card-Container">
                            {products.map(product => (
                                <Card key={product.id} style={{ width: '20rem' }} className="Categories-Cards">
                                    <Card.Header>{product.name}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>Price: {product.price}</Card.Text>
                                        <Button variant="primary" as={Link} to={`/products/${product.id}`}>View Product</Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Categories;
