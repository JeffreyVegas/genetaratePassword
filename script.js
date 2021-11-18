const FormValues = document.getElementById("formValues");
const password = document.getElementById("result");
FormValues.addEventListener("submit", getValues);

let optionsPassword = {};

function getValues(e) {
  e.preventDefault();
  const numCharacters = document.getElementById("numCharacters");
  const minusculas = document.getElementById("CheckMinusculas");
  const mayusculas = document.getElementById("CheckMayusculas");
  const specialCharacters = document.getElementById("CheckCharacters");
  optionsPassword = {
    ncharacters: parseInt(numCharacters.value),
    typeCharacter: [
      minusculas.checked ? 1 : 0,
      mayusculas.checked ? 2 : 0,
      specialCharacters.checked ? 3 : 0,
    ],
  };
  GeneratePassword(optionsPassword);
}

function GeneratePassword(options) {
  const selectedOptions = options.typeCharacter.filter((el) => el > 0);
  let newPasword = "";
  let numRandom;
  switch (selectedOptions.length) {
    case 1:
      //  one option
      newPasword = randomCharacter(options.ncharacters, selectedOptions[0]);
      password.textContent = newPasword;
      break;
    case 2:
      // two Options
      numRandom = sumOfNumTwo(options.ncharacters);
      newPasword = messupString(
        randomCharacter(numRandom[0], selectedOptions[0]) +
          randomCharacter(numRandom[1], selectedOptions[1])
      );
      password.textContent = newPasword;
      break;
    case 3:
      //three
      numRandom = sumOfNum(options.ncharacters);
      numRandom.forEach((el, index) => {
        newPasword += randomCharacter(el, selectedOptions[index]);
      });
      password.textContent = messupString(newPasword);
      break;
    default:
      console.log("aah");
      break;
  }
}

function randomCharacter(n, type) {
  const abc = "abcdefghijklmnñopqrstuvwxyz";
  const ABC = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  const charters = "!#$%&'()*+-/:;=?@";

  let result = "";
  for (let i = 0; i < n; i++) {
    if (type == 1) {
      const random = parseInt(Math.random() * abc.length);
      result += abc[random];
    }
    if (type == 2) {
      const random = parseInt(Math.random() * ABC.length);
      result += ABC[random];
    }
    if (type == 3) {
      const random = parseInt(Math.random() * charters.length);
      result += charters[random];
    }
  }
  return result;
}

function messupString(str) {
  const arr = str.split("").sort(() => Math.random() - 0.5);
  let result = "";
  arr.forEach((a) => {
    result += a;
  });
  return result;
}

function sumOfNum(num) {
  let n1 = parseInt(Math.random() * num);
  n1 = n1 == 0 || n1 == num - 1 ? 2 : n1;
  const n2 = parseInt((num - n1) / 2);
  const n3 = num - (n1 + n2);
  return [n1, n2, n3];
}

function sumOfNumTwo(num) {
  const limit = parseInt(num * 0.8);
  const num1 = getRandomInt(2, limit);
  const num2 = num - num1;
  return [num1, num2];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// sumOfNum(20);
/* 
  HOla como ya o no AHora siento la velocidad de no tener esa mierda.
 */
