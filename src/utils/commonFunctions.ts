import {base} from "@/api/base";

function isLetter(event: KeyboardEvent) {
  let char = event.key;
  // console.log(char);
  if (/^[A-Za-z]+$/.test(char)) return true;
  else event.preventDefault();
}

async function isValidWord(word: string): Promise<boolean> {
  let isValid: boolean = false;
  await base
    .get(word)
    .then((response) => {
      // console.log("resp " + response);
      isValid = true;
    })
    .catch((e) => {
      // console.log("error " + e);
      isValid = false;
    });
  // console.log("here");
  return isValid;
}
export default {
  isLetter,
  isValidWord,
};
