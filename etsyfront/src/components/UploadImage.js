import React from 'react';
import styled from 'styled-components';
import { userRequest } from '../api/http';

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 15px;
  padding: 3px;
  height: 35px;
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      type: null,
      id: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.resetFileInput = this.resetFileInput.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (!this.state.file) {
      alert('No file was selected');
      return;
    }
    formData.append('myImage', this.state.file);
    formData.append('type', this.state.type);
    formData.append('id', this.state.id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    userRequest.post('/upload', formData, config)
      .then((response) => {
        alert('The file is successfully uploaded');
        this.resetFileInput();
      }).catch((error) => {
        alert('File Upload Error');
      });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0], type: this.props.type, id: this.props.id });
  }

  resetFileInput() {
    document.getElementById('myImage').value = '';
    window.location.reload(false);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="file" id="myImage" name="myImage" onChange={this.onChange} />
        <Button type="submit">Upload</Button>
      </form>
    );
  }
}

export default UploadImage;
