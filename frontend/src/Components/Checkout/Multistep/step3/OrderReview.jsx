import { useContext } from 'react';
import { CartContext } from '../../../../Context/CartContext';
import { Button, Icon,  Item } from 'semantic-ui-react'
import { useStripe, useElements } from "@stripe/react-stripe-js";
import CForm from '../step2/Form';
import axios from 'axios';
import { BACKEND_URL } from '../../../../CONSTS.json';
import { useHistory } from 'react-router-dom';

const OrderReview = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const { firstName, secondName, email, address, city, postCode } = props.values;
    const fullName = firstName + " " + secondName;

    const cardNumber = props.cardState.cardNumber;
    const last4Digs = cardNumber.substring(cardNumber.length, cardNumber.length - 4);

    const { total, cartItems, itemCount, clearCart } = useContext(CartContext);

    const cancelOrder = () => {
        clearCart();
        history.push("/Basket");
    }

    const validateCard = () => {
    }


    const SubmitOrder = async (event) => {
        event.preventDefault();
        const cardElement = elements.getElement(CForm);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            billing_details: {
                address: {
                    city: city,
                    postal_code: postCode
                },
                email: email,
                name: fullName
            },
            card: cardElement
        });

        if (!error) {
            console.log("Stripe 23 | token generated!", paymentMethod);
            try {
                const { id } = paymentMethod;
                const response = await axios.post(
                    `${BACKEND_URL}/check/stripe/charge`,
                    {
                        amount: 999,
                        id: id,
                    }
                );

                console.log("Stripe 35 | data", response.data);
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

    return (
        <>
            <Item.Group relaxed divided>
                <Item>
                    <Icon size='large' name='user outline' color="teal" as="i" circular />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header> User Information</Item.Header>
                        <br />
                        <Item.Description>{email}</Item.Description>
                        <br />
                        <Item.Meta>Shipping Information:</Item.Meta>
                        <Item.Meta>{firstName} {secondName}</Item.Meta>
                        <Item.Meta>{address}</Item.Meta>
                        <Item.Meta>{city}, {postCode}</Item.Meta>
                        <Item.Extra>
                            <Button color="teal" floated='right' onClick={() => props.changeStep(2)}>Change</Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>

                <Item>
                    <Icon size='large' name='payment' color="teal" as="i" circular />

                    <Item.Content verticalAlign='middle'>
                        <Item.Header> Payment</Item.Header>
                        <Item.Description>Card:  **** **** **** {last4Digs} </Item.Description>
                        <br />
                        <Item.Meta>Billing Information:</Item.Meta>
                        <Item.Meta>{firstName} {secondName}</Item.Meta>
                        <Item.Meta>{address}</Item.Meta>
                        <Item.Meta>{city}, {postCode}</Item.Meta>
                        <Item.Extra verticalAlign="right">
                            <Button color="teal" floated='right' onClick={() => props.changeStep(1)}>Change</Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>

                <Item>
                    <Icon size='large' name='send' color="teal" as="i" circular />

                    <Item.Content verticalAlign='middle'>
                        <Item.Header>Confirm Order</Item.Header>
                        <br />
                        <br />
                        <Item.Meta>Items: {itemCount}</Item.Meta>
                        {cartItems.map((item) => (
                            <>
                                <Item.Meta>{item.title}: {item.quantity} x {item.price}</Item.Meta>
                            </>
                        ))}
                        <Item.Description><b>Total:</b> £{total}</Item.Description>
                        <Item.Extra>
                            <form onSubmit={SubmitOrder}>
                                <Button color="teal" floated='right' onClick={SubmitOrder}>Place Order</Button>
                                <Button color="red" floated="right" onClick={cancelOrder}>Cancel</Button>
                            </form>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>
        </>
    )



}
export default OrderReview;