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

## Key Files
- `calc.sh`: Main executable script containing all logic
