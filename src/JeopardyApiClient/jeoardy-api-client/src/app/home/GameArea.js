import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import UserGuess from "../../components/UserGuess";
import CategorySelect from "../../components/CategorySelect";
import { getCluesForCategory, getRandomClue } from "../../services/JeopardyApi";

function GameArea() {
  const [currentClue, setCurrentClue] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showQuestionSide, setShowQuestionSide] = useState(false);
  const [hasCurGuess, setHasCurGuess] = useState(false);
  const [curGuess, setCurGuess] = useState("");
  const [curGuessCorrect, setCurGuessCorrect] = useState();
  const [numCorrect, setNumCorrect] = useState(0);
  const [numAttempts, setNumAttempts] = useState(0);
  const [acceptGuesses, setAcceptGuesses] = useState(true);
  const [categoryClues, setCategoryClues] = useState([]);
  const [categoryClueIndex, setCategoryClueIndex] = useState(0);

  useEffect(() => {
    const doLoadClue = async () => await loadClue();
    doLoadClue();
  }, []); // empty array ensures useEffect only runs once

  function handleCategorySelect(val) {
    setSelectedCategory(val);
    setCategoryClues([]);
    setCategoryClueIndex(0);
  }

  async function loadClue() {
    if (selectedCategory) {
      if (categoryClues.length > 0) {
        if (categoryClueIndex < categoryClues.length - 1) {
          const newIndex = categoryClueIndex + 1;
          setCategoryClueIndex(newIndex);
          setCurrentClue(categoryClues[newIndex]);
        } else {
          setAcceptGuesses(false);
          return;
        }
      } else {
        var clues = await getCluesForCategory(selectedCategory);
        setCategoryClues(clues);
        setCurrentClue(clues[0]);
      }
    } else {
      const clue = await getRandomClue();
      setCurrentClue(clue);
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
      guessText.toLowerCase() === currentClue?.question.toLowerCase();
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
      <Button title="Load Another Clue" onClick={loadClue} />
      <div
        className={
          categoryClues.length > 0 &&
          categoryClueIndex >= categoryClues.length - 1
            ? ""
            : "invisible"
        }
      >
        <p className="text-orange-700">
          No more clues available in this category
        </p>
      </div>
      <QuestionCard
        questionObj={currentClue}
        showQuestionSide={showQuestionSide}
        setShowQuestionSide={(val) => setShowQuestionSide(val)}
      />
      <div className={currentClue ? "" : "invisible"}>
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
