import React, { useState, useRef, useCallback } from 'react';
import CForm from './Form';
import CreditCard from './Card';
import './Payments.scss';
import { Button, Icon } from 'semantic-ui-react';


const PaymentDetails = ({ nextStep, prevStep, state,initialState,setState }) => {

    const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

    const updateStateValues = useCallback(
        (keyName, value) => {
            setState({
                ...state,
                [keyName]: value || initialState[keyName]
            });
        },
        [state]
    );

    // References for the Form Inputs used to focus corresponding inputs.
    let formFieldsRefObj = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef(),
        cardCvv: useRef()
    };

    let focusFormFieldByKey = useCallback((key) => {
        formFieldsRefObj[key].current.focus();
    });

    // This are the references for the Card DIV elements.
    let cardElementsRef = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef()
    };

    let onCardFormInputFocus = (_event, inputName) => {
        const refByName = cardElementsRef[inputName];
        setCurrentFocusedElm(refByName);
    };

    let onCardInputBlur = useCallback(() => {
        setCurrentFocusedElm(null);
    }, []);

    return (
        <div className="container">
            <div className="wrapper">
                <CForm
                    cardMonth={state.cardMonth}
                    cardYear={state.cardYear}
                    onUpdateState={updateStateValues}
                    cardNumberRef={formFieldsRefObj.cardNumber}
                    cardHolderRef={formFieldsRefObj.cardHolder}
                    cardDateRef={formFieldsRefObj.cardDate}
                    onCardInputFocus={onCardFormInputFocus}
                    onCardInputBlur={onCardInputBlur}
                >
                    <CreditCard
                        cardNumber={state.cardNumber}
                        cardHolder={state.cardHolder}
                        cardMonth={state.cardMonth}
                        cardYear={state.cardYear}
                        cardCvv={state.cardCvv}
                        isCardFlipped={state.isCardFlipped}
                        currentFocusedElm={currentFocusedElm}
                        onCardElementClick={focusFormFieldByKey}
                        cardNumberRef={cardElementsRef.cardNumber}
                        cardHolderRef={cardElementsRef.cardHolder}
                        cardDateRef={cardElementsRef.cardDate}
                    />
                </CForm>
            </div>
            <br />
            <div className="float-right">
                <Button animated='vertical' onClick={prevStep}>
                    <Button.Content hidden>Back</Button.Content>
                    <Button.Content visible>
                        <Icon name="caret left"></Icon>
                    </Button.Content>
                </Button>
                <Button animated='vertical' onClick={nextStep}>
                    <Button.Content hidden>Continue</Button.Content>
                    <Button.Content visible>
                        <Icon name="caret right"></Icon>
                    </Button.Content>
                </Button>
            </div>
        </div>
    );
};

export default PaymentDetails;