import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  public: boolean;
}

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flashcards }: { flashcards: Flashcard[] } = location.state || { flashcards: [] };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const nextCard = () => {
    setShowAnswer(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    setShowAnswer(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const endQuiz = () => {
    navigate('/');  // Navigate back to the home page
  };

  if (flashcards.length === 0) {
    return <div className="text-center mt-10 text-white">No flashcards available for the quiz.</div>;
  }

  return (
    <div className="min-h-screen bg-black-red-gradient p-4 flex flex-col items-center justify-center">
      <div className="w-[350px] h-[350px] bg-transparent cursor-pointer group rounded-3xl perspective-1000 mb-6">
        <div
          className={`relative w-full h-full preserve-3d duration-500 ${
            showAnswer ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full bg-dark-metallic-gray rounded-3xl shadow-lg p-6 backface-hidden flex flex-col text-white">
            <h2 className="text-lg font-semibold">Question:</h2>
            <p className="mb-4">{flashcards[currentIndex].question}</p>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-auto block mx-auto hover:bg-blue-600 transition"
            >
              Show Answer
            </button>
          </div>
          {/* Back Side */}
          <div className="absolute rotate-y-180 w-full h-full bg-dark-metallic-gray rounded-3xl shadow-lg p-6 backface-hidden flex flex-col text-white">
            <h2 className="text-lg font-semibold">Answer:</h2>
            <p className="mb-4">{flashcards[currentIndex].answer}</p>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-auto block mx-auto hover:bg-blue-600 transition"
            >
              Show Question
            </button>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex justify-between w-full max-w-xl mb-4">
        <button
          onClick={prevCard}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition w-1/3"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-1/3"
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
        </button>
      </div>
      <button
        onClick={endQuiz}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full max-w-xl"
      >
        End Quiz
      </button>
    </div>
  );
};

export default Quiz;
