import { Form, Button, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const UserDetails = (props) => {
    const history = useHistory();
    const { firstName, secondName, email, address, city, postCode } = props.values;

    const saveAndContinue = (e) => {
        e.preventDefault();
        props.sets.setUserDetails({ firstName, secondName, email, "shipping_address": { "street": address, city, postCode } });
        props.nextStep();
    }


    return (
        <Form onSubmit={saveAndContinue}>
            <h4 class="ui dividing header">Contact Information</h4>
            <div className="two fields">
                <Form.Field>
                    <label>First Name</label>
                    <input
                        required
                        className="form-control"
                        placeholder='First Name'
                        onChange={e => props.handleChange(props.sets.setFirstname, e)}
                        defaultValue={props.values.firstName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        required
                        className="form-control"
                        placeholder='Last Name'
                        onChange={e => props.handleChange(props.sets.setSecondName, e)}
                        defaultValue={props.values.secondName}
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
                    defaultValue={props.values.email}
                />
            </Form.Field>
            <h4 class="ui dividing header">Shipping Information</h4>
            <Form.Field>
                <label>Address</label>
                <input
                    required
                    className="form-control"
                    type='text'
                    placeholder='Address'
                    onChange={e => props.handleChange(props.sets.setAddress, e)}
                    defaultValue={props.values.address}
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
                        defaultValue={props.values.city}
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
                        defaultValue={props.values.postCode}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Keep Billing Same As Shipping</label>
                    <input
                        className="form-control"
                        type="checkbox"
                        onChange={e => props.handleCheck(props.sets.setSame, e)}
                        defaultChecked={props.values.same}
                    />
                </Form.Field>
            </div>
            {
                props.values.same &&
                <>
                    <Form.Field>
                        <label>Address</label>
                        <input
                            required
                            className="form-control"
                            type='text'
                            placeholder='Address'
                            onChange={e => props.handleChange(props.sets.setAddress, e)}
                            defaultValue={props.values.address}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input
                            required
                            className="form-control"
                            type='text'
                            placeholder='City'
                            onChange={e => props.handleChange(props.sets.setCity, e)}
                            defaultValue={props.values.city}
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
                            defaultValue={props.values.postCode}
                        />
                    </Form.Field>
                </>
            }
            <br/>
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