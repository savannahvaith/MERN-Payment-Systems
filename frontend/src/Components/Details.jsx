import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {BACKEND_URL} from '../CONSTS.json';
import axios from 'axios';

const Details = () => {

    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/product/get/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <>
        <div className="container">
            <br/>
            <div className="row">
                <div className="col-md-4">
                    <img alt="product image" src={data.img} height="100%" width="100%" />
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