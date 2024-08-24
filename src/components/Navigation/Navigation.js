// src/components/Navigation/Navigation.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css'; // Make sure to include your styles

const categories = [
    {
        id: '1', name: 'Category 1', subcategories: [
            { name: 'Sub1', furtherCategories: ['Sub1.1', 'Sub1.2'] },
            { name: 'Sub2', furtherCategories: ['Sub2.1', 'Sub2.2'] },
            { name: 'Sub3', furtherCategories: ['Sub3.1', 'Sub3.2'] },
            { name: 'Sub4', furtherCategories: ['Sub4.1', 'Sub4.2'] }
        ]
    },
    {
        id: '2', name: 'Category 2', subcategories: [
            { name: 'Sub5', furtherCategories: ['Sub5.1', 'Sub5.2'] },
            { name: 'Sub6', furtherCategories: ['Sub6.1', 'Sub6.2'] },
            { name: 'Sub7', furtherCategories: ['Sub7.1', 'Sub7.2'] },
            { name: 'Sub8', furtherCategories: ['Sub8.1', 'Sub8.2'] }
        ]
    },
    // Add more categories here...
];

const Navigation = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubcategory, setActiveSubcategory] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
        setActiveCategory(categoryId);
        setActiveSubcategory(null); // Reset active subcategory when changing category
    };

    const handleSubcategoryMouseEnter = (event, subcategoryName) => {
        setActiveSubcategory(subcategoryName);
        const rect = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: rect.right + window.scrollX
        });
    };

    const handleSubcategoryMouseLeave = () => {
        setActiveSubcategory(null);
    };

    const activeCategoryObj = categories.find(cat => cat.id === activeCategory);

    return (
        <nav>
            <ul className="categories-panel">
                {categories.map(category => (
                    <li key={category.id}>
                        <button
                            className={activeCategory === category.id ? 'active' : ''}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
            {activeCategoryObj && (
                <ul className="subcategories">
                    {activeCategoryObj.subcategories.map(subcategory => (
                        <li
                            key={subcategory.name}
                            onMouseEnter={(e) => handleSubcategoryMouseEnter(e, subcategory.name)}
                            onMouseLeave={handleSubcategoryMouseLeave}
                        >
                            <Link to={`/category/${activeCategoryObj.id}/${subcategory.name}`}>
                                {subcategory.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {activeCategoryObj && activeSubcategory && (
                <ul className="further-categories" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                    {activeCategoryObj.subcategories.find(sub => sub.name === activeSubcategory).furtherCategories.map(furtherCategory => (
                        <li key={furtherCategory}>
                            <Link to={`/category/${activeCategoryObj.id}/${activeSubcategory}/${furtherCategory}`}>
                                {furtherCategory}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navigation;
