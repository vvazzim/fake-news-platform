// Désactiver tous les avertissements React
const suppressedWarnings = ["defaultProps will be removed", "Cannot read properties of undefined"];

const originalWarn = console.warn;
console.warn = (message, ...args) => {
  if (!suppressedWarnings.some((warning) => message.includes(warning))) {
    originalWarn(message, ...args);
  }
};

// Désactiver les erreurs si nécessaire
const originalError = console.error;
console.error = (message, ...args) => {
  if (!suppressedWarnings.some((warning) => message.includes(warning))) {
    originalError(message, ...args);
  }
};
