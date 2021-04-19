import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            // const product = fakeData.find(pd => pd.key);
            product.quantity = savedCart[key]
            return product;
        });
        
        // const counts = productKeys.map(key => savedCart[key]);
        // console.log(cartProducts);
        setCart(cartProducts);
    }, [])

    const removeProduct = (productKey) => {
        // console.log('remove clicked', productKey)
        const newCard = cart.filter(pd => pd.key !== productKey)
        setCart(newCard);
        removeFromDatabaseCart(productKey);
    }

    const [orderPlaced, setOrderPlace] = useState(false);

    const handlePlaceOrder = () => {
        // console.log('Place Order');
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => 
                <ReviewItem 
                    key={pd.key} 
                    product={pd}
                    removeProduct={removeProduct}
                    >
                </ReviewItem>)
            }

            {thankyou}
            
            </div>
            <div className="cart-container">
                <Cart cart1={cart}>
                    <button onClick={handlePlaceOrder} className="main-btn">Place Order</button>
                </Cart>
            </div>
        </div>



















        // <div>
        //     {/* <h1>This is Review</h1> */}
        //     <h1 style={{textAlign:'center'}}>Cart Items:{cart.length}</h1>
        //     {
        //         cart.map(pd => 
        //         <ReviewItem 
        //             key={pd.key} 
        //             product={pd}
        //             removeProduct={removeProduct}
        //             >
        //         </ReviewItem>)
        //     }
        // </div>
    );
};

export default Review;