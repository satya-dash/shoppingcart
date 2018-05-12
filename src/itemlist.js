import React, { Component} from 'react';

import {callAPI,setInLS} from './utils';

class ItemList extends Component {
    constructor(props){
        super(props);
        this.state={
            items: []
        }
    }

    componentDidMount(){
        callAPI('https://api.myjson.com/bins/qhnfp',(data)=>{
            console.log(data);
            this.setState({
                items:data
            });
        });
    }
    _addToCart(item){
        setInLS(item);
        this.props.onChange(item.name);
    }
    render(){
        let {items} = this.state;
        return (
            <div className="items">
                {
                    items.map(el=>{
                        return (
                            <div key={el.id} className="listItem">
                                <div className="imageDiv">
                                    <img alt={el.name} src={el.img_url}/>
                                </div>
                                <div className="textDiv">
                                    <div className="itemName">{el.name}</div>
                                    <div className="itemPrice">
                                        <div className="floatLeft">
                                            <span className={el.discount ? `discountApplied` : `noDiscount`}>
                                                ${el.price}
                                            </span> 
                                            {el.discount !==0  && 
                                                <span className="noDiscount">
                                                    ${`${el.price-el.discount}`}
                                                </span>
                                            }
                                            </div>
                                        </div>
                                        <div 
                                            className="floatRight addToCart" 
                                            onClick={this._addToCart.bind(this,el)}>
                                            Add to cart
                                        </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default ItemList;