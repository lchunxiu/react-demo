import React from "react";
import { Menu, Icon  } from 'antd';
import {Link} from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {current:"article"};
        this.handleClick=(e)=>{
            this.setState({
              current: e.key,
            });
        };
    }
    
    render(){
        return (
            <Menu onClick={this.handleClick}
        selectedKeys={[this.state.current]} mode="horizontal">
                <SubMenu title={<span><Icon type="code-o" />文章</span>}>
                    <Menu.Item key="article-add"><Link to="/article/edit"><Icon type="plus" />新建</Link></Menu.Item>
                    <Menu.Item key="article-list"><Link to="/article/list"><Icon type="appstore-o" />列表</Link></Menu.Item>
                    {/* <Menu.Item key="article-type"><Link to="/article/type"><Icon type="flag" />分类</Link></Menu.Item> */}
                </SubMenu>
                {/* <SubMenu title={<span><Icon type="book" />书单</span>}>
                    <Menu.Item key="book-add"><Link to="/book/add"><Icon type="plus" />新建</Link></Menu.Item>
                    <Menu.Item key="book-list"><Link to="/book/list"><Icon type="appstore-o" />列表</Link></Menu.Item>
                    <Menu.Item key="book-type"><Link to="/book/type"><Icon type="flag" />分类</Link></Menu.Item>
                </SubMenu>                */}
                <Menu.Item key="site"><Link to="/sites"><Icon type="tags-o" />网址</Link></Menu.Item>
            </Menu>
        );
    }
}

export default Header;