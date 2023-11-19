import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Slider from '@mui/material/Slider';
import { Box, Paper, Typography, Drawer } from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import capitalizeFirstLetter from '../function/capitalizeFirstLetter';

interface CategoryProps {
    name: string;
}

interface Product {
    product_id: string;
    title: string;
    description: string;
    quantity: number;
    image: string;
    price: number;
    clicks: number;
}

interface Category {
    name: string;
    products: Product[];
    fiter: string;
}

interface CategoryFilterProps {
    category: Category;
}


function Category({ name }: CategoryProps) {

    const navigate = useNavigate()

    const [category, setCategory] = useState<any | null>(null);
    const [products, setProducts] = useState<any[] | null>(null);

    const [priceRange, setPriceRange] = useState<number[]>([0, getPriceMaxValue()]);
    const [categoryRange, setCategoryRange] = useState<number[] | string[]>([0, getMaxValue()]);

    const [isSliderOpen, setIsSliderOpen] = useState(false);

    function getPriceMaxValue(): number {
        return (category && Math.max(...category.products.map((product: { [x: string]: any; }) => +(product.price))))
    }

    function getMaxValue(): number {
        if (category) {
            if (typeof category.products[0][category.fiter] === 'string') {
                return '';
            }
        }
        return (category && Math.max(...category.products.map((product: { [x: string]: any; }) => +(product[category.fiter]))))
    }

    const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    const handleCategoryRangeChange = (event: Event, newValue: number | number[] | string | string[]) => {
        setCategoryRange(newValue as number[] | string[]);
    };


    const filteredProducts = products && products.filter(
        (product) =>
            product.price >= priceRange[0] &&
            product.price <= priceRange[1] &&
            (typeof categoryRange[0] === 'number' ?
                product[category.fiter] >= categoryRange[0] &&
                product[category.fiter] <= categoryRange[1]
                : true)


    );

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const screenWidth = window.innerWidth;
        const mouseX = event.clientX;

        setIsSliderOpen(mouseX > (3 * screenWidth) / 4);
    };

    const handleSliderClose = () => {
        setIsSliderOpen(false);
    };
    
    const categoryName = capitalizeFirstLetter(name)
    
    useEffect(() => {
        const getCategoryData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/shop/category/${categoryName}`);
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
        setCategoryRange([0, getMaxValue()]);
        setPriceRange([0, getPriceMaxValue()]);

    }, []);

    return (
        <>
            <Box display="flex">
                <div style={{ height: '100vh', display: 'flex' }} onMouseMove={handleMouseMove}>
                    <Drawer
                        anchor="right"
                        open={isSliderOpen}
                        onClose={handleSliderClose}
                        style={{
                            width: isSliderOpen ? '25%' : '0',
                            transition: 'width 0.3s ease',
                            marginTop: '1000px'
                        }}
                    >
                        <Box style={{ padding: '20px', width: 240 }}>
                            <Typography variant="h4">
                                Filter by:
                            </Typography>
                            <Typography variant="h5">
                                Price Range
                            </Typography>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceRangeChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="price-range-slider"
                                min={0}
                                max={getPriceMaxValue()}
                            />
                            <Typography variant="h6"
                                id="category-range-slider"
                                gutterBottom>
                                Selected Price Range: ${priceRange[0]} - ${priceRange[1]}
                            </Typography>
                            {typeof categoryRange[0] === 'number' && (
                                <>
                                    <Typography variant="h5" gutterBottom>
                                        {category && category.fiter_title}
                                    </Typography>
                                    <Slider
                                        value={categoryRange}
                                        onChange={handleCategoryRangeChange}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="category-range-slider"
                                        min={0}
                                        max={getMaxValue()}
                                    />
                                </>
                            )}
                        </Box >
                    </Drawer >
                </div>

                <Paper
                    onMouseMove={handleMouseMove}
                    style={{
                        width: isSliderOpen ? '75%' : '100%',
                        transition: 'width 0.3s ease',
                    }}
                >
                    {category && <h2>{category.name}</h2>}
                    {
                        filteredProducts &&
                        filteredProducts.map((product, index) => (
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
                                <p>Clicks: {product.clicks}</p>
                                <p>{category.fiter}: {product[category.fiter]}</p>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{ maxWidth: "100%", maxHeight: "120px" }} // Adjust image height
                                />
                                <button onClick={() => {
                                    const product_id: string = product.product_id
                                    navigate(`/product/${product_id}/${name}`)
                                }}>go to product</button>
                            </div>
                        ))
                    }
                </Paper>
            </Box >
        </>
    );
}

export default Category;
