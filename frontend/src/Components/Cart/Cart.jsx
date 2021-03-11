import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import CartProducts from "./CartProducts"
import { useHistory } from 'react-router-dom';

const Cart = () => {
    const history = useHistory();
    const { total, cartItems, itemCount, clearCart } = useContext(CartContext);

    const handleCheckout = () => {
        history.push(`/Checkout`);
    }

    return (
        <div className="container">
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            cartItems.length > 0 ?
                                <CartProducts /> :
                                <div className="p-3 text-center text-muted">
                                    Your cart is empty
                            </div>
                        }
                    </div>
                    {
                        cartItems.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className="text-center">{itemCount}</h4>
                                <p className="mb-1">Total Payment</p>
                                <h3 className="text-center">{total}</h3>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>CHECKOUT</button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                </div>

                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )

}

export default Cart; 