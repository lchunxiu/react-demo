import React from "react";
import { Tag, Input, Tooltip, Button } from 'antd';

class EditableTagGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputVisible: false,
            inputValue: '',
          };
        this.handleClose = (removedTag) =>{
            const tags = this.props.tags.filter(tag => tag !== removedTag);
            if(this.props.tagChange){
                this.props.tagChange(tags)
            }
        }
        this.showInput = ()=>{
            this.setState({ inputVisible: true }, () => this.input.focus());
        }
        this.handleInputChange = (e)=>{
            this.setState({ inputValue: e.target.value });
        }
        this.handleInputConfirm = ()=>{
            const state = this.state;
            const inputValue = state.inputValue;
            let tags = this.props.tags;
            if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
            }
            this.setState({
            inputVisible: false,
            inputValue: '',
            });

            if(this.props.tagChange){
                this.props.tagChange(tags)
            }
        }
        this.saveInputRef = (input)=>{this.input = input;}
    }
    render() {
        const {inputVisible, inputValue } = this.state;
        const  tags = (this.props.tags || []);
        return (
        <div>
            {tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
                <Tag key={tag} closable="true" afterClose={() => this.handleClose(tag)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
            })}
            {inputVisible && (
            <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
            />
            )}
            {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加</Button>}
        </div>
        );
    }
}

export default EditableTagGroup;