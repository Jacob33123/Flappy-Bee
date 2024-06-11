import styled from "styled-components";

interface Props {
  height: number;
  width: number;
}

const Background = styled.div<Props>`
  background-image: url("../images/sky.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

export default Background;
