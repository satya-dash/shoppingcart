import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

import Notify from './notify';
import ItemList from './itemlist';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            name: ''
        }
    }

    _noOfItems(){
        let ls = localStorage.getItem('shopping_cart')||'{}';
        ls = JSON.parse(ls);
        let count = 0;
        Object.values(ls).forEach(el=>{
            count+= el.quantity;
        });
        return count;
    }

    render() {
        let {name} = this.state;
        let itemsInCart = this._noOfItems();
        return (
            <div>
                <Notify name={name}/>
                <div className="mainDiv">
                    <div className="headerDiv">
                        <div className="allItem floatLeft">All Items</div>
                        <Link className="goToCart floatRight" to="/cart">
                            Go to Cart <i className="fa fa-shopping-cart" style={{color:'#FFFFFF'}}></i>
                            {itemsInCart > 0 && ` (${itemsInCart})`}
                        </Link>
                    </div>
                    <ItemList
                        onChange={(name)=>{
                            this.setState({name});
                        }}/>
                </div>
            </div>
        );
    }
}

export default App;
