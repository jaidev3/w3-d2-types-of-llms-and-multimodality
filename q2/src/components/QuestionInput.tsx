import React, { useState } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
  loading?: boolean;
  hasImage?: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ 
  onSubmit, 
  disabled = false, 
  loading = false, 
  hasImage = false 
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !disabled) {
      onSubmit(question.trim());
      setQuestion('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getPlaceholder = () => {
    if (hasImage) {
      return "What would you like to know about this image? (e.g., 'What objects do you see?', 'Describe the scene', 'What colors are present?')";
    } else {
      return "Ask any question! (e.g., 'Explain quantum physics', 'Write a poem', 'What's the capital of France?')";
    }
  };

  const getStatusMessage = () => {
    if (hasImage) {
      return "🖼️ Ready to analyze your image";
    } else {
      return "💭 Ready for any question - no image needed";
    }
  };

  return (
    <div className="question-input">
      <h3>❓ Ask a Question</h3>
      <form onSubmit={handleSubmit} className="question-form">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={getPlaceholder()}
          className="question-textarea"
          disabled={disabled}
          rows={4}
        />
        <button 
          type="submit"
          disabled={disabled || !question.trim()}
          className="submit-button"
        >
          {loading ? (
            <span className="loading-spinner">🔄 Analyzing...</span>
          ) : (
            '🚀 Ask Question'
          )}
        </button>
      </form>
      
      {!disabled && (
        <p className="status-message">
          {getStatusMessage()}
        </p>
      )}
    </div>
  );
};

export default QuestionInput; 