import React, { Component } from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DoneIcon from '@material-ui/icons/Done';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ListItemText, ListItem, ListItemIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class LeftSideNav extends Component {
  render() {
    return <div>
				<Divider />
				<List component="nav">
					<ListItem button component={Link} to="/upload">
						<ListItemIcon>
							<CloudUploadIcon />
						</ListItemIcon>
						<ListItemText primary="File Upload" />
					</ListItem>
					<ListItem button component={Link} to="/files">
						<ListItemIcon>
							<DoneIcon />
						</ListItemIcon>
						<ListItemText primary="File List" />
					</ListItem>
				</List>
			</div>;
  }
}

