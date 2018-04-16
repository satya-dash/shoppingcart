import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Cart from './Cart';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/cart" component={Cart} />
		</div>
	</Router>
, document.getElementById('root'));
registerServiceWorker();
