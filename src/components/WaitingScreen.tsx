import styled, { keyframes } from "styled-components";

interface Props {
  onStartLesson: () => void;
}

const WaitingScreenWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Kalam", cursive;
  font-weight: 400;
  font-style: normal;
`;

const moveUpDownAnimation = keyframes`
    0% { }
    60% { transform: translateY(-150px); }
    100% { }
`;

const AnimatedBee = styled.div`
  height: 32px;
  width: 32px;
  background-image: url("../images/bee.png");
  animation-name: ${moveUpDownAnimation};
  animation-duration: 6s;
  animation-iteration-count: infinite;
`;

const BeeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  height: 200px;
`;

const StartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 45px;
  background-color: blue;
  color: white;
  margin: 15px;
  cursor: pointer;
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.1);
  }
  &:active {
    transition: all 0.1s;
    transform: scale(0.9);
  }
`;

const WaitingScreen = ({ onStartLesson }: Props) => (
  <WaitingScreenWrapper>
    <span style={{ fontSize: 24, textAlign: "center" }}>
      Waiting for your teacher to start the lesson...
    </span>
    <BeeWrapper>
      <AnimatedBee />
    </BeeWrapper>
    <StartButton onClick={onStartLesson}>View Instructions</StartButton>
  </WaitingScreenWrapper>
);

export default WaitingScreen;
