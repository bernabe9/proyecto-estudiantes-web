import styled from 'styled-components';

const ListItem = styled.div`
  border-bottom: solid 1px #d4ebff;
  padding: 14px 24px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgba(32, 32, 49, 0.07);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default ListItem;
