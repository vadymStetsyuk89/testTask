import * as React from 'react';
import './header.scss';
import { AppBar } from '@material-ui/core';

const Header = () => {
  return <div className="header">Header</div>;
  // return (
  //   <AppBar position="static">
  //     <Toolbar variant="dense">
  //       <IconButton
  //         edge="start"
  //         className={classes.menuButton}
  //         color="inherit"
  //         aria-label="menu"
  //       >
  //         <MenuIcon />
  //       </IconButton>
  //       <Typography variant="h6" color="inherit">
  //         Photos
  //       </Typography>
  //     </Toolbar>
  //   </AppBar>
  );
};

export default Header;
