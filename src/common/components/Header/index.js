import React from 'react';
import { object, func } from 'prop-types';
import { withRouter } from 'react-router-dom';

import BackArrow from 'icons/BackArrow';
import Refresh from 'icons/Refresh';
import Wrapper from './Wrapper';
import Button from './Button';

const Header = ({ history, onRefresh }) => {
  const showBackButton = history.index > 0;
  const showRefreshButton = history.index === 0;

  return (
    <Wrapper>
      {showBackButton &&
        <Button onClick={history.goBack}>
          <BackArrow />
          <span>Atrás</span>
        </Button>
      }
      {showRefreshButton &&
        <Button onClick={onRefresh}>
          <Refresh />
          <span>Refrescar</span>
        </Button>
      }
    </Wrapper>
  );
};

Header.propTypes = {
  history: object.isRequired,
  onRefresh: func,
};

export default withRouter(Header);
