import re

_VOWELS = set("aeiouAEIOU")

def count_vowels(text: str) -> int:
    return sum(c in _VOWELS for c in text)

def count_letters(text: str) -> int:
    return len(re.findall(r"[A-Za-z]", text))
