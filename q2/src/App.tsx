import { useState, useCallback } from 'react';
import ImageUpload from './components/ImageUpload';
import QuestionInput from './components/QuestionInput';
import ResponseDisplay from './components/ResponseDisplay';
import './App.css';

interface QAResponse {
  question: string;
  answer: string;
  timestamp: Date;
  hasImage: boolean;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [responses, setResponses] = useState<QAResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');

  const handleImageSelect = useCallback((file: File | string) => {
    setSelectedImage(file);
    
    if (typeof file === 'string') {
      // URL input
      setImagePreview(file);
    } else {
      // File upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleQuestionSubmit = async (question: string) => {
    if (!question.trim()) {
      alert('Please enter a question');
      return;
    }

    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key');
      return;
    }

    setIsLoading(true);

    try {
      let messageContent: any[];

      if (selectedImage) {
        // Question with image
        let imageData: string;
        
        if (typeof selectedImage === 'string') {
          // URL image
          imageData = selectedImage;
        } else {
          // Convert file to base64
          const reader = new FileReader();
          imageData = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(selectedImage);
          });
        }

        messageContent = [
          {
            type: 'text',
            text: question,
          },
          {
            type: 'image_url',
            image_url: {
              url: imageData,
            },
          },
        ];
      } else {
        // Question without image (text-only)
        messageContent = [
          {
            type: 'text',
            text: question,
          },
        ];
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: selectedImage ? 'gpt-4o' : 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: messageContent,
            },
          ],
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const answer = data.choices[0]?.message?.content || 'No response received';

      setResponses(prev => [{
        question,
        answer,
        timestamp: new Date(),
        hasImage: !!selectedImage
      }, ...prev]);

    } catch (error) {
      console.error('Error:', error);
      alert('Error processing your question. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = () => {
    setSelectedImage(null);
    setImagePreview('');
    setResponses([]);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview('');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🤖 Multimodal QA Agent</h1>
        <p>Ask questions with or without images using GPT-4o Vision</p>
      </header>

      <main className="app-main">
        <div className="api-key-section">
          <input
            type="password"
            placeholder="Enter your OpenAI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="api-key-input"
          />
        </div>

        <div className="content-grid">
          <div className="left-panel">
            <ImageUpload onImageSelect={handleImageSelect} />
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Selected" />
                <button 
                  onClick={removeImage}
                  className="remove-image-button"
                  title="Remove image"
                >
                  ❌ Remove Image
                </button>
              </div>
            )}
            
            <QuestionInput 
              onSubmit={handleQuestionSubmit}
              disabled={isLoading}
              loading={isLoading}
              hasImage={!!selectedImage}
            />

            <button 
              onClick={clearSession}
              className="clear-button"
              disabled={!selectedImage && responses.length === 0}
            >
              Clear Session
            </button>
          </div>

          <div className="right-panel">
            <ResponseDisplay responses={responses} loading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
