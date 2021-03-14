import {useState} from 'react'; 
import Cart from '../../Cart/Cart';
import UserDetails from './step1/UserDetails';
import OrderReview from './step3/OrderReview';
import Confirmation from './step4/Confirmation';
import Success from './Success';
const MultiStepForm = ({step,setStep}) => {

    const [firstName, setFirstname] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [billingCity, setBillingCity] = useState('');
    const [billingPostCode, setBillingPostCode] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [same,setSame] = useState(true);

    const initialState = {
        cardNumber: '#### #### #### ####',
        cardHolder: 'FULL NAME',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
        isCardFlipped: false
    };
    const [state, setState] = useState(initialState);

    const values = { firstName, secondName, email, address, userDetails, same, postCode, city, billingAddress, billingCity, billingPostCode };
    const functions = { setFirstname, setSecondName, setEmail, setAddress, setCity, setPostCode, setUserDetails, setSame, setBillingAddress, setBillingCity, setBillingPostCode}

    const onChange = (func,event) => {
        func(event.target.value);
    };

    const onCheck = (func) => {
        func(!same);
    };

    const changeStep = (val) => {
        setStep( s=> s-val);
    }

    const nextStep = () => {
        setStep(s => s+1); 
    }

    const prevStep = () => {
        setStep(s => s-1);
    }

    switch (step) {
        case 1:
            return <UserDetails
                nextStep={nextStep}
                handleChange={onChange}
                sets={functions}
                values={values}
                handleCheck={onCheck}
            />
        case 2:
            return <button onClick={nextStep}>Next Step</button>
        case 3: 
            return <OrderReview 
                nextStep={nextStep} 
                prevStep={prevStep}
                changeStep={changeStep}
                cardState={state}
                values={values}
                />
        case 4:
            return <Confirmation
                nextStep={nextStep}
                prevStep={prevStep}
                values={values}
            />
        case 5:
            return <Success />
        default:
            return <Cart/>
    }

}
export default MultiStepForm;