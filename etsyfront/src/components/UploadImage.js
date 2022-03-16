import React from 'react'
import { publicRequest } from '../api/http';

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file: null,
            type: null,
            id: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.resetFileInput = this.resetFileInput.bind(this);
    }
    resetFileInput() {  
      document.getElementById("myImage").value = "";
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        if(!this.state.file) {
          alert("No file was selected");
          return;
        }
        formData.append('myImage',this.state.file);
        formData.append('type',this.state.type);
        formData.append('id',this.state.id);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        publicRequest.post("/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
                this.resetFileInput();
            }).catch((error) => {
              alert("File Upload Error")
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0], type: this.props.type, id: this.props.id});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <input type="file" id="myImage" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default UploadImage