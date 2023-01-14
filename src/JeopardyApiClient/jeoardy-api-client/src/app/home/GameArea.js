import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import UserGuess from "../../components/UserGuess";
import CategorySelect from "../../components/CategorySelect";
import JeopardyApi from "../../services/JeopardyApi";

function GameArea() {
  const [currentQuestion, setCurrentQuestion] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showQuestionSide, setShowQuestionSide] = useState(false);
  const [hasCurGuess, setHasCurGuess] = useState(false);
  const [curGuess, setCurGuess] = useState("");
  const [curGuessCorrect, setCurGuessCorrect] = useState();
  const [numCorrect, setNumCorrect] = useState(0);
  const [numAttempts, setNumAttempts] = useState(0);
  const [acceptGuesses, setAcceptGuesses] = useState(true);
  const [categoryQuestions, setCategoryQuestions] = useState([]);
  const [categoryQuestionIndex, setCategoryQuestionIndex] = useState(0);

  useEffect(() => loadQuestion(), []); // empty array ensures useEffect only runs once

  function handleCategorySelect(val) {
    setSelectedCategory(val);
    setCategoryQuestions([]);
    setCategoryQuestionIndex(0);
  }

  function loadQuestion() {
    if (selectedCategory) {
      if (categoryQuestions.length > 0) {
        if (categoryQuestionIndex < categoryQuestions.length - 1) {
          const newIndex = categoryQuestionIndex + 1;
          setCategoryQuestionIndex(newIndex);
          setCurrentQuestion(categoryQuestions[newIndex]);
        } else {
          setAcceptGuesses(false);
          return;
        }
      } else {
        JeopardyApi.getQuestionsForCategory(selectedCategory, (data) => {
          setCategoryQuestions(data);
          setCurrentQuestion(data[0]);
        });
      }
    } else {
      JeopardyApi.getRandomQuestion((item) => setCurrentQuestion(item));
    }

    //Reset UI
    setHasCurGuess(false);
    setCurGuessCorrect(false);
    setAcceptGuesses(true);
    setShowQuestionSide(false);
    setCurGuess("");
  }

  function onGuess(guessText) {
    if (!acceptGuesses) {
      return;
    }
    const guessCorrect =
      guessText.toLowerCase() === currentQuestion?.question.toLowerCase();
    setHasCurGuess(true);
    setCurGuessCorrect(guessCorrect);
    setNumAttempts(numAttempts + 1);
    setNumCorrect(numCorrect + (guessCorrect ? 1 : 0));
    setAcceptGuesses(false);
  }

  return (
    <div>
      <h1 className="text-3xl">Welcome to the Jeopardy clue collection</h1>
      <h3>Test yourself or simply browse the collection. Enjoy!</h3>
      <label className="text-left">Category (optional)</label>
      <br />
      <CategorySelect onCategorySelect={handleCategorySelect} />
      <br />
      <br />
      <Button title="Load Another Clue" onClick={loadQuestion} />
      <div
        className={
          categoryQuestions.length > 0 &&
          categoryQuestionIndex >= categoryQuestions.length - 1
            ? ""
            : "invisible"
        }
      >
        <p className="text-orange-700">
          No more clues available in this category
        </p>
      </div>
      <QuestionCard
        questionObj={currentQuestion}
        showQuestionSide={showQuestionSide}
        setShowQuestionSide={(val) => setShowQuestionSide(val)}
      />
      <div className={currentQuestion ? "" : "invisible"}>
        {hasCurGuess ? (
          curGuessCorrect ? (
            <p className="text-green-600">Correct!</p>
          ) : (
            <p className="text-red-600">Try again</p>
          )
        ) : (
          <br />
        )}
        <p>
          Score: {numCorrect} of {numAttempts}
        </p>
        <UserGuess
          onSubmit={onGuess}
          value={curGuess}
          onValueChange={(val) => setCurGuess(val)}
        />
      </div>
      <br />
    </div>
  );
}

export default GameArea;
