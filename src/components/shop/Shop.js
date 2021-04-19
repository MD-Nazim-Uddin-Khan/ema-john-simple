import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCard] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey];
            return product;
        })
        // console.log(previousCart);
        setCard(previousCart);

    }, [])

    const handleAddProduct = (product) => {
        // console.log('Product added', product)
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey); //
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCard(newCart); //        
        addToDatabaseCart(product.key, count)




        // const newCard = [...cart, product];
        // setCard(newCard);
        // const sameProduct = newCard.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        // addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        handleAddProduct={handleAddProduct}
                        showAddToCart={true}
                        product={pd}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                {/* <h3>This is Cart</h3>
                <h5>Order Summary : {cart.length}</h5> */}
                <Cart cart1={cart}>
                    <Link to="/review">
                        <button className="main-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>


    );
};

export default Shop;