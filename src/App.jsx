import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const easyBoards = [
    {
      puzzle: [
        "","",3,6,"",8,9,1,"",
        6,7,"",1,9,5,"",4,8,
        1,9,8,"",4,2,5,"",7,
        8,5,"",7,6,1,4,2,"",
        4,2,6,8,"",3,7,9,1,
        "",1,3,9,2,4,"",5,6,
        9,"",1,5,3,"",2,8,4,
        2,8,"",4,1,9,"",3,5,
        "","",5,2,"",6,1,"",9
      ],
      solution: [
        5,3,4,6,7,8,9,1,2,
        6,7,2,1,9,5,3,4,8,
        1,9,8,3,4,2,5,6,7,
        8,5,9,7,6,1,4,2,3,
        4,2,6,8,5,3,7,9,1,
        7,1,3,9,2,4,8,5,6,
        9,6,1,5,3,7,2,8,4,
        2,8,7,4,1,9,6,3,5,
        3,4,5,2,8,6,1,7,9
      ]
    },

    {
      puzzle: [
        5,3,"","",7,"","","","",
        6,"","",1,9,5,"","","",
        "",9,8,"","","","",6,"",
        8,"","","",6,"","","",3,
        4,"","",8,"",3,"","",1,
        7,"","","",2,"","","",6,
        "",6,"","","","",2,8,"",
        "","","",4,1,9,"","",5,
        "","","","",8,"","",7,9
      ],
      solution: [
        5,3,4,6,7,8,9,1,2,
        6,7,2,1,9,5,3,4,8,
        1,9,8,3,4,2,5,6,7,
        8,5,9,7,6,1,4,2,3,
        4,2,6,8,5,3,7,9,1,
        7,1,3,9,2,4,8,5,6,
        9,6,1,5,3,7,2,8,4,
        2,8,7,4,1,9,6,3,5,
        3,4,5,2,8,6,1,7,9
      ]
    }
  ];

  const mediumBoards = [
    {
      puzzle: [
        1,3,7,2,"",9,8,4,"",
        8,5,2,3,"","",6,1,9,
        "","",9,8,"","","","",2,
        4,"",5,1,8,3,9,2,6,
        9,"","",6,5,"","",7,3,
        "",1,6,7,9,"",4,5,8,
        "",9,4,"","",8,"","","",
        "",8,1,4,"",6,5,"",7,
        5,"","","","","",2,8,""
      ],
      solution: [
        1,3,7,2,6,9,8,4,5,
        8,5,2,3,4,7,6,1,9,
        6,4,9,8,1,5,7,3,2,
        4,7,5,1,8,3,9,2,6,
        9,2,8,6,5,4,1,7,3,
        3,1,6,7,9,2,4,5,8,
        7,9,4,5,2,8,3,6,1,
        2,8,1,4,3,6,5,9,7,
        5,6,3,9,7,1,2,8,4
      ]
    }
  ];

  const hardBoards = [
    {
      puzzle: [
        "","","",2,"","","",6,3,
        3,"","","","","",4,"","",
        "","",1,"","","",9,8,"",
        "","",8,"","","",1,"","",
        "",6,"","","","",3,"",5,
        7,"","","","","","",4,"",
        "","",5,"","","",7,"","",
        "","",2,"",1,"","","","",
        "","",4,"","","",2,"",""
      ],
      solution: [
        8,5,9,2,4,1,7,6,3,
        3,2,6,5,7,9,4,1,8,
        4,7,1,3,6,8,9,5,2,
        5,4,8,6,3,2,1,9,7,
        2,6,9,1,8,4,3,7,5,
        7,1,3,9,5,6,8,4,2,
        1,9,5,4,2,3,6,8,7,
        6,8,2,7,1,5,4,3,9,
        3,7,4,8,9,6,2,5,1
      ]
    }
  ];

  const getRandomBoard = (difficulty) => {

    const boards =
      difficulty === "Easy"
        ? easyBoards
        : difficulty === "Medium"
        ? mediumBoards
        : hardBoards;

    return boards[
      Math.floor(Math.random() * boards.length)
    ];
  };

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [currentGame, setCurrentGame] =
    useState(getRandomBoard("Easy"));

  const [board, setBoard] =
    useState(currentGame.puzzle);

  const [selectedCell, setSelectedCell] =
    useState(null);

  const [mistakes, setMistakes] =
    useState(0);

  const [seconds, setSeconds] =
    useState(0);

  const [darkMode, setDarkMode] =
    useState(false);

  const [message, setMessage] =
    useState("Ready to Play");

  const [history, setHistory] =
    useState([]);

  const [paused, setPaused] =
    useState(false);

  const [hints, setHints] =
    useState(3);

  const [showWinModal, setShowWinModal] =
    useState(false);

  useEffect(() => {

    if (paused || showWinModal) return;

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [paused, showWinModal]);

  useEffect(() => {

    const savedGame =
      localStorage.getItem("sudoku-save");

    if (savedGame) {

      const parsed =
        JSON.parse(savedGame);

      setBoard(parsed.board);
      setDifficulty(parsed.difficulty);
      setMistakes(parsed.mistakes);
      setHints(parsed.hints);
      setSeconds(parsed.seconds);
      setDarkMode(parsed.darkMode);
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "sudoku-save",

      JSON.stringify({
        board,
        difficulty,
        mistakes,
        hints,
        seconds,
        darkMode
      })
    );

  }, [
    board,
    difficulty,
    mistakes,
    hints,
    seconds,
    darkMode
  ]);

  const formatTime = () => {

    const mins =
      String(Math.floor(seconds / 60))
      .padStart(2, "0");

    const secs =
      String(seconds % 60)
      .padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const getMaxMistakes = () => {

    if (difficulty === "Easy")
      return 5;

    if (difficulty === "Medium")
      return 4;

    return 3;
  };

  const loadDifficulty = (level) => {

    const newGame =
      getRandomBoard(level);

    setDifficulty(level);
    setCurrentGame(newGame);
    setBoard(newGame.puzzle);
    setSelectedCell(null);
    setMistakes(0);
    setSeconds(0);
    setHints(3);
    setPaused(false);
    setHistory([]);
    setShowWinModal(false);

    setMessage(`${level} Mode Loaded`);
  };

  const handleCellClick = (index) => {

    if (paused) return;

    setSelectedCell(index);
  };

  const handleNumberClick = (num) => {

    if (
      paused ||
      selectedCell === null
    ) return;

    if (
      currentGame.puzzle[selectedCell] !== ""
    ) return;

    setHistory(prev => [
      ...prev,
      {
        board:[...board],
        mistakes,
        hints
      }
    ]);

    if (
      currentGame.solution[selectedCell] === num
    ) {

      const updatedBoard = [...board];

      updatedBoard[selectedCell] = num;

      setBoard(updatedBoard);

      setMessage("Correct ✔");

      const isCompleted =
        updatedBoard.every(
          (cell, index) =>
            cell ===
            currentGame.solution[index]
        );

      if (isCompleted) {

        setTimeout(() => {
          setShowWinModal(true);
        }, 300);
      }

    } else {

      const newMistake =
        mistakes + 1;

      setMistakes(newMistake);

      setMessage("Wrong ✖");

      if (
        newMistake >=
        getMaxMistakes()
      ) {

        setTimeout(() => {

          loadDifficulty(difficulty);

          setMessage("Game Over");

        }, 700);
      }
    }
  };

  const handleUndo = () => {

    if (history.length === 0)
      return;

    const previous =
      history[history.length - 1];

    setBoard(previous.board);

    setMistakes(previous.mistakes);

    setHints(previous.hints);

    setHistory(prev =>
      prev.slice(0, -1)
    );
  };

  const handleHint = () => {

    if (
      paused ||
      selectedCell === null ||
      hints === 0
    ) return;

    if (
      currentGame.puzzle[selectedCell] !== ""
    ) return;

    const updatedBoard = [...board];

    updatedBoard[selectedCell] =
      currentGame.solution[selectedCell];

    setBoard(updatedBoard);

    setHints(hints - 1);

    setMessage("Hint Used 💡");
  };

  const handleErase = () => {

    if (
      paused ||
      selectedCell === null
    ) return;

    if (
      currentGame.puzzle[selectedCell] !== ""
    ) return;

    const updatedBoard = [...board];

    updatedBoard[selectedCell] = "";

    setBoard(updatedBoard);
  };

  const togglePause = () => {
    setPaused(!paused);
  };

  const getRemainingCount = (num) => {

    const count =
      board.filter(
        cell => cell === num
      ).length;

    return 9 - count;
  };

  const isNumberCompleted = (num) => {
    return getRemainingCount(num) === 0;
  };

  const getCellClass = (index) => {

    let classes = "cell";

    if (
      currentGame.puzzle[index] !== ""
    ) {
      classes += " fixed";
    }

    if (selectedCell === index) {
      classes += " selected";
    }

    if (
      selectedCell !== null &&
      board[selectedCell] !== "" &&
      board[selectedCell] === board[index] &&
      selectedCell !== index
    ) {
      classes += " same-number";
    }

    return classes;
  };

  return (

    <div
      className={`app ${
        darkMode ? "dark" : ""
      }`}
    >

      <div className="game-wrapper">

        <div className="top-bar">

          <h1>Sudoku</h1>

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? "☀" : "🌙"}
          </button>

        </div>

        <div className="top-stats">

          <span>
            Mistakes:
            {" "}
            {mistakes}/
            {getMaxMistakes()}
          </span>

          <span>
            {difficulty}
          </span>

          <span>

            {formatTime()}

            <button
              className="pause-btn"
              onClick={togglePause}
            >
              {paused ? "▶" : "⏸"}
            </button>

          </span>

        </div>

        <div className="status-message">
          {message}
        </div>

        <div className="difficulty-buttons">

          <button
            onClick={() =>
              loadDifficulty("Easy")
            }
          >
            Easy
          </button>

          <button
            onClick={() =>
              loadDifficulty("Medium")
            }
          >
            Medium
          </button>

          <button
            onClick={() =>
              loadDifficulty("Hard")
            }
          >
            Hard
          </button>

        </div>

        <div className="sudoku-board">

          {board.map((cell, index) => (

            <div
              key={index}

              onClick={() =>
                handleCellClick(index)
              }

              className={`${getCellClass(index)}
              ${
                index % 3 === 2 &&
                index % 9 !== 8
                ? 'border-right'
                : ''
              }

              ${
                Math.floor(index / 9) % 3 === 2 &&
                Math.floor(index / 9) !== 8
                ? 'border-bottom'
                : ''
              }
              `}
            >
              {cell}
            </div>

          ))}

        </div>

        <div className="tool-bar">

          <button
            onClick={handleUndo}
          >
            Undo
          </button>

          <button
            onClick={handleHint}
          >
            Hint ({hints})
          </button>

          <button
            onClick={handleErase}
          >
            Erase
          </button>

          <button
            onClick={() =>
              loadDifficulty(difficulty)
            }
          >
            New
          </button>

        </div>

        <div className="number-pad">

          {[1,2,3,4,5,6,7,8,9]
          .map((num) => (

            <button
              key={num}

              onClick={() =>
                handleNumberClick(num)
              }

              className={
                isNumberCompleted(num)
                ? "completed-number"
                : ""
              }
            >

              <div>{num}</div>

              <small>
                {getRemainingCount(num)}
              </small>

            </button>

          ))}

        </div>

      </div>

      {paused && (

        <div className="pause-overlay">

          <div className="pause-box">

            <h2>Paused</h2>

            <button
              onClick={togglePause}
            >
              Resume
            </button>

          </div>

        </div>

      )}

      {showWinModal && (

        <div className="pause-overlay">

          <div className="pause-box">

            <h2>🎉 You Won!</h2>

            <p>
              Time:
              {" "}
              {formatTime()}
            </p>

            <p>
              Mistakes:
              {" "}
              {mistakes}
            </p>

            <button
              onClick={() =>
                loadDifficulty(difficulty)
              }
            >
              Play Again
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
