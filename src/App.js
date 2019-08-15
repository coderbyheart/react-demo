import React from 'react';
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Contact from './Components/Contact'
import Product from './Components/Product'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component{
  render(){
    return(
    <Router> 
      <div>
      <Header />
      <main>
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/product/:slug' component={Product} />
      </main>
    </div>
  </Router>
    )
  }
}


export default App

