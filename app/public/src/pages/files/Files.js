import React, { Component } from 'react'
import * as api from '../../api';

export default class Files extends Component {
  componentDidMount() {
    api.getFiles().then(files => {
      console.log(files);
    });
  };
  render() {
    return (
      <div>
        Files
      </div>
    )
  }
}
