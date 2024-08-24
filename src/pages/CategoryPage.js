// src/pages/CategoryPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const categories = [
  { id: '1', name: 'Category 1', description: 'Description for Category 1', subcategories: ['Sub1', 'Sub2', 'Sub3', 'Sub4'] },
  { id: '2', name: 'Category 2', description: 'Description for Category 2', subcategories: ['Sub5', 'Sub6', 'Sub7', 'Sub8'] },
  { id: '3', name: 'Category 3', description: 'Description for Category 3', subcategories: ['Sub9', 'Sub10', 'Sub11', 'Sub12'] },
  { id: '4', name: 'Category 4', description: 'Description for Category 4', subcategories: ['Sub13', 'Sub14', 'Sub15', 'Sub16'] }
];

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  
  const category = categories.find(cat => cat.id === categoryId);
  const subcategory = subcategoryId ? category?.subcategories.find(sub => sub === subcategoryId) : null;

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      {subcategory ? (
        <div>
          <h2>Subcategory: {subcategory}</h2>
          {/* Render additional details for the subcategory */}
        </div>
      ) : (
        <div>
          <h2>Subcategories:</h2>
          <ul>
            {category.subcategories.map(sub => (
              <li key={sub}>
                <a href={`/category/${category.id}/${sub}`}>{sub}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
