import { useState, useEffect, useContext } from "react";
import { Dimmer, Loader, Grid } from 'semantic-ui-react';
import Item from "./Item";
import { ProductsContext } from "../../Context/ProductsContext";

const Store = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 1500)
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
                            <Grid.Column key={product._id}>
                                <Item product={product} />
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
    // 01:24 / 01:25:50



}

export default Store; 