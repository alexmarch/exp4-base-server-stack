import React, { Component } from 'react'
import { Input, Button, Label } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import * as api from '../../api';
import { file } from 'babel-types';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  card: {
    minWidth: 275,
    textAlign: 'center'
  },
  actions: {
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
  }
});

class Upload extends Component {
  state = {
    files: [],
    completed: 0
  };
  onUploadEventHandler = event => {
    let completed = Math.ceil(event.loaded / event.total * 100);
    this.setState({ completed });
    // if (event.loaded === event.total) {
    //   this.setState({ completed: 0 });
    // }
  };
  onFileChange = event => {
    let uploads = [];
    let files = [];

    for (let f of event.target.files) {
      files.push(f);
    }
    this.setState({ files });

    api.fileUpload(files, this.onUploadEventHandler)
      .then(() => {
        console.log('Success');
      })
      .catch(() => {
        console.log('Error upload');
      });
  };
  render() {
    const { classes } = this.props;
    const { files } = this.state;

    return <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {files.length ? files.map((f, i) => [`File name: ${f.name}`, <br key={i} />]) : 'Please select file to upload.'}
          </Typography>
          {files.length
          ? <LinearProgress variant="determinate" value={this.state.completed} />
          : null}
        </CardContent>
        <CardActions className={classes.actions}>
          <input accept="image/*" className={classes.input} id="contained-button-file" multiple onChange={this.onFileChange} type="file" />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              Upload
								<CloudUploadIcon className={classes.rightIcon} />
            </Button>
          </label>
        </CardActions>
      </Card>
    </div>;
  }
}

export default withStyles(styles)(Upload);