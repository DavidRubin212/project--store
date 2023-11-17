import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../Components/Map";
import { Box, Button, Rating } from "@mui/material";

import InStock from "../Components/InStock";
import ratingFunc from "../function/ratingFunc";
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

function ProductDetails() {
    const { product_id } = useParams<{ product_idParams: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [rating, setRating] = useState<number>(1);
    const [quantityState, setQuantityState] = useState<number>(1);
    useEffect(() => {
        // Fetch product details based on the product_id parameter
        fetch(`http://localhost:3000/shop/${product_id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched product data:", data);
                // Set the first product in the array as the product
                setProduct(data.products[0]);

                setRating(data.clicks)
                setQuantityState(data.quantity)
            })
            .catch((error) =>
                console.error("Error fetching product details:", error)
            );
    }, []);

    const handleAddToCart = () => {
        if (localStorage.getItem("token")) {
            const user_id1 = JSON.parse(localStorage.getItem("user_id"!)!)
            const authToken = localStorage.getItem("token")
            // Add the product to the user's cart by updating the cart in the database
            fetch("http://localhost:3000/cart/inc", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({

                    product_id: product_id,
                    user_id: user_id1
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Product added to cart:", data);
                    // You can redirect to the cart page or show a success message here
                })
                .catch((error) => console.error("Error updating cart:", error));
        } else {
            const list = JSON.parse(localStorage.getItem('cart')!)
            list.push({ product_id: product_id, quantity: quantity })
            localStorage.setItem('cart', JSON.stringify(list))
        }
    };

if (!product) {
    return <div> Loading...</div>;
}
return (
    <>
        <div style={{ display: "grid", border: '1px solid #ccc', padding: '10px', margin: '10px', width: '100%' }}>
            <h2>{product.title}</h2>
            <img
                src={product.image}
                alt={product.title}
                style={{
                    Width: '100%', Height: 'auto', display: 'block', marginTop: '10px', maxWidth: '100%',
                    maxheight: '100%'
                }}
            />
            <h4></h4>
            <h3>{product.description && `Description: ${product.description}`}</h3>
            <InStock quantity={product.quantity} />
            <p>{`Rating: ${product.clicks}`}</p>
            <Box >
                <Rating
                    name="simple-controlled"
                    defaultValue={ratingFunc(product.clicks)} precision={0.2} readOnly
                /></Box>
            <h2>{`Price: $${product.price}`}</h2>
            <h4>More details :</h4>
            {product.liters && <p>{`Liters: ${product.liters}`}</p>}
            {product.brand && <p>{`Brand: ${product.brand}`}</p>}
            {product.watts && <p>{`Watts: ${product.watts}`}</p>}
            {product.screen_size && <p>{`Screen Size: ${product.screen_size}`}</p>}
            {product.size && <p>{`Size: ${product.size}`}</p>}
            {product.doors && <p>{`Doors: ${product.doors}`}</p>}


            <Button variant="contained" onClick={handleAddToCart}>
                {'Add to Cart'}
            </Button>
            <h2>You can also find the product in the following stores :</h2>
            <MapComponent points={product.available_in} />
        </div>

    </>
);
};
export default ProductDetails;
