export default function capitalizeFirstLetter(inputString: string) :string{
    // Check if the input string is not empty
    if (inputString.length === 0) {
      return inputString; // Return the empty string as is
    }
  
    // Convert the first letter to uppercase and the rest to lowercase
    const resultString = inputString.charAt(0).toUpperCase() + inputString.substring(1).toLowerCase();
  
    return resultString;
  }