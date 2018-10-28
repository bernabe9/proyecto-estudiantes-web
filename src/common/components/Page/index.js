import React from 'react';
import { oneOfType, arrayOf, node, func } from 'prop-types';

import Container from './Container';
import Content from './Content';
import Footer from './Footer';

const Page = ({ children, Header }) => (
  <Container>
    {Boolean(Header) && <Header />}
    <Content>
      {children}
    </Content>
    <Footer>Proyecto grado - Fing UDELAR</Footer>
  </Container>
);

Page.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  Header: func,
};

export default Page;
