
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

const getMinutes = (timeInString) => {
  const [hours, minutes] = timeInString.split(':');
  return Number(hours) * 60 + Number(minutes);
};

const isMeetingAtWork = (startWork, endWork, startMeeting, timeMeeting) => {

  const endOfMeeting = getMinutes(startMeeting) + timeMeeting;
  const diffTimeStart = getMinutes(startMeeting) - getMinutes(startWork);
  const diffTimeEnd = getMinutes(endWork) - endOfMeeting;

  return (diffTimeStart >= 0 && diffTimeEnd >= 0);
};

extractNumber((2023)); // 2023
extractNumber((-1)); // 1
extractNumber((1.5)); // 15

isMeetingAtWork('08:00', '17:30', '14:00', 90); // true
isMeetingAtWork('8:0', '10:0', '8:0', 120); // true
isMeetingAtWork('08:00', '14:30', '14:00', 90); // false
isMeetingAtWork('14:00', '17:30', '08:0', 90); // false
isMeetingAtWork('8:00', '17:30', '08:00', 900); // false
