import { useContext } from 'react';
import {CartContext} from '../../Context/CartContext';
import IndividualItems from './IndividualItems';

const CartProducts = () => {
    const {cartItems} = useContext(CartContext);

    return(
        <div className="container">
            {cartItems.map(product => <IndividualItems key={product.id} product={product}/>)}
        </div>
        
    )
}

export default CartProducts; 