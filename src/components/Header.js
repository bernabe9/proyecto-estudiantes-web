import React from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import BackArrow from './icons/BackArrow';

const styles = {
  backButton: {
    marginRight: 10,
  },
};

const Header = ({ history, classes }) => {
  const showBackButton = history.index > 0;

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {showBackButton &&
          <IconButton
            className={classes.backButton}
            onClick={() => history.goBack()}
          >
            <BackArrow />
          </IconButton>
        }
        <Typography variant="title" color="inherit">
          Proyecto 2018
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  history: object.isRequired,
  classes: object.isRequired
};

export default withStyles(styles)(withRouter(Header));
