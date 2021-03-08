import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

const IndividualItems = ({ product }) => {


    const { increase, decrease, removeProduct } = useContext(CartContext);

    return (
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2">
                <img
                    alt={product.title}
                    style={{ margin: "0 auto", maxHeight: "50px" }}
                    src={product.img} className="img-fluid d-block" />
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">{product.title}</h5>
                <p className="mb-1">Price: {product.price} </p>

            </div>
            <div className="col-sm-2 p-2 text-center ">
                <p className="mb-0">Qty: {product.quantity}</p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                <button
                    onClick={() => increase(product)}
                    className="btn btn-primary btn-sm mr-2 mb-1">
                    <i class="plus circle icon"></i>
                </button>
                {
                    product.quantity === 1 &&
                    <button
                        onClick={() => removeProduct(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <i class="ban icon"></i>
                    </button>
                }
                {
                    product.quantity > 1 &&
                    <button
                        onClick={() => decrease(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <i class="minus circle icon"></i>
                    </button>
                }
            </div>
        </div>
    );

}

export default IndividualItems;