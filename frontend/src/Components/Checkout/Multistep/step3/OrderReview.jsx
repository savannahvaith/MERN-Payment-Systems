import { useContext } from 'react';
import { CartContext } from '../../../../Context/CartContext';
import {Button} from 'reactstrap';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { BACKEND_URL } from '../../../../CONSTS.json';

const OrderReview = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const { total, cartItems, itemCount } = useContext(CartContext);

    const validateCard = () => {
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            billing_details: "",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            // console.log("Stripe 23 | token generated!", paymentMethod);
            try {
                const { id } = paymentMethod;
                const response = await axios.post(
                    `${BACKEND_URL}/check/stripe/charge`,
                    {
                        amount: 999,
                        id: id,
                    }
                );

                // console.log("Stripe 35 | data", response.data);
                if (response.data.success) {
                    console.log("CheckoutForm.js 25 | payment successful!");
                }
            } catch (error) {
                console.log("CheckoutForm.js 28 | ", error);
            }
        } else {
            console.log(error.message);
        }
    };


    // break down of total price
    // shipping and billing information 
    // Place order.. 

    return(
        <>
            <h2>Please Review</h2>
            <p>Totle : £{total}</p>
            <p>Products: {itemCount}</p>
            {cartItems.map((item) => (
                <p>{item.title}</p>
            ))}
            <Button onClick={props.prevStep}>Back</Button>
        </>
    )



}
export default OrderReview; 