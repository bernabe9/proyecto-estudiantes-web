import styled from 'styled-components';

const border = ({ error }) => {
  const color = error ? '#f44336' : 'rgba(0, 0, 0, 0.23)';
  return `border: 1px solid ${color};`;
};

const borderHover = ({ error }) => {
  const color = error ? '#f44336' : 'black';
  return `border: 1px solid ${color};`;
};

const Input = styled.input`
  ${border}
  padding: 12px 9px;
  font-size: 16px;
  border-radius: 4px;
  margin-bottom: 7px;

  &:hover, &:focus {
    ${borderHover}
    outline: none;
  }
`;

export default Input;
