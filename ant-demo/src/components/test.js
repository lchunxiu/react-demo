import React from "react";

class Input extends React.Component{
    constructor(props){
        super(props);
        this.onChange = (e)=>{
            this.props.onChange(e.target.value);
        };
    }
    render(){
        return (<input value={this.props.value} onChange={this.onChange}/>);
    }
}

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state ={value1:"",value2:""};
        this.onChange = this.onChange.bind(this);
    }
    onChange(val){
        this.setState({value1:val,value2:val})
    }
    render(){
        return (<div>
            <Input value={this.state.value1} onChange={this.onChange}/>
            <Input value={this.state.value2} onChange={this.onChange}/>
        </div>);
    }
}

export default Test;