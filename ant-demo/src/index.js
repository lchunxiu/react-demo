import 'antd/dist/antd.css';
import 'whatwg-fetch';
import React from "react";
import ReactDOM from "react-dom";
import { Layout } from 'antd';

import {HashRouter as Router , Route, Link } from "react-router-dom";

import 'whatwg-fetch'
import thunk from "redux-thunk";
import Header from "./components/header";
import Footer from "./components/footer";
import Content from "./components/content";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers/index";
import {addFetchList} from "./actions/category";

var store = createStore(reducers ,applyMiddleware(thunk));
store.dispatch(addFetchList());

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <div>
            <Route path="/" component={Header}>
            </Route>
            <Route path="/" component={Content}>
            </Route>
            <Route path="/" component={Footer}>
            </Route>
        </div>
  </Router>
  </Provider>
,document.getElementById("root"));