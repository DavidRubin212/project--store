import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import MapComponent from "../Components/Map";
import { Box, Button, Rating } from "@mui/material";

import InStock from "../Components/InStock";
import ratingFunc from "../function/ratingFunc";
import { ProductsCart } from "./ShoppingCart";
export interface Product {
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

function ProductDetails( ) {
    const { product_id, category_id } = useParams<{ product_id: string, category_id: string }>();
    const [rating, setRating] = useState<number>(1);
    const [cartData, setCartData] = useState<ProductsCart[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantityState, setQuantityState] = useState<number>(1);
    const [quantity, setQuantity] = useState<number>(1);
    

    const navigate = useNavigate()
    const authToken = localStorage.getItem('token');

    function CompereProduct () {
        navigate(`/go to compere/${product_id}/${category_id}`)
    }

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

    const handleAddToCart = async (productID: string) => {
        if (localStorage.getItem('token')) {
            const userID = JSON.parse(localStorage.getItem('user_id')!);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userID,
                    product_id: productID
                })
            };
            try {
                const response = await fetch('http://localhost:3000/cart/inc', requestOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCartData(data);
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }

        } else {
            const updatedCart = cartData.map((item) => {
                if (item.product.product_id === productID) {
                    return { ...item, quantity: quantity + 1 };
                }
                return item;
            });

            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCartData(JSON.parse(localStorage.getItem('cart')!));
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


                <Button variant="contained" onClick={() => handleAddToCart(product!.product_id)}>
                    {'Add to Cart'}
                </Button>
                <Button style={{ marginTop: '10px' }} onClick={CompereProduct}>
                    compere with other product
                </Button>
                <h2>You can also find the product in the following stores :</h2>
                <MapComponent points={product.available_in} />
            </div>

        </>
    );
};
export default ProductDetails;
