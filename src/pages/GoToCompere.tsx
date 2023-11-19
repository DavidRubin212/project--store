import { useParams, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import capitalizeFirstLetter from "../function/capitalizeFirstLetter";

interface CategoryProps {
    category_id: string;
  }
  interface Product {
    product_id: string;
    title: string;
    description: string;
    quantity: number;
    image: string;
    available_in: {
        height: number;
        width: number;
    }[];
    price: number;
    clicks: number;
    liters?: number;
    brand?: string;
    watts?: number;
    screen_size?: number;
    size?: string;
    doors?: number;
  }

function GoToCompere() {
    const { product_id, category_id} = useParams()
    const [category, setCategory] = useState<any | null>(null);
    let [products, setProducts] = useState<any[] | Product[] | null>(null);
    const navigate = useNavigate()

    const categoryName = capitalizeFirstLetter(category_id)

    useEffect(() => {
        const getCategoryData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/shop/category/${categoryName}`);
            if (response.ok) {
              const result = await response.json();
              setCategory(result);
              setProducts(result.products);
            }
          } catch (error) {
            console.error(error.message);
          }
        };
    
        getCategoryData();
      }, []); 

  return (
    <>
        <div>{product_id}</div>
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
            <button onClick={()=> navigate(`/compere/${product_id}/${product.product_id}`)}>go to compere</button>
          </div>
        ))}
    </>
    
  )
}

export default GoToCompere