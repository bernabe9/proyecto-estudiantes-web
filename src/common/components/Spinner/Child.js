import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
`;

const animationDelay = ({ animationDelay }) =>
  `animation-delay: ${animationDelay || '0s'}`;

const SpinnerWrapper = styled.div`
  animation: ${bounce} 2s infinite ease-in-out;
  ${animationDelay}
  background-color: #7e91ff;
  border-radius: 50%;
  height: 100%;
  left: 0;
  opacity: .6;
  position: absolute;
  top: 0;
  width: 100%;
`;

export default SpinnerWrapper;
