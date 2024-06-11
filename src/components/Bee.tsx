import styled from "styled-components";

interface Props {
  height: number;
  width: number;
  top: number;
  left: number;
}

const Bird = styled.div<Props>`
  position: absolute;
  background-image: url("../images/bee.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

export default Bird;
