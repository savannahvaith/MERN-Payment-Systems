import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Icon, Step, Grid, Segment, Item } from 'semantic-ui-react'
import { useState } from 'react';
import MultiStepForm from "./Multistep/MultiStepForm";

export const CheckoutForm = () => {

    const { total, cartItems } = useContext(CartContext);
    const [step, setStep] = useState(1);

    return (
        <div className="container">
            <div className="row">
                <br />
                <Step.Group>
                    {step === 1 &&
                        <>
                            <Step completed>
                                <Icon name='cart' />
                                <Step.Content>
                                    <Step.Title>Cart</Step.Title>
                                    <Step.Description>Review your cart</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step active >
                                <Icon name='truck' />
                                <Step.Content>
                                    <Step.Title>Shipping</Step.Title>
                                    <Step.Description>Choose your shipping options</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step  >
                                <Icon name='payment' />
                                <Step.Content>
                                    <Step.Title>Billing</Step.Title>
                                    <Step.Description>Enter billing information</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step >
                                <Icon name='info' />
                                <Step.Content>
                                    <Step.Title>Confirm Order</Step.Title>
                                </Step.Content>
                            </Step>
                        </>
                    }


                    {
                        step === 2 &&
                        <>
                            <Step completed>
                                <Icon name='cart' />
                                <Step.Content>
                                    <Step.Title>Cart</Step.Title>
                                    <Step.Description>Review your cart</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed>
                                <Icon name='truck' />
                                <Step.Content>
                                    <Step.Title>Shipping</Step.Title>
                                    <Step.Description>Choose your shipping options</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step active>
                                <Icon name='payment' />
                                <Step.Content>
                                    <Step.Title>Billing</Step.Title>
                                    <Step.Description>Enter billing information</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step >
                                <Icon name='info' />
                                <Step.Content>
                                    <Step.Title>Confirm Order</Step.Title>
                                </Step.Content>
                            </Step>
                        </>
                    }

                    {step === 3 &&
                        <>
                            <Step completed>
                                <Icon name='cart' />
                                <Step.Content>
                                    <Step.Title>Cart</Step.Title>
                                    <Step.Description>Review your cart</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed>
                                <Icon name='truck' />
                                <Step.Content>
                                    <Step.Title>Shipping</Step.Title>
                                    <Step.Description>Choose your shipping options</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed >
                                <Icon name='payment' />
                                <Step.Content>
                                    <Step.Title>Billing</Step.Title>
                                    <Step.Description>Enter billing information</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step active>
                                <Icon name='info' />
                                <Step.Content>
                                    <Step.Title>Confirm Order</Step.Title>
                                </Step.Content>
                            </Step>
                        </>
                    }
                    {step === 4 &&
                        <>
                            <Step completed>
                                <Icon name='cart' />
                                <Step.Content>
                                    <Step.Title>Cart</Step.Title>
                                    <Step.Description>Review your cart</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed>
                                <Icon name='truck' />
                                <Step.Content>
                                    <Step.Title>Shipping</Step.Title>
                                    <Step.Description>Choose your shipping options</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed >
                                <Icon name='payment' />
                                <Step.Content>
                                    <Step.Title>Billing</Step.Title>
                                    <Step.Description>Enter billing information</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step completed>
                                <Icon name='info' />
                                <Step.Content>
                                    <Step.Title>Confirm Order</Step.Title>
                                </Step.Content>
                            </Step>
                        </>
                    }


                </Step.Group>
            </div>
            <br />
            <Grid columns={2} relaxed='very' stackable divided inverted padded>
                <Grid.Column width={10} >
                    <div className="container">
                        <MultiStepForm step={step} setStep={setStep} />
                    </div>
                </Grid.Column>

                <Grid.Column width={5} style={{ backgroundColor: "#F5F5F5", height: "80vh" }}>
                    <br />
                    <Segment color="black">
                        <h4>Order Summary</h4>
                        <Item.Group>
                            {cartItems.map((i) => (
                                <Item>
                                    <Item.Image inline rounded fluid label={{ as: 'a', color: "teal", content: i.quantity, ribbon: "right" }} src={i.img} size="small" />
                                    <Item.Content>
                                        <Item.Header>{i.title}</Item.Header>
                                        <Item.Meta>
                                            <span className="price">£{i.price}</span>
                                        </Item.Meta>
                                    </Item.Content>
                                </Item>
                            ))}
                        </Item.Group>
                        <hr />
                        <p>Total: <b>£{total}</b></p>
                    </Segment>
                </Grid.Column>
            </Grid>
            {/* <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <CardElement />
                <button>Pay</button>
            </form> */}
        </div>
    );
};
export default CheckoutForm;