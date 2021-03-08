import {Form, Button} from 'semantic-ui-react';

const UserDetails = (props) => {


    const saveAndContinue = (e) => {
        e.preventDefault()
        props.nextStep();
    }


    return (
        <Form >
            <h1 className="ui centered">Enter User Details</h1>
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
            <Form.Field>
                <label>Keep Billing Same As Shipping</label>
                <input
                    required
                    className="form-control"
                    type="checkbox"
                    onChange={e => props.handleChange(props.sets.setSame, e)}
                    defaultValue={props.values.same}
                />
            </Form.Field>
            <Button onClick={saveAndContinue}>Save And Continue </Button>
        </Form>
    )
}

export default UserDetails; 