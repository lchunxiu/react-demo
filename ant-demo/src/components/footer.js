import React from "react";
import "../css/footer.less";


class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="footer-component">
                <span>Copyright © 2017</span>
                <span>|Based on Ant Design</span>
            </div>
        );
    }
}

export default Footer;