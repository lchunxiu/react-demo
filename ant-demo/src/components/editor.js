import React from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

class Editor extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value) {
        if(this.props.onChange){
            this.props.onChange(value);
        }
    }
    
    render() {
        let modules = {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
          ],
        };
      
        let formats = [
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image'
        ];
        return (
          <ReactQuill value={this.props.content} modules={modules} formats={formats} onChange={this.handleChange} />
        )
      }
}

export default Editor;