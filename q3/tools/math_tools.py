# Math utility functions
import math

def add(a, b):
    """Add two numbers"""
    return a + b

def subtract(a, b):
    """Subtract two numbers"""
    return a - b

def multiply(a, b):
    """Multiply two numbers"""
    return a * b

def divide(a, b):
    """Divide two numbers"""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b 

def power(a, b):
    """Raise a to the power of b"""
    return a ** b

def evaluate(expr: str) -> float:
    """
    Evaluate a mathematical expression string.
    The math module is available for functions like sqrt, pow, etc.
    """
    # Create a safe namespace with math functions
    safe_dict = {
        "__builtins__": {},
        "abs": abs,
        "round": round,
        "min": min,
        "max": max,
        "sum": sum,
        # Math module functions
        "sqrt": math.sqrt,
        "pow": math.pow,
        "sin": math.sin,
        "cos": math.cos,
        "tan": math.tan,
        "log": math.log,
        "log10": math.log10,
        "exp": math.exp,
        "pi": math.pi,
        "e": math.e,
        "ceil": math.ceil,
        "floor": math.floor,
        "fabs": math.fabs,
        "factorial": math.factorial,
        # Basic operators are handled by eval itself
    }
    
    try:
        result = eval(expr, safe_dict)
        return float(result)
    except Exception as e:
        raise ValueError(f"Invalid mathematical expression: {expr}. Error: {str(e)}")


