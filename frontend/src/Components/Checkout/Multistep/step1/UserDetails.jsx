import { Form, Button, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const UserDetails = (props) => {
    const history = useHistory();
    const { firstName, secondName, email, address, city, postCode, same, billingAddress, billingCity, billingPostCode } = props.values;

    const saveAndContinue = (e) => {
        e.preventDefault();
        if(same){
            props.sets.setUserDetails({
                firstName,
                secondName,
                email,
                "shipping_address": {
                    "street": address,
                    city,
                    postCode
                },
                "billing_address": {
                    "street": address,
                    city,
                    postCode
                }
            });
        }else if(!same){
            props.sets.setUserDetails({
                firstName,
                secondName,
                email,
                "shipping_address": {
                    "street": address,
                    city,
                    postCode
                },
                "billing_address": {
                    "street": billingAddress,
                    "city": billingCity,
                    "postCode": billingPostCode
                }
            });
        }
        props.nextStep();
    }


    return (
        <Form onSubmit={saveAndContinue}>
            <h4 className="ui dividing header">Contact Information</h4>
            <div className="two fields">
                <Form.Field>
                    <label>First Name</label>
                    <input
                        required
                        className="form-control"
                        placeholder='First Name'
                        onChange={e => props.handleChange(props.sets.setFirstname, e)}
                        defaultValue={firstName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        required
                        className="form-control"
                        placeholder='Last Name'
                        onChange={e => props.handleChange(props.sets.setSecondName, e)}
                        defaultValue={secondName}
                    />
                </Form.Field>
            </div>
            <Form.Field>
                <label>Email Address</label>
                <input
                    required
                    className="form-control"
                    type='email'
                    placeholder='Email Address'
                    onChange={e => props.handleChange(props.sets.setEmail, e)}
                    defaultValue={email}
                />
            </Form.Field>
            <h4 className="ui dividing header">Shipping Information</h4>
            <Form.Field>
                <label>Address</label>
                <input
                    required
                    className="form-control"
                    type='text'
                    placeholder='Address'
                    onChange={e => props.handleChange(props.sets.setAddress, e)}
                    defaultValue={address}
                />
            </Form.Field>
            <div className="two fields">
                <Form.Field>
                    <label>City</label>
                    <input
                        required
                        className="form-control"
                        type='text'
                        placeholder='City'
                        onChange={e => props.handleChange(props.sets.setCity, e)}
                        defaultValue={city}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Post Code</label>
                    <input
                        required
                        className="form-control"
                        type='text'
                        placeholder='Post Code'
                        onChange={e => props.handleChange(props.sets.setPostCode, e)}
                        defaultValue={postCode}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Keep Billing Same As Shipping</label>
                    <input
                        className="form-control"
                        type="checkbox"
                        onChange={e => props.handleCheck(props.sets.setSame, e)}
                        defaultChecked={same}
                    />
                </Form.Field>
            </div>
            {
                !props.values.same &&
                <>
                    <Form.Field>
                        <label>Address</label>
                        <input
                            required
                            className="form-control"
                            type='text'
                            placeholder='Address'
                            onChange={e => props.handleChange(props.sets.setBillingAddress, e)}
                            defaultValue={props.values.billingAddress}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input
                            required
                            className="form-control"
                            type='text'
                            placeholder='City'
                            onChange={e => props.handleChange(props.sets.setBillingCity, e)}
                            defaultValue={props.values.billingCity}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Post Code</label>
                        <input
                            required
                            className="form-control"
                            type='text'
                            placeholder='Post Code'
                            onChange={e => props.handleChange(props.sets.setBillingPostCode, e)}
                            defaultValue={props.values.billingPostCode}
                        />
                    </Form.Field>
                </>
            }
            <br />
            <div className="float-right">
                <Button animated='vertical' onClick={() => history.push("/Basket")}>
                    <Button.Content hidden>Back</Button.Content>
                    <Button.Content visible>
                        <Icon name="caret left"></Icon>
                    </Button.Content>
                </Button>
                <Button animated='vertical' type="submit">
                    <Button.Content hidden>Continue</Button.Content>
                    <Button.Content visible>
                        <Icon name="caret right"></Icon>
                    </Button.Content>
                </Button>
            </div>
        </Form>
    )
}

export default UserDetails;