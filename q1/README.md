# LLM Model Comparison Tool

This project provides a comprehensive tool for comparing different types of Large Language Models (LLMs): **Base**, **Instruct**, and **Fine-tuned** models using OpenAI's API and Hugging Face models.

## 📋 Prerequisites

- Python 3.8 or higher
- OpenAI API account and API key
- Hugging Face account and API token (optional, for fine-tuned models)
- Jupyter Notebook

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd w3-d2-types-of-llms-and-multimodality/q1
```

### 2. Install Dependencies

Install the required Python packages using pip:

```bash
pip install -r ../requirements.txt
```

Or install individually:

```bash
pip install openai>=1.3.0 python-dotenv>=1.0.0 pandas>=1.5.0 jupyter>=1.0.0 ipykernel>=6.0.0 requests>=2.31.0
```

### 3. Environment Setup

Create a `.env` file in the `q1` directory with your API credentials:

```bash
cp .env.example .env  # If .env.example exists
# OR create a new .env file
```

Add the following environment variables to your `.env` file:

```env
# Required: OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Hugging Face credentials (for fine-tuned models)
HF_API_TOKEN=your_huggingface_token_here
HF_FINE_TUNED_MODEL=your_fine_tuned_model_id_here
```

### 4. Get API Keys

#### OpenAI API Key:
1. Visit [OpenAI's website](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

#### Hugging Face Token (Optional):
1. Visit [Hugging Face](https://huggingface.co/)
2. Sign up or log in
3. Go to Settings → Access Tokens
4. Create a new token
5. Copy the token to your `.env` file

## 🏃‍♂️ Running the Project

### Option 1: Jupyter Notebook (Recommended)

1. Start Jupyter Notebook:
   ```bash
   jupyter notebook
   ```

2. Open `comparison_tool.ipynb` in your browser

3. Run all cells sequentially by clicking "Cell" → "Run All" or run each cell individually with `Shift + Enter`

### Option 2: Command Line

The notebook can also be converted to a Python script if needed:

```bash
jupyter nbconvert --to script comparison_tool.ipynb
python comparison_tool.py
```

## 🔧 Configuration

The tool supports three model types:

- **Base Models**: Raw pre-trained models (uses `gpt-4o-mini`)
- **Instruct Models**: Instruction-tuned models (uses `gpt-4o-mini`)
- **Fine-tuned Models**: Custom fine-tuned models (uses `omni-moderation-2024-09-26`)

You can modify the model configurations in the `MODEL_MAP` dictionary within the notebook.

## 📖 Usage Examples

The notebook provides examples of:

1. **Comparing model responses** to the same query across different model types
2. **Understanding model characteristics** and their appropriate use cases
3. **API integration** with both OpenAI and Hugging Face

Example queries you can test:
- "Explain quantum computing in simple terms"
- "Write a friendly email to a client about project delays"
- "Answer in english language"

## 🐛 Troubleshooting

### Common Issues:

1. **API Key Not Found**:
   - Ensure your `.env` file is in the correct directory
   - Check that environment variable names match exactly
   - Verify API key is valid and has sufficient credits

2. **Module Import Errors**:
   - Ensure all dependencies are installed: `pip install -r ../requirements.txt`
   - Check Python version compatibility

3. **Jupyter Kernel Issues**:
   - Restart the kernel: "Kernel" → "Restart"
   - Clear outputs: "Cell" → "All Output" → "Clear"

4. **API Rate Limits**:
   - Wait a few minutes between requests
   - Check your OpenAI usage limits

## 📁 Project Structure

```
q1/
├── README.md                 # This file
├── comparison_tool.ipynb     # Main Jupyter notebook
├── comparisons.md           # Comparison results and analysis
└── .env                     # Environment variables (create this)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of an educational curriculum on LLM types and multimodality.

---

**Note**: Make sure to keep your API keys secure and never commit them to version control. The `.env` file should be added to `.gitignore`.
