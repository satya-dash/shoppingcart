import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

import Notify from './notify';

import {getInLS,removeInLS,changeQtyInLS} from './utils';

class Cart extends Component {
	_tableData(items){
		return Object.values(items).map(el=>{
			// let price = (el.price-el.discount)*el.quantity;
			return (
				<tr key={`item-${el.id}`}>
        			<td>
        				<div className="tableItem">
        					<img className="floatLeft" alt={el.name} src={el.img_url}/>
        					<div className="floatLeft">{el.name}</div>
        					<i onClick={this._removeFromCart.bind(this,el.id)} className="floatRight fa fa-close"></i>
        				</div>
        			</td>
        			<td className="quantityCol">
        				<i onClick={this._changeQty.bind(this,el.id,'minus')} className="fa fa-minus"></i>
        				<span>{el.quantity}</span>
        				<i onClick={this._changeQty.bind(this,el.id,'plus')} className="fa fa-plus"></i>
        			</td>
        			<td>
        				${el.price}
        			</td>
        		</tr>
			);
		})
	}

	_changeQty(id,type){
		changeQtyInLS(id,type);
		this.forceUpdate();
	}

	_removeFromCart(id){
		removeInLS(id);
		this.forceUpdate();
	}

	_totalPrice(items){
		let total = 0,discount = 0,typeDiscount = 0;
		Object.values(items).forEach(el=>{
			total += (el.price*el.quantity);
			discount += (el.discount*el.quantity);
			if(el.type === 'fiction')
				typeDiscount += el.price*0.15;
		});
		return {
			total,discount,typeDiscount
		};
	}

  	render() {
  		let items = getInLS();
  		let {total,discount,typeDiscount} = this._totalPrice(items);
  		return (
	      	<div>
	      		<Notify/>
	      		<div className="mainDiv">
	      			<div className="tableDiv ">
	      				<div className="cartHaderDiv">
		                    <div className="allItem">
		                    	<Link className="back" to="/">&lt;</Link>  Order Summary
		                    </div>
		                </div>
	                    <table>
	                    	<thead>
	                    		<tr>
		                    		<th width="60%">Items ({Object.keys(items).length})</th>
		                    		<th width="25%">Qty</th>
		                    		<th width="15%">Price</th>
	                    		</tr>
	                    	</thead>
	                    	<tbody>
	                    		{this._tableData(items)}
	                    	</tbody>
	                    </table>
	                </div>
	                <div className="orderSummaryDiv">
	                	<div className="orderSummary">
		                	<b>Total</b>
		                	<div className="totalItem">Items ({Object.keys(items).length}) : <span className="floatRight">${total}</span></div>
		                	<div>Discount : <span className="floatRight">${discount}</span></div>
		                	{typeDiscount > 0 &&
		                		<div>
		                			Type discount : <span className="floatRight">${typeDiscount}</span>
		                		</div>
		                	}
	                	</div>
	                	<div className="orderTotal">
	                		Order Total : <span className="floatRight">${`${total-discount-typeDiscount}`}</span>
	                	</div>
	                </div>
	            </div>
	      	</div>
	    );
  	}
}

export default Cart;
