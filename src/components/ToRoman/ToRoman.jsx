const ToRoman = (num) => {
  const romanNumerals = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M",
  ];
  const arabicNumerals = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

  let result = "";

  for (let i = arabicNumerals.length - 1; i >= 0; i--) {
    while (num >= arabicNumerals[i]) {
      result += romanNumerals[i];
      num -= arabicNumerals[i];
    }
  }

  return result;
};

export default ToRoman;
