import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { BACKEND_URL} from '../CONSTS.json';
export const ProductsContext = createContext()

const ProductsContextProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    useEffect( () => {
        axios.get(`${BACKEND_URL}/product/getAll`)
        .then( (res) => setProducts(res.data))
        .catch( (err) => console.error(err))
    },[]);

    return (
        <ProductsContext.Provider value={{ products }} >
            { children}
        </ProductsContext.Provider>
    );
}

export default ProductsContextProvider;