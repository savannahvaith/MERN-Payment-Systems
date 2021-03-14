import { useContext } from 'react';
import { CartContext } from '../../../../Context/CartContext';
import { Button, Icon, Item } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';

const OrderReview = (props) => {
    const history = useHistory();

    const { userDetails } = props.values;
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

        console.log("cool.. form submitted!");
    };

    return (
        <>
            <Item.Group relaxed divided>
                <Item>
                    <Icon size='large' name='user outline' color="teal" as="i" circular />
                    <Item.Content verticalalign='middle'>
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

                    <Item.Content verticalalign='middle'>
                        <Item.Header> Payment</Item.Header>
                        <Item.Description>Card:  **** **** **** 1234 </Item.Description>
                        <br />
                        <Item.Meta>Billing Information:</Item.Meta>
                        <Item.Meta>{titleCase("S Vaithilingam")}</Item.Meta>
                        <Item.Meta>{userDetails.billing_address.street}</Item.Meta>
                        <Item.Meta>{userDetails.billing_address.city}, {userDetails.billing_address.postCode}</Item.Meta>
                        <Item.Extra verticalalign="right">
                            <Button color="teal" floated='right' onClick={() => props.changeStep(1)}>Change</Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>

                <Item>
                    <Icon size='large' name='send' color="teal" as="i" circular />

                    <Item.Content verticalalign='middle'>
                        <Item.Header>Confirm Order</Item.Header>
                        <br />
                        <br />
                        <Item.Meta>Items: {itemCount}</Item.Meta>
                        {cartItems.map((item,i) => (
                            <>
                                <Item.Meta key={i}>{item.title}: {item.quantity} x {item.price}</Item.Meta>
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