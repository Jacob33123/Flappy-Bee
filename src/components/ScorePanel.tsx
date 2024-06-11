import styled from "styled-components";

interface Props {
  score: number;
  highScore: number;
}

const ScorePanelWrapper = styled.div`
  display: flex;
  width: 350px;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Kalam", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
`;

const ScorePanel = ({ score, highScore }: Props) => (
  <ScorePanelWrapper>
    <span>Score: {score}</span>
    <span>High Score: {highScore}</span>
  </ScorePanelWrapper>
);

export default ScorePanel;
