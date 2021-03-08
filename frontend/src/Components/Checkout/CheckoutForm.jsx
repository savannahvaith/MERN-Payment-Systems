import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { Icon, Step, Grid, Segment } from 'semantic-ui-react'
import { BACKEND_URL } from '../../CONSTS.json';
import { useState } from 'react';
import MultiStepForm from "./Multistep/MultiStepForm";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [step, setStep] = useState(1);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
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

    return (
        <div className="container">
            <div className="row">
                <br />
                <Step.Group>
                    {step == 1 &&
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
                        step == 2 &&
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

                    {step == 3 &&
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
                    {step == 4 &&
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
            {/* <Segment placeholder> */}
            <Grid columns={2} relaxed='very' stackable divided inverted padded>
                <Grid.Column width={13} >
                    <div className="container">
                        <MultiStepForm step={step} setStep={setStep} />
                    </div>
                </Grid.Column>

                <Grid.Column width={3} >
                    <Segment color="black">
                        <p>Hello</p>
                        <hr />
                        <p>$</p>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
};
export default CheckoutForm;
{/* <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
    <CardElement />
    <button>Pay</button>
</form> */}