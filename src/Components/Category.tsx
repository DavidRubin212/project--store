import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  category_id: string;
}

function Category({ category_id }: CategoryProps) {
  const [category, setCategory] = useState<any | null>(null);
  const [products, setProducts] = useState<any[] | null>(null);
  const navigate = useNavigate()


  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/shop/category/${category_id}`);
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setCategory(result);
          setProducts(result.products);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getCategoryData();
  }, [category_id]); 

  return (
    <>
      {category && <p>{category.fiter}</p>}
      {category && <h2>{category.name}</h2>}
      {products &&
        products.map((product) => (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              width: "100%",
            }}
          >
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {product.doors && <p>Doors: {product.doors}</p>}
            <p>Clicks: {product.clicks}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "100%", maxHeight: "120px" }} // Adjust image height
            />
            <button onClick={()=> navigate(`/product/${product.product_id}`)}>go to product</button>
          </div>
        ))}
    </>
  );
}

export default Category;
