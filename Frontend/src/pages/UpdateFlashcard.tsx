// UpdateFlashcard.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateFlashcard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flashcard } = location.state || {};

  const [question, setQuestion] = useState(flashcard?.question || '');
  const [answer, setAnswer] = useState(flashcard?.answer || '');
  const [isPublic, setIsPublic] = useState(flashcard?.public || false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please sign in.');
      return;
    }

    try {
      await axios.put('https://backend.chahaldarren.workers.dev/api/v1/flashCard', {
        id: flashcard.id,
        question,
        answer,
        public: isPublic,
      }, {
        headers: {
          Authorization: token,
        },
      });
      navigate('/'); // Redirect to home or flashcards list
    } catch (err) {
      console.error('Failed to update flashcard', err);
      setError('Failed to update flashcard. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black-red-gradient p-4">
      <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md bg-dark-metallic-gray text-white">
        <h2 className="text-2xl font-bold mb-4">Update Flashcard</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Answer</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="form-checkbox text-blue-500 bg-gray-700 border-gray-600"
            />
            <span className="ml-2 text-gray-300">Public</span>
          </label>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateFlashcard;
