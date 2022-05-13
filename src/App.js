import { useState } from "react";
import Basket from "./components/Basket";
import Header from "./components/Header";
import Main from "./components/Main";
import data from "./data";

function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  // add to cart logic
  const onAdd = (product) => {
    // if the product exists already in the cart add 1 to it.
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      // update cart items to cartItems mapped.
      // keep other products the same but update product qty with current id
      // if it is another product do nothing
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    // if the product exists, and the quantity is 1. remove it
    if (exist.qty === 1) {
      // if the product doesn't equal cart items then return otherwise remove.
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      // if it exists and there are more than 1, remove 1 from quantity
      setCartItems(
      cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
      ),
      )
    }
  }


  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main onAdd={onAdd} products={products}></Main>
        <Basket
          onAdd={onAdd}
          cartItems={cartItems}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default App;
