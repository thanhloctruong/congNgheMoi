import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div class="grid-container">
        <header class="row">
          <div>
            <a class="brand" href="index.html">
              ACan
            </a>
          </div>
          <div>
            <a href="cart.html">cart</a>
            <a href="signin.html">sign in</a>
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer class="row center">coppy right ACan @2021</footer>
      </div>
    </Router>
  );
}

export default App;
