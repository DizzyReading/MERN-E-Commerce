import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { RiProductHuntLine } from 'react-icons/ri';
import { BiBox } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import { AiOutlineDashboard } from 'react-icons/ai';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';

const DropDownAdmin = ({ userInfo }) => {
	const [ open, setOpen ] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(
		() => {
			if (prevOpen.current === true && open === false) {
				anchorRef.current.focus();
			}

			prevOpen.current = open;
		},
		[ open ]
	);

	// console.log(userInfo, userInfo.isAdmin);

	return (
		<div>
			<Button
				color="secondary"
				variant="text"
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? 'composition-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				Admin
				<RiAdminLine />
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="composition-menu"
									aria-labelledby="composition-button"
									onKeyDown={handleListKeyDown}
								>
									<MenuItem onClick={() => (document.location.href = '/dashboard')}>
										<ListItemIcon>
											<AiOutlineDashboard />
										</ListItemIcon>
										<ListItemText>Dashboard</ListItemText>
									</MenuItem>
									<MenuItem onClick={() => (document.location.href = '/productlist')}>
										<ListItemIcon>
											<RiProductHuntLine />
										</ListItemIcon>
										<ListItemText>Productsts</ListItemText>
									</MenuItem>
									<MenuItem onClick={() => (document.location.href = '/orders')}>
										<ListItemIcon>
											<BiBox />
										</ListItemIcon>
										<ListItemText>Orders</ListItemText>
									</MenuItem>
									<MenuItem onClick={() => (document.location.href = '/users')}>
										<ListItemIcon>
											<FiUsers />
										</ListItemIcon>
										<ListItemText>Users</ListItemText>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
};

export default DropDownAdmin;
