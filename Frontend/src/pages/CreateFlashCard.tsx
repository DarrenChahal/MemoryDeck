import React, { useState } from 'react';
import axios from 'axios';
import { createFlashCardInput } from '@darren_chahal/flashcard-common'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const CreateFlashcard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate using Zod
    const validation = createFlashCardInput.safeParse({ question, answer, public: isPublic });

    if (!validation.success) {
      setError(validation.error.errors.map(err => err.message).join(', '));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please sign in.');
        return;
      }

      // Make the POST request to the correct endpoint
      const response = await axios.post('https://backend.chahaldarren.workers.dev/api/v1/flashCard', {
        question,
        answer,
        public: isPublic,
      }, {
        headers: {
          Authorization: token, // Using the token as is
        },
      });

      setError('');
      const flashCardId = response.data.id; // Adjust according to your API response
      navigate(`/flashcards/${flashCardId}`); // Use relative URL for navigation
    } catch (err) {
      console.error('Failed to create flashcard', err);
      setError('Failed to create flashcard. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black-red-gradient p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto mt-10 bg-dark-metallic-gray p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Create Flashcard</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-white">Question</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-white">Answer</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label className="text-sm text-white">Make Public</label>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFlashcard;
