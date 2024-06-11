import styled from "styled-components";

interface Props {
  onTryAgain: () => void;
}

const TryAgainButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 45px;
  background-color: blue;
  color: white;
  margin: 5px;
  margin-left: auto;
  margin-right: auto;
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

const TryAgainButton = ({ onTryAgain }: Props) => (
  <TryAgainButtonWrapper onClick={onTryAgain}>Try Again</TryAgainButtonWrapper>
);

export default TryAgainButton;
