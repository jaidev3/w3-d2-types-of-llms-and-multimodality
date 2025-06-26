import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImageSelect: (file: File | string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [urlInput, setUrlInput] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1
  });

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageSelect(urlInput.trim());
      setUrlInput('');
    }
  };

  return (
    <div className="image-upload">
      <h3>📸 Select an Image</h3>
      
      {/* File Upload */}
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <div>
            <p>📁 Drag & drop an image here, or click to select</p>
            <p className="supported-formats">
              Supported: JPG, PNG, GIF, BMP, WebP
            </p>
          </div>
        )}
      </div>

      {/* URL Input */}
      <div className="url-input-section">
        <h4>Or enter image URL:</h4>
        <div className="url-input-container">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="url-input"
          />
          <button 
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="url-submit-btn"
          >
            Load
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload; 