import NavigationBar from './Components/NavigationBar';
import Store from './Components/Store/Store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Details from './Components/Details';
import Cart from './Components/Cart/Cart';
import Stripe from './Components/Checkout/StripeContainer';
function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact>
            <Store/>
          </Route>
          <Route path="/Basket">
            <Cart/>
          </Route>
          <Route path="/Checkout">
            <Stripe />
          </Route>
          <Route path="/details/:id">
            <Details/>
          </Route>
        </Switch>
      </Router>
    </>
  )
}
export default App; 