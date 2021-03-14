import { useContext } from 'react';
import { CartContext } from '../../../../Context/CartContext';
import { Button, Icon, Item } from 'semantic-ui-react'
import { useStripe, useElements } from "@stripe/react-stripe-js";
import CForm from '../step2/Form';
import axios from 'axios';
import { BACKEND_URL } from '../../../../CONSTS.json';
import { useHistory } from 'react-router-dom';

const OrderReview = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const { userDetails } = props.values;
    const fullName = userDetails.firstName + " " + userDetails.secondName;

    const cardNumber = props.cardState.cardNumber;
    const last4Digs = cardNumber.substring(cardNumber.length, cardNumber.length - 4);

    const value = `${props.cardState.cardMonth}/${props.cardState.cardYear.toString().substr(-2)};`

    const { total, cartItems, itemCount, clearCart } = useContext(CartContext);

    const cancelOrder = () => {
        clearCart();
        history.push("/Basket");
    }

    const titleCase = (str)=> {
         str = str.toLowerCase().split(' '); 
        for  (let i = 0; i < str.length; i++) 
        { str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); } 
        return str.join(' '); 
    } 


    const SubmitOrder = async (event) => {
        event.preventDefault();

        const cardElement = elements.getElement(CForm);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            billing_details: {
                address: userDetails.billingAddress,
                email: userDetails.email,
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
                        <Item.Description>{userDetails.email}</Item.Description>
                        <br />
                        <Item.Meta>Shipping Information:</Item.Meta>
                        <Item.Meta>{userDetails.firstName} {userDetails.secondName}</Item.Meta>
                        <Item.Meta>{userDetails.shipping_address.street}</Item.Meta>
                        <Item.Meta>{userDetails.shipping_address.city}, {userDetails.shipping_address.postCode}</Item.Meta>
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
                        <Item.Meta>{titleCase(props.cardState.cardHolder)}</Item.Meta>
                        <Item.Meta>{userDetails.billing_address.street}</Item.Meta>
                        <Item.Meta>{userDetails.billing_address.city}, {userDetails.billing_address.postCode}</Item.Meta>
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
                                <Item.Meta key={item._id}>{item.title}: {item.quantity} x {item.price}</Item.Meta>
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