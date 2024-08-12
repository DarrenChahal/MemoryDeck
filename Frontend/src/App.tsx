import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Flashcards from './pages/Flashcards';
import CreateFlashcard from './pages/CreateFlashCard';
import FlashcardDetail from './pages/FlashcardDetail';
import Quiz from './pages/Quiz';
import UpdateFlashcard from './pages/UpdateFlashcard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flashcards />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create-flashcard" element={<CreateFlashcard />} />
        <Route path="/flashcards/:id" element={<FlashcardDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/update-flashcard" element={<UpdateFlashcard />} />
  

      </Routes>
    </Router>
  );
}

export default App;
