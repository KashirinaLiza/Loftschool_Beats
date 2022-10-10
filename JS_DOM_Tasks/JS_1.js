const string = "Привет! Как дела?";
const vowels = ["а", "А", "е", "Е","ё","Ё","и","И","о","О","у","У","ы","Ы","э","Э","ю","Ю","я","Я"]

const getVowels = stringFilter => {
  let extractedVowels = "";
  for (let i=0; i<stringFilter.length; i++) {
    const currentLetter = stringFilter[i];

    if (vowels.includes(currentLetter) !== -1) {
      extractedVowels += currentLetter;

    }

  }
  return extractedVowels;
}

console.log(getVowels(string));
