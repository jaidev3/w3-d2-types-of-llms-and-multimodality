# Main application file

import json
import os
import sys
from typing import Dict
from dotenv import load_dotenv
import openai

from tools import math_tools, string_tools

load_dotenv()


SYSTEM_MSG = """You are an expert problem-solver with access to two tools:

1. calculator(expr): accepts a NUMERIC Python-style expression and returns a float.
   The math module is available (e.g. sqrt(x), pow(a,b)).
2. string_counter(kind, text): 
   - if kind == "vowels"  → return number of vowels in text
   - if kind == "letters" → return number of alphabetic letters in text

Follow these steps:
* Think step-by-step (chain-of-thought) to understand the query.
* Decide if a tool call is needed.
* Reply ONLY as JSON with keys:
    reasoning   – your chain-of-thought (string)
    tool        – "calculator", "string_counter", or "none"
    tool_input  – arguments for the tool (string or JSON)
    direct_answer – fill only when tool == "none"
"""
OPENAI_API_KEY = ""
MODEL = "gpt-4o-mini"

openai.api_key = OPENAI_API_KEY

def query_llm(user_query: str) -> Dict:
    chat = [
        {"role": "system", "content": SYSTEM_MSG},
        {"role": "user",   "content": user_query},
    ]
    resp = openai.chat.completions.create(model=MODEL, messages=chat, temperature=0)
    raw = resp.choices[0].message.content
    return json.loads(raw)


def run_tool(tool: str, tool_input):
    if tool == "calculator":
        result = math_tools.evaluate(tool_input)
    elif tool == "string_counter":
        if isinstance(tool_input, dict):
            # JSON style input
            kind = tool_input["kind"]
            text = tool_input["text"]
        elif isinstance(tool_input, str):
            # Try to parse as JSON first
            try:
                parsed_input = json.loads(tool_input)
                kind = parsed_input["kind"]
                text = parsed_input["text"]
            except (json.JSONDecodeError, KeyError):
                # Fall back to string splitting
                if "::" in tool_input:
                    kind, text = tool_input.split("::", 1)
                else:
                    # If no delimiter, assume it's the text and we need to infer from context
                    # For now, let's assume vowels as default
                    kind = "vowels"
                    text = tool_input
        else:
            raise ValueError(f"Invalid tool_input format: {type(tool_input)}")
            
        if kind == "vowels":
            result = string_tools.count_vowels(text)
        elif kind == "letters":
            result = string_tools.count_letters(text)
        else:
            raise ValueError(f"unknown string_counter kind '{kind}'")
    else:
        result = None
    return result


def main():
    if len(sys.argv) < 2:
        print("🛑  Provide a query as a command-line argument.")
        return
    user_query = sys.argv[1]
    llm_json = query_llm(user_query)

    reasoning = llm_json["reasoning"]
    tool      = llm_json["tool"]
    tool_input = llm_json["tool_input"]
    direct    = llm_json.get("direct_answer")

    if tool == "none":
        answer = direct
    else:
        result = run_tool(tool, tool_input)
        answer = result

    print("🤔 Reasoning:\n", reasoning)
    print(f"🧰 Tool used: {tool}")
    print("✅ Answer:", answer)


if __name__ == "__main__":
    main()
    # print(string_tools.count_vowels("Hello, world!"))
    # print(string_tools.count_letters("Hello, world!"))