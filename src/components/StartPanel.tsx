import styled from "styled-components";

interface Props {
  wallWidth: number;
}

const StartPanel = styled.div<Props>`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 5%;
  background-color: black;
  padding: 10px;
  width: ${(props) => props.wallWidth - 75}px;
  left: 7%;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-family: "Kalam", cursive;
  font-weight: 400;
  font-style: normal;
`;

export default StartPanel;
