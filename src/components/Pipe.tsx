import styled from "styled-components";

interface Props {
  height: number;
  width: number;
  top: number;
  left: number;
  deg: number;
}

const Pipe = styled.div<Props>`
  position: relative;
  background-image: url("../images/pipe.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

export default Pipe;
