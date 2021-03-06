import { Box, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position:'relative',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
      textDecoration: 'none',
      color: 'white',
  },
  closeButton :{
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    color: theme.palette.grey[500],
  }
}));

const MODE={
  LOGIN: 'a',
  REGISTER: 'b'
};

export default function Header() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user.current);
    const isLoggedIn = !!loggedInUser.id;
    // console.log(isLoggedIn);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.REGISTER);
    const [anchorEl,setAnchorEl] = useState(null);

const handleUserClick = (e) => {
  setAnchorEl(e.currentTarget);
};
const handleCloseMenu = ()  => {
  setAnchorEl(null);
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="top" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon className={classes.menuButton} /> */}
            < MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">EZ SHOP </Link>
          </Typography>

        <NavLink className={classes.link} to="/todos">
        <Button color={"inherit"}>Todos</Button>
        </NavLink>

        <NavLink className={classes.link} to="/albums">
        <Button color={"inherit"}>Albums</Button>
        </NavLink>
        {!isLoggedIn && (
          <Button color="inherit" onClick={handleClickOpen}>Login </Button>
        )}
         {isLoggedIn && (
          <IconButton color="inherit" onClick={handleUserClick} >
            <AccountCircle/>
          </IconButton>
        )}
        </Toolbar>
      </AppBar>
      <Menu
        // id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        {/* <MenuItem onClick={handleCloseMenu}>Profile</MenuItem> */}
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
      <Dialog
       disableBackdropClick
       disableEscapeKeyDown
       open={open} 
       onClose={handleClose}
        aria-labelledby="form-dialog-title"
        >
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <Close/>
          </IconButton>

        <DialogContent>
          { mode === MODE.REGISTER && (
            <>
         <Register closeDialog={handleClose}/>
            <Box textAlign="center">
              <Button color="primary" onClick={() => setMode(MODE.LOGIN)}> Already have an account. Login here</Button>
            </Box>

            </>
          )}

          {mode === MODE.LOGIN && (
            <>
         <Login closeDialog={handleClose}/>
            <Box textAlign="center">
              <Button color="primary" onClick={() => setMode(MODE.REGISTER)}> Dont have an account.Register here</Button>
            </Box>

            </>
          )}
        </DialogContent>

       
      </Dialog>
    </div>
  );
}
