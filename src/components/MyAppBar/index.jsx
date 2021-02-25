import React from 'react';
import PropTypes from 'prop-types';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import FaceIcon from '@material-ui/icons/Face';
import {
	AppBar,
	Avatar,
	Box,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from 'utils';

MyAppBar.propTypes = {};

const useStyles = makeStyles((theme) => ({
	toolbar: {
		paddingRight: 24,
	},

	title: {
		flexGrow: 1,
	},
}));

export default function MyAppBar(props) {
	const { me } = props;

	const classes = useStyles();

	let history = useHistory();
	const changeLocation = (path) => {
		history.push(`/${path}`);
	};

	const logout = () => {
		localStorage.clear();
		const handleLogout = async () => {
			await axios.get('http://localhost:4000/auth/logout');
		};
		handleLogout();
	};

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position='fixed'>
			<Toolbar className={classes.toolbar}>
				<Typography
					onClick={() => changeLocation('')}
					component='h1'
					variant='h6'
					color='inherit'
					noWrap
					className={classes.title}
				>
					Homepage
				</Typography>
				<Box>
					{!isEmpty(me) && (
						<Avatar onClick={handleClick}>{me.displayName}</Avatar>
					)}
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleCloseMenu}
					>
						<Box onClick={() => changeLocation('profile')}>
							<MenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<FaceIcon fontSize='small' />
								</ListItemIcon>
								<ListItemText primary='Profile' />
							</MenuItem>
						</Box>
						<MenuItem onClick={handleCloseMenu}>
							<ListItemIcon>
								<PhotoCameraIcon fontSize='small' />
							</ListItemIcon>
							<ListItemText primary='Change Avatar' />
						</MenuItem>
						<Box onClick={logout}>
							<MenuItem onClick={handleCloseMenu}>
								<ListItemIcon>
									<ExitToAppIcon fontSize='small' />
								</ListItemIcon>
								<ListItemText primary='Logout' />
							</MenuItem>
						</Box>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
