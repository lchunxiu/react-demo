import React from "react";
import {connect} from "react-redux";
import {Card, Col, Row, Button,Modal} from "antd";
import '../css/site.less';
import SiteEdit from "./site-edit";

const confirm = Modal.confirm;

class Site extends React.Component{
    constructor(props){
        super(props);
        this.state = {visible:false,site:{},data:[],edits:false};

        this.showModal = (edit) => {
            this.setState({ visible: true ,site:edit});
          };
        
        this.hideModal = (edit) => {
            this.setState({ visible: false });
          };
        this.deleteConfirm = this.deleteConfirm.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addData = this.addData.bind(this);
        this.toggleHandle = this.toggleHandle.bind(this);
    }
    toggleHandle(type){
        this.setState({edit:(!this.state.edit)})
    }
    updateData(site){
        this.setState({data:this.state.data.map(ele=>(ele._id===site._id?site:ele))});
    }
    addData(site){
        this.state.data.push(site);
        this.setState({data:this.state.data});
    }
    deleteConfirm(site){
        let _this = this;
        confirm({
            title: '确定删除 “'+site.title+"” 吗？",
            content: '删除后将不能恢复',
            okText: '确定',
            okType: 'danger',
            cancelText: '算了',
            onOk() {
                fetch('/xhrsite', {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      _id:site._id 
                    })
                  }).then(function parseJSON(response) {
                        return response.json()
                      }).then(function(json){
                          if(json.isok){
                            _this.setState({data:_this.state.data.filter(ele=>site._id!==ele._id)});
                          }
                  }).catch(function(error) {
                    console.log('request failed', error);
                });
            },
            onCancel() {
              //Cancle callback
            },
          });
    }
    componentDidMount(){
        let _this = this;
        fetch("/xhrsite/list")
        .then(function(res){
            return res.json();
        }).then(function(json){
            _this.setState({data:json});
        }).catch(function(err){
            console.log(err);
        });
    }
    renderGrid(type){
        const gridStyle = {boxShadow:'none'};
        let data = this.state.data.filter(ele=>(ele.type===type));
        return (data.map(ele=>{
            return (<Card.Grid className="site-card-grid" style={gridStyle} key={ele._id}>
            <a className="site-link" href={ele.url} target='_black' style={{backgroundImage:'url('+ele.icon+')'}}>
                {ele.title}
            </a>
            <p className="site-des">{ele.des}</p>
            <div className="site-handle" style={{display:(this.state.edit?'block':'none')}}><a className="site-handler" onClick={e=>{this.deleteConfirm(ele)}}>删除</a><a onClick={e=>{this.showModal(ele)}} className="site-handler">编辑</a></div>
        </Card.Grid>);
        }));
    }
    render(){
        const bodyStyle = {
            padding:"0"
        };
        const bordered = false;
        const gridStyle = {boxShadow:'none'};

        let {visible,loading} = this.state;
        return (
            <div style={{paddingTop:"30px",paddingBottom:"30px"}}>
            <Row>
                <Col xs={{ span: 24, offset: 0 }} sm={{ span: 22, offset: 1 }}>                
                <Button onClick={this.toggleHandle} style={{marginLeft:"10px"}}>操作</Button>
                {this.props.categorys.map(ele=>{
                    return (
                        <div style={{paddingTop:"20px"}} key={ele._id}>
                    <header className="site-card-header"><h3>{ele.title}</h3></header>
                    <Card bodyStyle={bodyStyle} bordered={bordered} noHovering >
                        {this.renderGrid(ele.title)}
                        <Card.Grid className="site-card-grid" style={gridStyle}>  
                            <Button type="dashed" onClick={e=>{this.showModal({type:ele.title})}}>+ 添加</Button>
                        </Card.Grid>
                    </Card>
                </div>
                    );
                })}
                </Col>
            </Row>
            {this.state.visible?
            <SiteEdit visible={this.state.visible} showModal = {this.showModal} hideModal = {this.hideModal}
           site={this.state.site} siteUpdate = {this.updateData} siteAdd = {this.addData} />:''}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      categorys: state.categorys
    }
};
export default connect(mapStateToProps)(Site);
