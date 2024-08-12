import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  public: boolean;
}

const FlashcardDetail = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL parameters
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchFlashcard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please sign in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://backend.chahaldarren.workers.dev/api/v1/flashCard/${id}`, {
          headers: {
            Authorization: token, // Token used as is
          },
        });

        if (response.data && response.data.flashCard) {
          setFlashcard(response.data.flashCard);
        } else {
          setError('Flashcard not found.');
        }
      } catch (err) {
        console.error('Failed to fetch flashcard', err);
        setError('Failed to fetch flashcard. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcard();
  }, [id]);

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  if (loading) return <p className="text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen bg-black-red-gradient grid place-content-center">
      <div className="w-[350px] h-[350px] bg-transparent cursor-pointer group rounded-3xl perspective-1000">
        <div
          className={`relative w-full h-full preserve-3d duration-500 ${
            showAnswer ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full bg-dark-metallic-gray rounded-3xl shadow-lg p-6 backface-hidden flex flex-col text-white">
            <h2 className="text-lg font-semibold">Question:</h2>
            <p className="mb-4">{flashcard?.question}</p>
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
            <p className="mb-4">{flashcard?.answer}</p>
            <button
              onClick={handleFlip}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-auto block mx-auto"
            >
              Show Question
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between w-[350px] mx-auto space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
        >
          View All Flashcards
        </button>
        <button
          onClick={() => navigate('/create-flashcard')}
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition"
        >
          Create Another Flashcard
        </button>
      </div>
    </div>
  );
};

export default FlashcardDetail;
