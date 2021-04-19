import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';



function App() {
  return (
    <div>
     <Header></Header>

    <Router>
      <Switch>

        <Route path="/shop">
        <Shop></Shop>
        </Route>

        <Route path="/review">
          <Review></Review>
        </Route>

        <Route path="/inventory">
          <Inventory></Inventory>
        </Route>

        <Route exact path="/">
          <Shop></Shop>
        </Route>

        <Route path="/product/:productKey">
          <ProductDetail></ProductDetail>
        </Route>

        <Route path="*">
          <NotFound></NotFound>
        </Route>
        
      </Switch>
    </Router>

     {/* <Shop></Shop> */}
     
    </div>
  );
}

export default App;






























// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
