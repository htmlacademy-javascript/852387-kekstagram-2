
const checkLengthString = (text, maxLehgth) => text.length <= maxLehgth;

checkLengthString('проверяемая строка', 20); // true
checkLengthString('проверяемая строка', 18); // true
checkLengthString('проверяемая строка', 10); // false


const checkPalindrome = (text) => {
  const normalizeText = text.replaceAll(' ', '').toLowerCase();
  const length = normalizeText.length;

  for (let i = 0; i < Math.ceil(length / 2); i++) {
    const lastIndex = length - 1;
    if (normalizeText[i] !== normalizeText[lastIndex - i]) {
      return false;
    }
  }
  return true;
};

checkPalindrome('топот');
checkPalindrome('довОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');


const extractNumber = (text) => {
  const normalizeText = String(text);
  let result = '';
  for (let i = 0; i < normalizeText.length; i++) {
    if (!isNaN(parseInt(normalizeText[i], 10))) {
      result += normalizeText[i];
    }
  }
  return parseInt(result, 10);
};

extractNumber((2023)); // 2023
extractNumber((-1)); // 1
extractNumber((1.5)); // 15
