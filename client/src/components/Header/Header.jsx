import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import {
	Menu as MenuIcon,
	Person as AccountIcon,
	MenuOpen as MenuOpenIcon,
} from '@material-ui/icons';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// // components
import { Typography } from '../Wrappers/Wrappers';

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from '../../context/LayoutContext';
import { useAuthDispatch, signOut } from '../../context/AuthContext';

function Header(props) {
	var classes = useStyles();

	// local
	var [profileMenu, setProfileMenu] = useState(null);

	// global
	var layoutState = useLayoutState();
	var layoutDispatch = useLayoutDispatch();
	var authDispatch = useAuthDispatch();

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					color="inherit"
					onClick={() => toggleSidebar(layoutDispatch)}
					className={classNames(
						classes.headerMenuButton,
						classes.headerMenuButtonCollapse,
					)}
				>
					{layoutState.isSidebarOpened ? (
						<MenuOpenIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse,
								),
							}}
						/>
					) : (
						<MenuIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse,
								),
							}}
						/>
					)}
				</IconButton>
				<Typography variant="h5" weight="medium" className={classes.logotype}>
					FDP - View Validate
				</Typography>
				<div className={classes.grow} />

				<Typography weight="medium">
					Hi,&nbsp;
					<IconButton
						aria-haspopup="true"
						color="inherit"
						className={classNames(classes.headerMenuButton, classes.UserName)}
						aria-controls="profile-menu"
						onClick={e => setProfileMenu(e.currentTarget)}
					>
						<Typography weight="bold">
							{props.name.first.charAt(0).toUpperCase() +
								props.name.first.slice(1).toLowerCase()}{' '}
							{props.name.last.charAt(0).toUpperCase() +
								props.name.last.slice(1).toLowerCase()}
						</Typography>
					</IconButton>
				</Typography>
				<Menu
					id="profile-menu"
					open={Boolean(profileMenu)}
					anchorEl={profileMenu}
					onClose={() => setProfileMenu(null)}
					className={classes.headerMenu}
					classes={{ paper: classes.profileMenu }}
					disableAutoFocusItem
				>
					<MenuItem
						className={classNames(
							classes.profileMenuItem,
							classes.headerMenuItem,
						)}
						onClick={() => signOut(authDispatch, props.history)}
					>
						<AccountIcon className={classes.profileMenuIcon} /> Logout
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}

const mapStateToProps = state => {
	return {
		name: state.user.user.name,
	};
};

export default connect(mapStateToProps)(Header);
