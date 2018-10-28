import styled from 'styled-components';

const ListItem = styled.div`
  border-bottom: solid 1px #adabff;
  padding: 14px 24px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgba(2, 2, 6, 0.2);
  }
`;

export default ListItem;
