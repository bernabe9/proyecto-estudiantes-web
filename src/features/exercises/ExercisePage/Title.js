import styled from 'styled-components';

const Title = styled.h3`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  letter-spacing: 0.012em;
  margin: 0;
`;

export default Title;
