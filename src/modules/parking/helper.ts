export const generateAlphabetSeries = (input: number) => {
  const series = [];
  let currentLetterCode = 65; // ASCII code for 'A'

  for (let i = 1; i <= input; i++) {
    const letter = String.fromCharCode(currentLetterCode);
    series.push(letter);

    currentLetterCode++;
    if (currentLetterCode > 90) {
      currentLetterCode = 65; // Reset to 'A' if it exceeds 'Z'
    }
  }

  return series;
};

export const generateSeries = (startLetter: string, input: number) => {
  const series = [];
  const startCharCode = startLetter.charCodeAt(0);
  for (let i = 1; i <= input; i++) {
    const letterIndex = Math.floor((i - 1) / 26);
    const letter = String.fromCharCode(startCharCode + letterIndex);
    const number = i % 26 === 0 ? 26 : i % 26;
    series.push(`${letter}${number}`);
  }

  return series;
};

export const VehicleTypeOfSection = {
  CAR: 'car',
  BIKE: 'bike',
};
