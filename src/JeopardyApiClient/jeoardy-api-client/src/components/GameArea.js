import React, { useEffect, useState } from "react";
import Button from "./Button";
import QuestionCard from "./QuestionCard";
import UserGuess from "./UserGuess";
import CategorySelect from "./CategorySelect";
import JeopardyApi from "../services/JeopardyApi";

function ScoredGameArea() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showQuestionSide, setShowQuestionSide] = useState(false);
  const [guessResultDisplay, setGuessResultDisplay] = useState(<p> &nbsp</p>);
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
    setGuessResultDisplay(null);
    setAcceptGuesses(true);
    setShowQuestionSide(false);
  }

  function onGuess(result) {
    if (!acceptGuesses) {
      return;
    }
    console.log("result: " + result);
    const newGuessResultDisplay = result ? (
      <p className="text-green-600">Correct!</p>
    ) : (
      <p className="text-red-600">Try again</p>
    );
    setNumAttempts(numAttempts + 1);
    setNumCorrect(numCorrect + (result ? 1 : 0));
    setGuessResultDisplay(newGuessResultDisplay);
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
      <Button title="Load Another Clue" onclick={loadQuestion} />
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
        initialShowQuestionSide={showQuestionSide}
        key={new Date().getTime()}
      />
      <div className={currentQuestion ? "" : "invisible"}>
        {guessResultDisplay ?? <br />}
        <p>
          Score: {numCorrect} of {numAttempts}
        </p>
        <UserGuess
          expectedText={currentQuestion?.question}
          onResult={onGuess}
        />
      </div>
      <br />
    </div>
  );
}

export default ScoredGameArea;
