import React from "react";
import {Route} from "react-router-dom";
import ArticleEdit from "./article-edit";
import ArticleList from "./article-list";
import Site from "./site";

import Test from "./test1";


class Content extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
                <Route path="/article/edit" exact component={ArticleEdit}>
                </Route>
                <Route path="/article/edit/:id" component={ArticleEdit}>
                </Route>
                <Route path="/article/list" component={ArticleList}>
                </Route>
                <Route path="/sites" component={Site}>
                </Route>
                <Route path="/test" component={Test}>
                </Route>
        </div>);
    }
}

export default Content;