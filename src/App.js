import React from "react";
import "./App.css";
import shapeTop from "./images/shape-1.png";
import shapeBottom from "./images/shape-2.png";
import QuestionList from "./components/QuestionList/QuestionList";

export default function App() {
  const [gameStart, setGameStart] = React.useState(false);
  const [showNoQuestionsError, setShowNoQuestionsError] = React.useState(false);
  const [gameOptions, setGameOptions] = React.useState({
    category: "",
    difficulty: "",
    type: "",
  });

  function onGameStart() {
    setGameStart((prevState) => !prevState);
  }

  const handleNoQuestionsError = (boolean) => setShowNoQuestionsError(boolean);

  function changeOption(event) {
    const { name, value } = event.target;

    setGameOptions((prevGameOptions) => {
      return {
        ...prevGameOptions,
        [name]: value,
      };
    });
  }

  return (
    <main>
      <img className="shape-top" src={shapeTop} alt="Shape Top" />

      {gameStart ? (
        <section className="game-container">
          <QuestionList
            gameOptions={gameOptions}
            onGameStart={onGameStart}
            handleNoQuestionsError={handleNoQuestionsError}
          />
        </section>
      ) : (
        <section className="game-intro">
          <h1 className="game-title">Quizzical</h1>
          <p className="game-text">
            Customize your questions and challenge your knowledge!
          </p>

          {showNoQuestionsError && (
            <h2 className="noQuestions-text">
              Sorry! We couldn't find any questions with these options!
            </h2>
          )}

          <div className="gameCustom-container">
            <div className="select-container">
              <label className="custom-label" htmlFor="category">
                Category:
              </label>

              <select
                name="category"
                id="category"
                className="custom-select"
                value={gameOptions.category}
                onChange={changeOption}
              >
                <option value="">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="">
                  --------------------Entertainment--------------------
                </option>
                <option value="10">Books</option>
                <option value="11">Film</option>
                <option value="12">Music</option>
                <option value="13">Musicals &amp; Theatres</option>
                <option value="14">Television</option>
                <option value="15">Video Games</option>
                <option value="16">Board Games</option>
                <option value="29">Comics</option>
                <option value="31">Japanese Anime &amp; Manga</option>
                <option value="32">Cartoon &amp; Animations</option>
                <option value="">
                  ------------------------Science------------------------
                </option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Computers</option>
                <option value="19">Mathematics</option>
                <option value="30">Gadgets</option>
                <option value="">
                  -------------------------Others-------------------------
                </option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
              </select>
            </div>

            <div className="select-container">
              <label className="custom-label" htmlFor="difficulty">
                Difficulty:
              </label>

              <select
                name="difficulty"
                id="difficulty"
                className="custom-select"
                value={gameOptions.difficulty}
                onChange={changeOption}
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="select-container">
              <label className="custom-label" htmlFor="type">
                Type of questions:
              </label>

              <select
                name="type"
                id="type"
                className="custom-select"
                value={gameOptions.type}
                onChange={changeOption}
              >
                <option value="">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </div>
          </div>

          <button className="btn-primary" onClick={onGameStart}>
            Start Quiz
          </button>
        </section>
      )}
      <img className="shape-bottom" src={shapeBottom} alt="Shape Bottom" />
      <footer>
        Developed by&nbsp;
        <a
          href="https://github.com/evanyang0612"
          target="_blank"
          rel="noreferrer noopenner"
        >
          Evan Yang
        </a>
      </footer>
    </main>
  );
}
