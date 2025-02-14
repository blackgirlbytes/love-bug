// validateCode.js
export const validateCode = async (bugId, submittedCode) => {
  try {
    if (bugId === 5) { // Valentine's Gift List
      // First check: Make sure they're not using push
      if (submittedCode.includes('.push(')) {
        return {
          isValid: false,
          message: "Try not to modify the original array - use spread operator or create a new array instead"
        };
      }

      // Second check: Make sure they're using spread operator or creating a new array
      if (!submittedCode.includes('[...') && !submittedCode.includes('concat')) {
        return {
          isValid: false,
          message: "Hint: Use the spread operator [...] or Array.concat() to create a new array"
        };
      }

      return {
        isValid: true,
        message: "Success! The function creates a new array without modifying the original"
      };
    }

    return {
      isValid: false,
      message: "Unknown bug ID"
    };
  } catch (error) {
    return {
      isValid: false,
      message: "Error executing code: " + error.message
    };
  }
};