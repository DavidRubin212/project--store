import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

interface ProductProps {
    product_id: string;
  }

function ProductDetails () {
    const { product_id } = useParams<{ product_id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    useEffect(() => {
        // Fetch product details based on the product_id parameter
        fetch(`http://localhost:3000/shop/${product_id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched product data:", data);
                // Set the first product in the array as the product
                setProduct(data.products[0]);
            })
            .catch((error) =>
                console.error("Error fetching product details:", error)
            );
    }, [product_id]);
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the quantity when the user changes the input value
        setQuantity(parseInt(event.target.value, 10));
    };
    const handleAddToCart = () => {
        // Add the product to the user's cart by updating the cart in the database
        fetch("http://localhost:3000/cart/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_id,
                quantity,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Product added to cart:", data);
                // You can redirect to the cart page or show a success message here
            })
            .catch((error) => console.error("Error updating cart:", error));
    };
    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{display:"grid" ,border: '1px solid #ccc', padding: '10px', margin: '10px', width: '100%', maxWidth: '400px' }}>
          <h2>Product info:</h2>
          <h4>{product.title}</h4>
          <p>{product.description && `Description: ${product.description}`}</p>
          <p>{`Quantity: ${product.quantity}`}</p>
          <p>{`Clicks: ${product.clicks}`}</p>
          <p>{`Price: $${product.price}`}</p>
          {product.liters && <p>{`Liters: ${product.liters}`}</p>}
          {product.brand && <p>{`Brand: ${product.brand}`}</p>}
          {product.watts && <p>{`Watts: ${product.watts}`}</p>}
          {product.screen_size && <p>{`Screen Size: ${product.screen_size}"`}</p>}
          {product.size && <p>{`Size: ${product.size}`}</p>}
          {product.doors && <p>{`Doors: ${product.doors}`}</p>}
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: '100%', maxHeight: '120px', marginTop: '10px' }}
          />
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="0"
              style={{ marginTop: '10px' }}
            />
          </label>
          <button style={{ marginTop: '10px' }} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      );
    };
export default ProductDetails;
// const addOne = async (productID:string, newQuantity:number) => {
//     cartData = JSON.parse(localStorage.getItem('cart'))
//     const updatedCart = cartData.map((item) => {
//       if (item.id === productID) {
//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });
//     localStorage.setItem('cart', JSON.stringify(updatedCart))
//   };