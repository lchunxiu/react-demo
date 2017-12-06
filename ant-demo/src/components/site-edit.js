import React from "react";
import {Button,Modal,Form,Input} from "antd";
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class SiteEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            icon:this.props.site.icon
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.urlChange = (e)=>{
            let iconurl = e.target.value+'/favicon.ico';
            //console.log("urlchange setFieldsValue")
            this.props.form.setFieldsValue({icon:iconurl})
            this.setState({icon:iconurl});
        }
        this.iconChange = (e)=>{
            this.setState({icon:e.target.value});
        }
    }
    componentDidMount(){
        this.props.form.setFieldsValue(this.props.site);
    }
    handleCancel(){
        this.props.hideModal();
    }
    submitError(msg){
        Modal.error({
            title: '表单提交错误',
            content: msg
          });
    }
    handleOk(){
        const form = this.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }

          let _this = this;
          let obj = Object.assign(this.props.site,values);
          fetch("/xhrsite",{
            method: _this.props.site._id?'POST':'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          }).then(function(res){
              return res.json();
          }).then(function(json) {
              if(json.isok === true){
                _this.props.form.resetFields();
                _this.setState({icon:icon});
                if(_this.props.site._id){
                    _this.props.siteUpdate(obj);
                }else{
                    _this.props.siteAdd(json.site);
                }
                _this.props.hideModal();
              }else{
                _this.submitError(json.error);
              }
          }).catch(function(ex) {
            console.log(ex.message);
          });

        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let {visible,loading} = this.state;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 18 },
            },
          };
        return (<Modal visible={this.props.visible}
         title="编辑网址"
         onOk={this.handleOk}
         onCancel={this.handleCancel}
         footer={[
           <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
           <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
             提交
           </Button>
         ]}>
         <Form>
                <FormItem {...formItemLayout} label="标题">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: '必填' }],
                })(
                    <Input />
                )}
                </FormItem>
                
                <FormItem {...formItemLayout} label="地址">
                {getFieldDecorator('url', {
                    rules: [{ required: true, message: '必填' },{pattern:/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,message:'如：http(s)://XXXXXXX.XXX/XXX'}],
                })(
                    <Input onBlur={this.urlChange}/>
                )}
                </FormItem>
                
                <FormItem {...formItemLayout} label="图标地址">
                {getFieldDecorator('icon', {
                    rules: [,{pattern:/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,message:'如：http(s)://XXXXXXX.XXX/XXX'}],
                })(
                    <Input onChange={this.iconChange} suffix={<img style={{width:"15px",height:"15px"}} src={this.state.icon}/>}/>
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="描述">
                {getFieldDecorator('des', {
                    rules: [],
                })(
                    <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
                </FormItem>
            </Form>
        </Modal>);
    }
}

export default Form.create()(SiteEdit);