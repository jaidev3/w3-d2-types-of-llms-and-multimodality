# Q3 Project

This project contains utility tools and a main application.

## Structure

- `main.py` - Main application entry point
- `tools/` - Directory containing utility modules
  - `math_tools.py` - Mathematical utility functions
  - `string_tools.py` - String manipulation utility functions

## Usage

Run the main application:
```bash
python main.py
```

Import and use the tools:
```python
from tools.math_tools import add, subtract, multiply, divide
from tools.string_tools import reverse_string, capitalize_words, count_words, remove_spaces
``` 

(.venv) PS C:\Users\dev\Desktop\My Files\GitHub\misogiai\w3-d2-types-of-llms-and-multimodality\q3> python main.py "How many vowels are in the word ‘Multimodality’?"   
>> 
>>
==================================================
🤔 THINKING STEPS:
==================================================
To find the number of vowels in the word 'Multimodality', I will use the string_counter tool with the kind set to 'vowels'.

==================================================
🧰 Tool used: string_counter
📝 Tool input: {"kind": "vowels", "text": "Multimodality"}
✅ Final Answer: 5
==================================================
(.venv) PS C:\Users\dev\Desktop\My Files\GitHub\misogiai\w3-d2-types-of-llms-and-multimodality\q3> python main.py "What's the square root of the average of 18 and 50?"
>> 
==================================================
🤔 THINKING STEPS:
==================================================
To find the square root of the average of 18 and 50, I first need to calculate the average. The average is calculated by adding the two numbers together and dividing by 2. Then, I will take the square root of that average.      

==================================================
🧰 Tool used: calculator
📝 Tool input: sqrt((18 + 50) / 2)
✅ Final Answer: 5.830951894845301
==================================================
(.venv) PS C:\Users\dev\Desktop\My Files\GitHub\misogiai\w3-d2-types-of-llms-and-multimodality\q3> python main.py "Is the number of letters in ‘machine’ greater than the number of vowels in ‘reasoning’?"
>> 
==================================================
🤔 THINKING STEPS:
==================================================
First, I need to determine the number of letters in the word 'machine'. The word 'machine' has 7 letters. Next, I need to find the number of vowels in the word 'reasoning'. The vowels in 'reasoning' are 'e', 'a', 'o', and 'i', which totals to 4 vowels. Now, I will compare the two numbers: 7 (letters in 'machine') and 4 (vowels in 'reasoning'). Since 7 is greater than 4, the answer to the query is true.

==================================================
🧰 Tool used: none
✅ Final Answer: true
==================================================
(.venv) PS C:\Users\dev\Desktop\My Files\GitHub\misogiai\w3-d2-types-of-llms-and-multimodality\q3>