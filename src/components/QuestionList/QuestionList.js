import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import "./QuestionList.css";
import Question from "../Question/Question";
import Spinner from "../Spinner";

export default function QuestionList({
  gameOptions,
  onGameStart,
  handleNoQuestionsError,
}) {
  const [questionsArray, setQuestionsArray] = React.useState([]);
  const [allAnswerFilled, setAllAnswerFilled] = React.useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);

  const allQuestionsAnswered = questionsArray.every(
    (question) => question.selectedAnswer !== ""
  );

  useEffect(() => {
    // Fetch api
    const { category, difficulty, type } = gameOptions;

    let categoryQuery = "";
    let difficultyQuery = "";
    let typeQuery = "";

    if (category !== "") categoryQuery = `&category=${category}`;

    if (difficulty !== "") difficultyQuery = `&difficulty=${difficulty}`;

    if (type !== "") typeQuery = `&type=${type}`;

    let apiUrl = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}${typeQuery}`;
    setisLoading(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => data.results)
      .then((questions) => {
        setisLoading(false);
        if (questions.length === 0) {
          onGameStart();
          handleNoQuestionsError(true);
          return;
        } else {
          handleNoQuestionsError(false);
        }

        return setQuestionsArray(
          questions.map((question) => {
            return {
              ...question,
              id: nanoid(),
              selectedAnswer: "",
              showAnswer: false,
            };
          })
        );
      });
  }, [gameOptions, handleNoQuestionsError, onGameStart]);

  useEffect(() => {
    if (questionsArray.length !== 0 && allQuestionsAnswered) {
      let correctAnswers = 0;

      questionsArray.forEach((question) => {
        if (question.correct_answer === question.selectedAnswer)
          correctAnswers++;
      });
      setCorrectAnswersCount(correctAnswers);
      setAllAnswerFilled(true);
    }
  }, [questionsArray, allQuestionsAnswered]);

  const handleSelectAnswer = (questionId, answer) => {
    if (!gameOver) {
      setQuestionsArray((prevQuestionsArray) =>
        prevQuestionsArray.map((question) =>
          question.id === questionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    }
  };
  const checkAnswers = () => {
    if (allQuestionsAnswered) {
      setGameOver(true);

      setQuestionsArray((prevQuestionsArray) =>
        prevQuestionsArray.map((question) => ({
          ...question,
          showAnswer: true,
        }))
      );
    }
  };

  const resetGame = () => {
    setAllAnswerFilled(false);
    setGameOver(false);
    onGameStart();
  };

  const questionElements = questionsArray.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      difficulty={question.difficulty}
      category={question.category}
      selectedAnswer={question.selectedAnswer}
      showAnswer={question.showAnswer}
      handleSelectAnswer={handleSelectAnswer}
    />
  ));

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="questionList-container">
      {questionElements}
      <div className="bottom-container">
        {gameOver && (
          <h3 className="correct-answers-text">
            You scored {correctAnswersCount}/5 correct answers
          </h3>
        )}

        <button
          className={`btn-primary ${
            allAnswerFilled ? "btn-check-answers" : "btn-check-answers-disabled"
          }`}
          onClick={gameOver ? resetGame : checkAnswers}
        >
          {gameOver ? "Play again" : "Check answers"}
        </button>
      </div>
    </section>
  );
}
