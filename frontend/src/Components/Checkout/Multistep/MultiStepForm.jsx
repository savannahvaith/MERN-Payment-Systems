import {useState} from 'react'; 
import UserDetails from './step1/UserDetails';
import PaymentDetails from './step2/PaymentDetails';
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
    const [userDetails, setUserDetails] = useState({});
    const [same,setSame] = useState(false);

    const values = { firstName, secondName, email, address, userDetails,same,postCode,city };
    const functions = { setFirstname, setSecondName, setEmail, setAddress, setCity, setPostCode, setUserDetails, setSame}

    const onChange = (func,event) => {
        func(event.target.value);
    };

    const onCheck = (func) => {
        func(!same);
    };

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
            return <PaymentDetails 
                nextStep={nextStep}
                prevStep={prevStep} 
                values={values}
            />
        case 3: 
            return <OrderReview 
                nextStep={nextStep} 
                prevStep={prevStep}
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
    }

}
export default MultiStepForm;