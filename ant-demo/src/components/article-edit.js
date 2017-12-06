import React from "react";
import {Form,Input,Select,Button} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
import EditableTagGroup from "./editable-tag-group";
import Editor from "./editor";
import {Redirect} from "react-router-dom";

import {connect} from "react-redux";


class ArticleAdd extends React.Component{
    constructor(props){
        super(props);

        this.state = {_id:undefined,tags:[],content:'',isSubmit:false}; 

        // 监听tag组件中值的变化
        this.tagChange = (tags)=>{
            this.setState({ tags:tags})
        }
        // 监听编辑器的值变化
        this.editorChange = (content)=>{
            this.setState({content:content});
        }
        this.submitError = (msg)=>{
            Modal.error({
                title: '表单提交错误',
                content: msg
              });
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
            var _this = this;
            this.props.form.validateFields((err, values) => {
              if (!err) {
                  fetch("/xhrarticle",{
                    method: this.state._id?'POST':'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Object.assign({tags:this.state.tags,content:this.state.content,_id:this.state._id},values))
                  }).then(function(res){
                      return res.json();
                  }).then(function(json) {
                      if(json.isok === true){
                        _this.setState({isSubmit:true});    
                      }else{
                        _this.submitError(json.err);
                      }
                  }).catch(function(ex) {
                    console.log(ex.message);
                  });
              }
              
            });
          };
    }
    componentDidMount(){
        let _id = this.props.match.params.id;
        if(_id) {
            let _this = this;
            fetch('/xhrarticle/'+_id)
            .then(function(response) {
            return response.json()
            }).then(function(json) {
                _this.setState({ tags:(json.tags||[]),content:json.content,_id:json._id});
                _this.props.form.setFieldsValue({title:json.title,type:json.type});
            }).catch(function(ex) {
            console.log('parsing failed', ex)
            });
        }
    }
    render(){
        // 如果提交成功跳转进入列表页面
        if(this.state.isSubmit){
        return (<Redirect to="/article/list"/>);
        }

        const { getFieldDecorator } = this.props.form;
        return (<div style={{paddingTop:"30px"}}>
            <Form onSubmit={this.handleSubmit}>
                <FormItem labelCol ={ {
                                        xs: { span: 24 },
                                        sm: { span: 2 ,offset:2},
                                        }} wrapperCol={{
                                                        xs: {  span: 22 ,offset:1 },
                                                        sm: { span: 12 , offset:0 },
                                                        }} label="标题" required="true" hasFeedback>
                    {getFieldDecorator('title', {
                                                    rules: [{ required: true, message: '必填' },{ min: 2,max:24,message: '2~24个字符' }],
                                                })(
                                                    <Input />
                                                )}  
                </FormItem>
                <FormItem labelCol ={ {
                                        xs: { span: 24 },
                                        sm: { span: 2 ,offset:2},
                                        }} wrapperCol={{
                                                        xs: {  span: 22 ,offset:1 },
                                                        sm: { span: 6 , offset:0 },
                                                        }} label="分类" required="true">
                    {getFieldDecorator('type',{initialValue:(this.props.categorys.length>0?this.props.categorys[0].title:""),rules: [{ required: true, message: '必填' }]})(
                    <Select>
                        {
                            this.props.categorys.map(function(ele){
                                return (<Option key={ele._id} value={ele.title}>{ele.title}</Option>);
                            })
                        }
                    </Select>)}
                </FormItem>
                <FormItem labelCol ={ {
                                        xs: { span: 24 },
                                        sm: { span: 2 ,offset:2},
                                        }} wrapperCol={{
                                                        xs: {  span: 22 ,offset:1 },
                                                        sm: { span: 12 , offset:0 },
                                                        }} label="标签">
                    <EditableTagGroup tags={this.state.tags} tagChange={this.tagChange}/>
                </FormItem>
                <FormItem  labelCol ={ {
                                        xs: { span: 24 },
                                        sm: { span: 2 ,offset:2},
                                        }} wrapperCol={{
                                                        xs: {  span: 22 ,offset:1 },
                                                        sm: { span: 16, offset:0 },
                                                        }}  label="正文">
                    <Editor onChange={this.editorChange} content={this.state.content}/>
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 22, offset: 1 },
                        sm: { span: 6, offset: 4 },
                    }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        </div>);
    }
}

// 注入分类
const mapStateToProps = (state, ownProps) => {
    return {
      categorys: state.categorys
    }
  }
export default connect(mapStateToProps)(Form.create()(ArticleAdd));