import React from 'react';

interface QAResponse {
  question: string;
  answer: string;
  timestamp: Date;
  hasImage: boolean;
}

interface ResponseDisplayProps {
  responses: QAResponse[];
  loading?: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ responses, loading = false }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="response-display">
      <h3>💬 Conversation</h3>
      
      {responses.length === 0 && !loading && (
        <div className="empty-state">
          <p>No questions asked yet. You can ask questions with or without images!</p>
        </div>
      )}

      {loading && (
        <div className="loading-response">
          <div className="loading-message">
            <span className="loading-spinner">🤖</span>
            <p>AI is processing your question...</p>
          </div>
        </div>
      )}

      <div className="responses-list">
        {responses.map((response, index) => (
          <div key={index} className="response-item">
            <div className="question-bubble">
              <div className="bubble-header">
                <span className="user-label">
                  👤 You {response.hasImage ? '🖼️' : '💭'}
                </span>
                <span className="timestamp">{formatTime(response.timestamp)}</span>
              </div>
              <p className="question-text">{response.question}</p>
            </div>
            
            <div className="answer-bubble">
              <div className="bubble-header">
                <span className="ai-label">🤖 AI</span>
                <span className="timestamp">{formatTime(response.timestamp)}</span>
              </div>
              <div className="answer-text">
                {response.answer.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseDisplay; 