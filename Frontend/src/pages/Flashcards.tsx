import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  public: boolean;
}

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsSignedIn(true); // User is signed in
      fetchFlashcards(token);
    }
  }, []);

  const fetchFlashcards = async (token: string) => {
    try {
      const response = await axios.get('https://backend.chahaldarren.workers.dev/api/v1/flashCard/bulk', {
        headers: {
          Authorization: token,
        },
      });
      setFlashcards(response.data.flashCards);
    } catch (err) {
      console.error('Failed to fetch flashcards', err);
      setError('Failed to fetch flashcards. Please try again.');
    }
  };

  const deleteFlashcard = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please sign in.');
      return;
    }

    try {
      await axios.delete(`https://backend.chahaldarren.workers.dev/api/v1/flashCard/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setFlashcards(flashcards.filter(card => card.id !== id));
    } catch (err) {
      console.error('Failed to delete flashcard', err);
      setError('Failed to delete flashcard. Please try again.');
    }
  };

  const startQuiz = () => {
    navigate('/quiz', { state: { flashcards } });
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleSignin = () => {
    navigate('/signin');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    setIsSignedIn(false); // Update state to reflect the user is logged out
    navigate('/signup'); // Redirect to signup page
  };

  const handleUpdate = (flashcard: Flashcard) => {
    navigate('/update-flashcard', { state: { flashcard } });
  };

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="min-h-screen bg-black-red-gradient p-4">
      <div className="max-w-4xl mx-auto mt-10">
        {isSignedIn ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Your Flashcards</h2>
              <div className="space-x-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <button
                onClick={() => navigate('/create-flashcard')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Create Flashcard
              </button>
              <button
                onClick={startQuiz}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Start Quiz
              </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {flashcards.length > 0 ? (
              <ul className="space-y-4">
                {flashcards.map((card) => (
                  <li key={card.id} className="p-4 rounded-lg shadow-md bg-dark-metallic-gray text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p><strong className="font-semibold">Question:</strong> {card.question}</p>
                        <p><strong className="font-semibold">Answer:</strong> {card.answer}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdate(card)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteFlashcard(card.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-lg">No flashcards found.</p>
            )}
          </>
        ) : (
          <div className="flex justify-between items-center">
            <div className="space-y-4 text-white w-1/2">
              <h1 className="text-4xl font-bold">
                Welcome to <span className="text-red-500">Memory</span> Deck
              </h1>
              <p className="text-xl">
                Gear Up for <span className="text-red-500">Success</span>: Your Ultimate Learning Hub!
              </p>
              <ul className="list-disc ml-6 space-y-2 text-lg">
                <li>Create your custom flashcards</li>
                <li>Update cards</li>
                <li>Take quiz</li>
              </ul>
              <div className="space-x-4">
                <button
                  onClick={handleSignup}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Signup
                </button>
                <button
                  onClick={handleSignin}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Signin
                </button>
              </div>
            </div>

            {/* Flippable Dummy Card */}
            <div className="w-1/2 flex justify-center">
              <div className="w-[350px] h-[350px] bg-transparent cursor-pointer group rounded-3xl perspective-1000">
                <div
                  className={`relative w-full h-full preserve-3d duration-500 ${
                    showAnswer ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute w-full h-full bg-dark-metallic-gray rounded-3xl shadow-lg p-6 backface-hidden flex flex-col text-white">
                    <h2 className="text-lg font-semibold">Question:</h2>
                    <p className="mb-4">What is 2 + 2?</p>
                    <button
                      onClick={handleFlip}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-auto block mx-auto"
                    >
                      Show Answer
                    </button>
                  </div>
                  {/* Back Side */}
                  <div className="absolute rotate-y-180 w-full h-full bg-dark-metallic-gray rounded-3xl shadow-lg p-6 backface-hidden flex flex-col text-white">
                    <h2 className="text-lg font-semibold">Answer:</h2>
                    <p className="mb-4">4</p>
                    <button
                      onClick={handleFlip}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-auto block mx-auto"
                    >
                      Show Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
