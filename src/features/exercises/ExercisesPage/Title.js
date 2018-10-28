import styled from 'styled-components';

const Title = styled.h2`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  letter-spacing: 0.012em;
  margin-bottom: 32px;
`;

export default Title;
