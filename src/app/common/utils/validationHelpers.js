
export const limitToCharacters = (value) => {
  if (!value) return value;
  const maxLength = 50;
  if (value.length > maxLength) {
    return value.substring(0, maxLength);
  }
  return value;
};

export const validateRequiredField = (value, fieldName) => {
  if (value === null || value === undefined || value === '' || value === false) {
    return `${fieldName} is required`;
  }
  return null;
};

