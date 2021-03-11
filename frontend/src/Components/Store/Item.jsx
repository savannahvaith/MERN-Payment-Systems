import { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react'
import { CartContext } from '../../Context/CartContext';
const Item = ({ product }) => {
    const history = useHistory();
    const { addProduct, cartItems, increase } = useContext(CartContext);

    const isInCart = product => {
        return !!cartItems.find(item => item._id === product._id);
    }

    const details = (id) => {
        history.push(`/details/${id}`);
    }



    return (
        <>

            <Card style={{width: "550px", height:"400px", margin: "5px" }}>
                <Image style={{ display: "block", margin: "0 auto 10px", height: "250px", width:"300px" }} className="img-fluid"
                    src={product.img + '?v=' + product._id} alt={product.img}/>
                <Card.Content>
                    <Card.Header>{product.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{product.price}</span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra className="text-right">
                    {
                        isInCart(product) &&
                        <Button animated='vertical' onClick={() => increase(product)}>
                            <Button.Content hidden> + More!</Button.Content>
                            <Button.Content visible>
                                <i className="cart plus icon"></i> 
                            </Button.Content>
                        </Button>
                    }
                    {
                        !isInCart(product) &&
                        <Button animated='vertical' onClick={() => addProduct(product)}>
                            <Button.Content hidden>Add!</Button.Content>
                            <Button.Content visible>
                                <i className="shopping cart icon"></i>
                            </Button.Content>
                        </Button>
                    }
                    <Button color="teal" className="btn btn-outline-dark mr-2" onClick={() => details(product._id)}> <i className="info circle icon"></i></Button>
                </Card.Content>
            </Card>
        </>
    )
}
export default Item; 