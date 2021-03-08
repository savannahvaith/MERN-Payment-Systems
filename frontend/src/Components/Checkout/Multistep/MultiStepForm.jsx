import {useState} from 'react'; 
import PaymentDetails from './PaymentDetails';
import Success from './Success';
import UserDetails from './UserDetails';
const MultiStepForm = () => {

    const [step, setStep] = useState(1);
    const [firstName, setFirstname] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [shipping, setShipping] = useState({});
    const [same,setSame] = useState(false);

    const values = {firstName, secondName,email,address,shipping,same,postCode,city };
    const functions = {setFirstname, setSecondName, setEmail,setAddress,setCity, setPostCode, setShipping, setSame}

    const onChange = (func,event) => {
        func(event.target.value);
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
            />
        case 2:
            return <PaymentDetails nextstep={nextStep} prevStep={prevStep}/>
        // case 3:
        //     return <Confirmation
        //         nextStep={nextStep}
        //         prevStep={prevStep}
        //         values={state}
        //     />
        case 3:
            return <Success />
    }

}
export default MultiStepForm;