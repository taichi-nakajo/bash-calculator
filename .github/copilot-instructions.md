# Copilot Instructions

## Project Overview
This is a simple bash calculator script (`calc.sh`) that performs basic arithmetic operations via command-line arguments.

## Architecture & Core Patterns

### Script Structure
- Single executable bash script following standard shebang conventions
- Three-argument validation pattern: `operator num1 num2`
- Case-based operation dispatch with comprehensive error handling

### Error Handling Convention
- **Consistent error output**: Always echo "error" for any invalid input
- **Exit code 1**: Used for all error conditions (invalid args, division by zero, unknown operators)
- **Zero division protection**: Explicit check in division case before calculation

### Supported Operations
- Addition (`+`), Subtraction (`-`), Multiplication (`*`), Division (`/`)
- Uses bash arithmetic expansion `$((...))` for calculations
- Division performs integer division (bash default behavior)

## Development Patterns

### Input Validation
```bash
# Standard pattern used in this project
if [ $# -ne 3 ]; then
    echo "error"
    exit 1
fi
```

### Operation Dispatch
```bash
# Case statement with consistent result assignment
case $operator in
    "+")
        result=$((num1 + num2))
        ;;
    # ... other operations
    *)
        echo "error"
        exit 1
        ;;
esac
```

### Variable Naming Convention
- `operator`: First argument (operation symbol)
- `num1`, `num2`: Numeric operands
- `result`: Calculated output value

## Testing & Usage
- Execute with: `./calc.sh <operator> <num1> <num2>`
- Example: `./calc.sh + 5 3` outputs `8`
- Invalid inputs return "error" and exit code 1

## Git Workflow & Commit Guidelines

### Commit Message Format
Follow conventional commit format for consistency:
```
<type>: <description>

[optional body]
```

### Common commit types for this project:
- `feat`: New calculator operations or features
- `fix`: Bug fixes in calculations or error handling
- `refactor`: Code improvements without changing functionality
- `docs`: Documentation updates (including this file)
- `test`: Adding or updating tests

### Example commit messages:
```bash
git commit -m "feat: Add modulo operation support

- Add '%' operator to case statement
- Include zero division check for modulo
- Update usage examples"

git commit -m "fix: Handle negative numbers in division"

git commit -m "docs: Update copilot instructions with new patterns"
```

### Before committing:
1. Test the script with various inputs: `./calc.sh + 5 3`
2. Verify error cases: `./calc.sh / 5 0`
3. Check script permissions: `chmod +x calc.sh`

## Code Quality & Standards

### Bash Scripting Standards
- Use consistent variable naming (`operator`, `num1`, `num2`, `result`)
- Always quote variables in conditionals: `[ "$num2" -eq 0 ]`
- Maintain the error output pattern: `echo "error"; exit 1`
- Use arithmetic expansion: `$((...))`for calculations

### Future Coding Rules
<!-- Add project-specific coding standards here as they develop -->
- Code formatting guidelines
- Function naming conventions  
- Documentation requirements
- Performance considerations

## Development Workflow

### Testing the Calculator
```bash
# Basic operations
./calc.sh + 10 5    # Expected: 15
./calc.sh - 10 5    # Expected: 5
./calc.sh \* 10 5   # Expected: 50 (note: escape * in shell)
./calc.sh / 10 5    # Expected: 2

# Error cases
./calc.sh / 10 0    # Expected: error
./calc.sh ^ 10 5    # Expected: error
./calc.sh + 10      # Expected: error
```

### Adding New Operations
1. Add new case to the switch statement in `calc.sh`
2. Include appropriate error handling
3. Test with multiple inputs
4. Update this documentation
5. Commit with descriptive message

## Key Files
- `calc.sh`: Main executable script containing all logic
