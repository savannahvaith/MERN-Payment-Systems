import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Details = ({ addToBasket, basket }) => {
    const history = useHistory();

    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5019/product/get/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
        <div className="container">
            <br/>
            <div className="row">
                <div className="col-md-4">
                    <img alt="picture" src={data.img} height="100%" width="100%" />
                </div>
                <div className="col-md-8">
                    <div className="container text-center" style={{border:"solid 0.5px"}}>
                        <h3>{data.title}</h3>
                        <hr/>
                        <small>£{data.price}</small>
                        <p>{data.description}</p>
                        <br/>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Details; 