import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Dimmer, Loader, Grid } from 'semantic-ui-react';
import Item from "./Item";
import { useHistory } from 'react-router-dom';
import { ProductsContext } from "../../Context/ProductsContext";

const Store = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 3000)
    }, [])
    const { products } = useContext(ProductsContext);


    if (!isLoaded) {
        return <Dimmer active>
            <Loader size='massive'>Loading</Loader>
        </Dimmer>
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        {products.length} Products
               </div>
                    <div className="col-md-4">
                        <input type="text" placeholder="search product" className="form-control" />
                    </div>
                </div>
                <Grid columns={3}>
                    <Grid.Row>
                        {products.map((product) => (
                            <Grid.Column>
                                <Item key={product.id} product={product} />
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>
            </div>
        )
    }



}

export default Store; 