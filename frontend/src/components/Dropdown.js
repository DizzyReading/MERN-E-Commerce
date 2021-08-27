import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CgProfile } from 'react-icons/cg';
import { IoMdGift } from 'react-icons/io';
import { BsCaretDownFill } from 'react-icons/bs';
import { RiAdminLine } from 'react-icons/ri';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import { css, cx } from '@emotion/css';

const Dropdown = ({ userProfileHandler, orderHistoryHandler, signOutHandler, userInfo }) => {
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
				{userInfo.name}
				<BsCaretDownFill className={css`margin-left: 3px;`} />
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
									<MenuItem onClick={() => (document.location.href = '/userprofile')}>
										<ListItemIcon>
											<CgProfile />
										</ListItemIcon>
										<ListItemText>Profile</ListItemText>
									</MenuItem>
									<MenuItem onClick={orderHistoryHandler}>
										<ListItemIcon>
											<IoMdGift />
										</ListItemIcon>
										<ListItemText>Order History</ListItemText>
									</MenuItem>
									<MenuItem onClick={signOutHandler}>
										<ListItemIcon>
											<RiLogoutCircleRLine />
										</ListItemIcon>
										<ListItemText>Sign Out</ListItemText>
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

export default Dropdown;
