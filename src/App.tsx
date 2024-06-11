import { useCallback, useEffect, useState } from "react";
import Home from "./components/Home";
import Background from "./components/Background";
import StartPanel from "./components/StartPanel";
import Pipe from "./components/Pipe";
import Bee from "./components/Bee";
import ScorePanel from "./components/ScorePanel";
import WaitingScreen from "./components/WaitingScreen";
import TryAgainButton from "./components/TryAgainButton";

const BEE_HEIGHT = 32;
const BEE_WIDTH = 32;
const FLAP_HEIGHT = 60;
const GRAVITY_STRENGTH = 10;
const INTERVAL_DURATION = 24;
const PIPE_GAP = 200;
const PIPE_SPEED = 8;
const PIPE_WIDTH = 52;

// Responsively update size of game window based on screen size
const WALL_HEIGHT = window.innerHeight < 600 ? window.innerHeight - 25 : 600;
const WALL_WIDTH = window.innerWidth < 400 ? window.innerWidth - 20 : 400;

function App() {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isViewingInstructions, setIsViewingInstructions] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [beePosition, setBeePosition] = useState(300);
  const [pipeHeight, setPipeHeight] = useState(0);
  const [pipePosition, setPipePosition] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Handle gravity for bee
  useEffect(() => {
    let birdInterval: NodeJS.Timer;

    if (isStarted && beePosition < WALL_HEIGHT - BEE_HEIGHT) {
      birdInterval = setInterval(() => {
        setBeePosition((bPos) => bPos + GRAVITY_STRENGTH);
      }, INTERVAL_DURATION);
    }

    return () => clearInterval(birdInterval);
  }, [beePosition, isStarted]);

  // Pipe/obstacle logic
  useEffect(() => {
    let pipeInterval: NodeJS.Timer;

    if (isStarted && pipePosition >= -PIPE_WIDTH) {
      // Move pipe across the screen
      pipeInterval = setInterval(() => {
        setPipePosition((objPos) => objPos - PIPE_SPEED);
      }, INTERVAL_DURATION);

      return () => clearInterval(pipeInterval);
    } else {
      // Randomly generate pipe height
      setPipePosition(WALL_WIDTH);
      setPipeHeight(Math.floor(Math.random() * (WALL_HEIGHT - PIPE_GAP)));

      if (isStarted) {
        setScore((score) => score + 1);
      }
    }
  }, [isStarted, pipePosition, score]);

  // Detect pipe collision
  useEffect(() => {
    let topPipe = beePosition >= 0 && beePosition < pipeHeight;
    let bottomPipe =
      beePosition <= WALL_HEIGHT &&
      beePosition >=
        WALL_HEIGHT - (WALL_HEIGHT - PIPE_GAP - pipeHeight) - BEE_HEIGHT;

    if (
      pipePosition >= PIPE_WIDTH &&
      pipePosition <= PIPE_WIDTH + 80 &&
      (topPipe || bottomPipe)
    ) {
      setIsGameOver(true);
      setIsStarted(false);
      setBeePosition(300);
    }
  }, [isStarted, beePosition, pipeHeight, pipePosition]);

  // Detect collision with top or bottom of window
  useEffect(() => {
    if (beePosition === 0 || beePosition === WALL_HEIGHT) {
      setIsGameOver(true);
      setIsStarted(false);
      setBeePosition(300);
    }
  }, [beePosition]);

  // Dynamically update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  // Allow for keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        flap();
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  });

  // Input handler
  const flap = useCallback(() => {
    if (isViewingInstructions) {
      setIsViewingInstructions(false);
    }
    if (!isStarted) {
      setScore(0);
      setIsStarted(true);
    } else if (beePosition < BEE_HEIGHT) {
      setBeePosition(0);
    } else {
      setBeePosition((beePosition) => beePosition - FLAP_HEIGHT);
    }
  }, [beePosition, isStarted, isViewingInstructions]);

  return isWaiting ? (
    <WaitingScreen
      onStartLesson={() => {
        setIsWaiting(false);
        setIsViewingInstructions(true);
      }}
    />
  ) : (
    <Home onClick={flap}>
      <ScorePanel score={score} highScore={highScore} />
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
        {!isStarted && !isWaiting ? (
          isGameOver ? (
            <StartPanel wallWidth={WALL_WIDTH}>
              <span>Game Over!</span>
              <span style={{ marginBottom: 10 }}>Score: {score}</span>
              <TryAgainButton onTryAgain={flap} />
            </StartPanel>
          ) : isViewingInstructions ? (
            <StartPanel wallWidth={WALL_WIDTH}>
              <span style={{ fontSize: 24 }}>How to Play</span>
              <span style={{ marginBottom: 10 }}>
                Flap your wings to avoid obstacles and get the high score!
              </span>
              <span>
                Click, use the spacebar, or touch the screen to start flapping.
              </span>
            </StartPanel>
          ) : (
            <StartPanel wallWidth={WALL_WIDTH}>
              Flap your wings to start!
            </StartPanel>
          )
        ) : null}
        {/* Top pipe */}
        <Pipe
          height={pipeHeight}
          width={PIPE_WIDTH}
          left={pipePosition}
          top={0}
          deg={180}
        />
        <Bee
          height={BEE_HEIGHT}
          width={BEE_WIDTH}
          top={beePosition}
          left={100}
        />
        {/* Bottom pipe */}
        <Pipe
          height={WALL_HEIGHT - PIPE_GAP - pipeHeight}
          width={PIPE_WIDTH}
          left={pipePosition}
          top={
            WALL_HEIGHT - (pipeHeight + (WALL_HEIGHT - PIPE_GAP - pipeHeight))
          }
          deg={0}
        />
      </Background>
    </Home>
  );
}

export default App;
