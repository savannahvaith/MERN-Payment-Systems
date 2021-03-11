import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {PUBLISHABLE_KEY} from '../../CONSTS.json';
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(`${PUBLISHABLE_KEY}`);

const Stripe = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Stripe;