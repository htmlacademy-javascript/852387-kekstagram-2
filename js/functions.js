
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

const isMeetingAtWork = (startOfWork, endOfWork, startOfMeeting, timeMeeting) => {
  const [hoursStart, minutesStart] = startOfWork.split(':');
  const [hoursEnd, minutesEnd] = endOfWork.split(':');
  const [hoursMeet, minutesMeet] = startOfMeeting.split(':');

  const startOfMeetingInMinutes = Number(hoursMeet) * 60 + Number(minutesMeet);
  const startOfWorkInMinutes = Number(hoursStart) * 60 + Number(minutesStart);
  const endOfWorkInMinutes = Number(hoursEnd) * 60 + Number(minutesEnd);

  const diffHoursStart = startOfMeetingInMinutes - startOfWorkInMinutes;

  const diffHoursEnd = endOfWorkInMinutes - (startOfMeetingInMinutes + timeMeeting);
  return (diffHoursStart >= 0 && diffHoursEnd >= 0);
};

extractNumber((2023)); // 2023
extractNumber((-1)); // 1
extractNumber((1.5)); // 15

isMeetingAtWork('08:00', '17:30', '14:00', 90); // true
isMeetingAtWork('8:0', '10:0', '8:0', 120); // true
isMeetingAtWork('08:00', '14:30', '14:00', 90); // false
isMeetingAtWork('14:00', '17:30', '08:0', 90); // false
isMeetingAtWork('8:00', '17:30', '08:00', 900); // false
