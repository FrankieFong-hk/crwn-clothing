import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
    // const { cartItems, cartTotal } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='headler-block'>
                     <span>Product</span>
                </div>
                <div className='headler-block'>
                     <span>Description</span>
                </div>
                <div className='headler-block'>
                     <span>Quantity</span>
                </div>
                <div className='headler-block'>
                     <span>Price</span>
                </div>
                <div className='headler-block'>
                     <span>Remove</span>
                </div>
            </div>
                {
                    cartItems.map((cartItem) => {
                        const {id, name, quantity} = cartItem;
                        return (
                           <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                        )
                    })
                }
                <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}

export default Checkout;