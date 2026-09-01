# 2726. Calculator with Method Chaining

**Difficulty**: Easy
**Topics**: JavaScript, Object-Oriented Programming, Class


---


## Problem Statement

Design a `Calculator` class. The class should provide the mathematical operations of addition, subtraction, multiplication, division, and exponentiation. It should also allow consecutive operations to be performed using method chaining. The `Calculator` class constructor should accept a number which serves as the initial value of `result`.

Your `Calculator` class should have the following methods:

- `add(value)`: adds `value` to `result` and returns updated `Calculator`.
- `subtract(value)`: subtracts `value` from `result` and returns updated `Calculator`.
- `multiply(value)`: multiplies `result` by `value` and returns updated `Calculator`.
- `divide(value)`: divides `result` by `value` and returns updated `Calculator`. If `value === 0`, throw an error `"Division by zero is not allowed"`.
- `power(value)`: raises `result` to the power of `value` and returns updated `Calculator`.
- `getResult()`: returns the result.


---


## Examples

### Example 1:

- **Input**: `actions = ["Calculator", "add", "subtract", "getResult"], values = [10, 5, 7]`
- **Output**: `8`
- **Explanation**: `new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8`

### Example 2:

- **Input**: `actions = ["Calculator", "multiply", "power", "getResult"], values = [2, 5, 2]`
- **Output**: `100`
- **Explanation**: `new Calculator(2).multiply(5).power(2).getResult() // (2 * 5) ^ 2 = 100`

### Example 3:

- **Input**: `actions = ["Calculator", "divide", "getResult"], values = [20, 0]`
- **Output**: `"Division by zero is not allowed"`
- **Explanation**: `new Calculator(20).divide(0) // Error thrown`


---


## Constraints

- `actions` is a valid JSON string array
- `values` is a valid JSON number array
- `2 <= actions.length <= 20`
- `1 <= values.length <= 20`
- `-100 <= value <= 100`
- `-100 <= init <= 100`


---


## Complexity

- **Time Complexity**: O(1) for each method call
- **Space Complexity**: O(1)


---


## Solution

- [solution.ts](./solution.ts)
- [solution.test.ts](./solution.test.ts)
