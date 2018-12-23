import styled from 'styled-components';

const bgColor = ({ isActive, canDrop }) => {
  if (isActive) {
    return '#faeed8';
  } else if (canDrop) {
    return '#cacaca';
  }
  return 'white';
};

const Box = styled.div`
  min-height: 300px;
  background: ${bgColor};
  border: solid 1px rgba(0,0,0,0.8);
  border-radius: 4px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
`;

export default Box;
