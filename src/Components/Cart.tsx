import { useState, useEffect } from 'react';
import { json } from 'react-router-dom';

type ProductsCart = {
    product: {
        product_id: string,
        price: number,
        title: string
    },
    quantity: number
}

function ShoppingCart() {
    const [cartData, setCartData] = useState<ProductsCart[]>([]);
    let arrOfProducts: any[]
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            let userID
            if (localStorage.getItem('token')) {
                userID = JSON.parse(localStorage.getItem('user_id'));
                const arrOfProductsId = await getFromUserInDB(userID!);
                arrOfProducts = await fromProductIDToListOfProducts(arrOfProductsId);
            } else {
                const arrOfProductsId = JSON.parse(localStorage.getItem('cart')!);
                arrOfProducts = await fromProductIDToListOfProducts(arrOfProductsId);
            }

            setCartData(arrOfProducts);
        };

        fetchData();
    }, []);

    async function getFromUserInDB(userID: string) {

        const requsetOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        }
        const jsonData = await fetch(`http://localhost:3000/cart/${userID}`, requsetOptions)
        const data = await jsonData.json()
        return data
    }

    const addOne = async (productID: string, quantity: number) => {
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

    const reduceOne = async (productID: string, quantity: number) => {
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
                const response = await fetch('http://localhost:3000/cart/dec', requestOptions);
                console.log(response);

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
                    return { ...item, quantity: quantity - 1 };
                }
                return item;
            }).filter((item) => item.quantity > 0); // Remove items with quantity zero.
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCartData(JSON.parse(localStorage.getItem('cart')!));
        }
    };

    const removeItem = async (productId: string) => {
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
                    product_id: productId
                })
            };
            try {
                const response = await fetch('http://localhost:3000/cart/remove', requestOptions);
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
            const updatedCart = cartData.filter((item) =>
                item.product.product_id !== productId
            )
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            setCartData(JSON.parse(localStorage.getItem('cart')!));
        }
    };

    const clearCart = async () => {
        if (localStorage.getItem('token')) {
            const userID = JSON.parse(localStorage.getItem('user_id')!);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userID })
            };
            try {
                const response = await fetch('http://localhost:3000/cart/clear', requestOptions);
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
            const emptyCart = [{
                product: {
                    product_id: 'no id',
                    title: 'the cart is empty',
                    price: 0
                },
                quantity: 0
            }]
            setCartData(emptyCart);
            localStorage.setItem('cart', JSON.stringify(emptyCart));
        }
    };

    const buy = () => {
        //לשנות בתוך הדאטה בייס
        console.log('mean time dont work, delete the cart in the local storge');
        clearCart()
        alert('payment sucssid! goodbye')
    };

    const calculateTotal = () => {
        return cartData.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    async function fromProductIDToListOfProducts(arr: { product_id: string, quantity: number }[]) {
        const list = []
        for (let i = 0; i < arr.length; i++) {
            const quantity = arr[i].quantity
            const element = arr[i].product_id;
            const jsonItem = await fetch(`http://localhost:3000/shop/${element}`);
            const listItem = await jsonItem.json();

            list.push(
                {
                    product: listItem.products[0],
                    quantity: quantity
                }
            );
        }
        return list
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    }, [cartData]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartData.map((item, index) => (
                        <tr key={index}>
                            <td><a href={`/product/${item.product.product_id}`}>{item.product.title}</a></td>
                            <td>${item.product.price.toFixed(2)}</td>
                            <td>
                                <button onClick={() => reduceOne(item.product.product_id, item.quantity)}>-</button>
                                {item.quantity}
                                <button onClick={() => addOne(item.product.product_id, item.quantity)}>+</button>
                            </td>
                            <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button onClick={() => removeItem(item.product.product_id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Total: ${calculateTotal().toFixed(2)}</h2>
                <button onClick={clearCart}>Empty Cart</button>




                <button onClick={buy}>payment</button>
            </div>
        </div>
    );
}

export default ShoppingCart;