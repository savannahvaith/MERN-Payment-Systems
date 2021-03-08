import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
export const ProductsContext = createContext()

const ProductsContextProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    useEffect( () => {
        axios.get(`http://localhost:5019/product/getAll`)
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