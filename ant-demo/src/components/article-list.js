import React from "react";
import {Table,Row,Col,Modal} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const confirm = Modal.confirm;

class ArticleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:[],filteredInfo:null,};
        this.handleChange = (pagination, filters, sorter) => {
            this.setState({
              filteredInfo: filters,
              sortedInfo: sorter,
            });
          };
        
        this.deleteConfirm = this.deleteConfirm.bind(this);
    }
    deleteConfirm(record){
        let _this = this;
        confirm({
            title: '确定删除 “'+record.title+"” 吗？",
            content: '删除后将不能恢复',
            okText: '确定',
            okType: 'danger',
            cancelText: '算了',
            onOk() {
                fetch('/xhrarticle', {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      _id:record._id 
                    })
                  }).then(function parseJSON(response) {
                        return response.json()
                      }).then(function(json){
                          if(json.isok){
                            _this.setState({data:_this.state.data.filter(ele=>ele._id!==record._id)});
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
        fetch("/xhrarticle/list")
        .then(function(res){
            return res.json();
        }).then(function(json){
            _this.setState({data:json});
        }).catch(function(err){
            console.log(err);
        });
    }
    render(){
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        this.state.columns = [
            {
                title:"标题",
                dataIndex:"title",
                key:"title",
                width:70,
                render:(text,record)=>(<Link to={"../article/edit/"+record._id}>{text}</Link>)
            },
            {
                title:"类别",
                dataIndex:"type",
                key:"type",
                width:70,
                filters:this.props.categorys.map(ele=>{return {text:ele.title,value:ele.title};}),
                filteredValue: filteredInfo.type || null,
                onFilter: (value, record) => record.type.includes(value)
            },
            {
                title:"更新时间",
                dataIndex:"date",
                key:"date",
                width:70,
                sorter:true,
                sorter: (a, b) => a.date - b.date,
                sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
            },
            {
                title:"操作",
                key:"action",
                width:100,
                render:(text,record)=>(
                    <span>
                        {/* <Link to={"../article/edit/"+record._id}>修改</Link> */}
                        <span className="ant-divider" />
                        <a onClick={e=>{this.deleteConfirm(record,e)}}>删除</a>
                        <span className="ant-divider" />
                        {/* <a href="#">移动</a> */}
                    </span>
                )
            }
        ];
        return (<div style={{paddingTop:"30px"}}>
            <Row>
                <Col xs={{span:24,offset:0}} sm={{span:20,offset:2}}>
                    <Table columns={this.state.columns} dataSource={this.state.data} rowKey={(record)=>record._id} onChange={this.handleChange}></Table>
                </Col>
            </Row>
        </div>);
    }
}

var mapStateToProps = (state,ownprops)=>{
    return {
        categorys: state.categorys
      }
};

export default connect(mapStateToProps)(ArticleList);