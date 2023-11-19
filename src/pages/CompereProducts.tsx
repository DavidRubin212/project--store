import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import capitalizeFirstLetter from "../function/capitalizeFirstLetter";
import InStock from "../Components/InStock";
import { Box, Button, Rating } from "@mui/material";
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

function CompereProducts() {
    const {product_id_1, product_id_2} = useParams()
    const [product_1, setProduct_1] = useState<Product | null>(null);
    const [product_2, setProduct_2] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);



    useEffect(() => {
        // Fetch product details based on the product_id parameter
        fetch(`http://localhost:3000/shop/${product_id_1}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched product data:", data);
                // Set the first product in the array as the product
                setProduct_1(data.products[0]);
            })
            .catch((error) =>
                console.error("Error fetching product details:", error)
            );
    }, []);

    useEffect(() => {
        // Fetch product details based on the product_id parameter
        fetch(`http://localhost:3000/shop/${product_id_2}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched product data:", data);
                // Set the first product in the array as the product
                setProduct_2(data.products[0]);
            })
            .catch((error) =>
                console.error("Error fetching product details:", error)
            );
    }, []);

    const handleAddToCart = (product_id) => {
        // Add the product to the user's cart by updating the cart in the database
        fetch("http://localhost:3000/cart/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${authToken}`
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
    
  return (
    <>
    <h2>compere producs</h2>
    <div style={{ display: "grid", border: '1px solid #ccc', padding: '10px', margin: '10px', width: '100%' }}>
                <h2>{product_1?.title}</h2>
                <img
                    src={product_1?.image}
                    alt={product_1?.title}
                    style={{
                        Width: '100%', Height: 'auto', display: 'block', marginTop: '10px', maxWidth: '100%',
                        maxheight: '100%'
                    }}
                />
                <h4></h4>
                <h3>{product_1?.description && `Description: ${product_1?.description}`}</h3>
                <InStock quantity={product_1?.quantity && product_1?.quantity} />
                <p>{`Rating: ${product_1?.clicks}`}</p>
                <Box >
                    <Rating
                        name="simple-controlled"
                        defaultValue={ratingFunc(product_1?.clicks)} precision={0.2} readOnly
                    /></Box>
                <h2>{`Price: $${product_1?.price}`}</h2>
                <h4>More details :</h4>
                {product_1?.liters && <p>{`Liters: ${product_1?.liters}`}</p>}
                {product_1?.brand && <p>{`Brand: ${product_1?.brand}`}</p>}
                {product_1?.watts && <p>{`Watts: ${product_1?.watts}`}</p>}
                {product_1?.screen_size && <p>{`Screen Size: ${product_1?.screen_size}`}</p>}
                {product_1?.size && <p>{`Size: ${product_1?.size}`}</p>}
                {product_1?.doors && <p>{`Doors: ${product_1?.doors}`}</p>}


                <Button variant="contained" onClick={handleAddToCart}>
                    {'Add to Cart'}
                </Button>

            </div>




            <div style={{ display: "grid", border: '1px solid #ccc', padding: '10px', margin: '10px', width: '100%' }}>
                <h2>{product_2?.title}</h2>
                <img
                    src={product_2?.image}
                    alt={product_2?.title}
                    style={{
                        Width: '100%', Height: 'auto', display: 'block', marginTop: '10px', maxWidth: '100%',
                        maxheight: '100%'
                    }}
                />
                <h4></h4>
                <h3>{product_2?.description && `Description: ${product_2?.description}`}</h3>
                <InStock quantity={product_2?.quantity} />
                <p>{`Rating: ${product_2?.clicks}`}</p>
                <Box >
                    <Rating
                        name="simple-controlled"
                        defaultValue={ratingFunc(product_2?.clicks)} precision={0.2} readOnly
                    /></Box>
                <h2>{`Price: $${product_2?.price}`}</h2>
                <h4>More details :</h4>
                {product_2?.liters && <p>{`Liters: ${product_2?.liters}`}</p>}
                {product_2?.brand && <p>{`Brand: ${product_2?.brand}`}</p>}
                {product_2?.watts && <p>{`Watts: ${product_2?.watts}`}</p>}
                {product_2?.screen_size && <p>{`Screen Size: ${product_2?.screen_size}`}</p>}
                {product_2?.size && <p>{`Size: ${product_2?.size}`}</p>}
                {product_2?.doors && <p>{`Doors: ${product_2?.doors}`}</p>}


                <Button variant="contained" onClick={handleAddToCart}>
                    {'Add to Cart'}
                </Button>

            </div>

        </>
  )
}

export default CompereProducts