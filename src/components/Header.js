import React from 'react';
import { object, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import BackArrow from './icons/BackArrow';
import Refresh from './icons/Refresh';

const styles = {
  backButton: {
    marginRight: 10,
  },
};

const Header = ({ history, onRefresh, classes }) => {
  const showBackButton = history.index > 0;
  const showRefreshButton = history.index === 0;

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
        {showRefreshButton &&
          <IconButton
            className={classes.backButton}
            onClick={onRefresh}
          >
            <Refresh />
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
  classes: object.isRequired,
  onRefresh: func.isRequired,
};

export default withStyles(styles)(withRouter(Header));
