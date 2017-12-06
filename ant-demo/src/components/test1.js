import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;
import SiteEdit from "./site-edit";



class CollectionsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    };
    this.showModal = () => {
      this.setState({ visible: true });
    }
    this.handleCancel = () => {
      this.setState({ visible: false });
    }
    this.handleCreate = () => {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
      });
    }
    this.saveFormRef = (form) => {
      this.form = form;
    }
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>New Collection</Button>
        <SiteEdit
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


export default CollectionsPage;