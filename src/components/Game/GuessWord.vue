<template lang="">
  <div>{{ formattedTime }}</div>
  <!-- <button @click="stopTimer">Stop Timer</button> -->
  <div class="columns">
    <div class="column">
      <div>Guess the word</div>
      <br />
      <br /><br />
      <WordRow :word="guessedWord"></WordRow>
      <WordInput
        @enter="guess"
        :button="'Guess!'"
        :disabled="disableInput"
      ></WordInput>
    </div>
    <div class="column">
      <WordRow
        v-for="(guess, index) in allGuesses"
        :key="index"
        :word="guess.word"
        :color="guess.color"
      ></WordRow>
    </div>
  </div>
</template>
<script lang="ts">
import WordRow from "@/components/WordRow.vue";
import WordInput from "@/components/WordInput.vue";
import {GuessWord, Options} from "@/types/types";
import commonFunctions from "@/utils/commonFunctions";
import {defineComponent, onMounted} from "@vue/runtime-core";
import {computed, Ref, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "@/store";
import moment from "moment";

export default defineComponent({
  name: "SetWord",
  components: {
    WordRow,
    WordInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const options: Options = store.getters.getOptions;
    const setWord: string = store.getters.getSetWord;

    const guessedWord: Ref<string> = ref("_");
    const currentGuess: Ref<string> = ref("");
    const allGuesses: Ref<GuessWord[]> = ref([]);

    console.log(options);
    const timer: Ref<number> = ref(options.timelimit);
    const formattedTime = computed(() =>
      moment.utc(timer.value * 1000).format("mm:ss")
    );
    let interval: number;
    const disableInput: Ref<boolean> = ref(false);

    function startTimer() {
      interval = setInterval(() => {
        if (timer.value === 0) {
          lostGame();
          // clearInterval(interval);
        } else {
          timer.value--;
          // console.log(moment.utc(timer.value * 1000).format("mm:ss"));
        }
      }, 1000);
    }
    const stopTimer = () => {
      // console.log("stop timer");
      clearInterval(interval);
    };

    const guess = async (value: string) => {
      value = value.toUpperCase();
      if (!options.duplicate) {
        if (allGuesses.value.find((guessWord, _) => guessWord.word == value))
          return;
      }
      let color: string[] = new Array(options.length).fill("white");
      let guessedLetters: number = 0;

      let temp: string[] | string = setWord.split("");
      for (let i = 0; i < options.length; i++) {
        if (setWord[i] == value[i]) {
          guessedWord.value =
            guessedWord.value.substring(0, i) +
            value[i] +
            guessedWord.value.substring(i + 1);
          color[i] = "green";
          temp[i] = "";
          guessedLetters++;
        }
      }
      temp = temp.join("");
      console.log(temp);
      let index: number;
      for (let i = 0; i < options.length; i++) {
        if (color[i] != "green") {
          index = temp.indexOf(value[i]);
          if (index > -1) {
            color[i] = "yellow";
            temp = temp.substring(0, index) + " " + temp.substring(index + 1);
            console.log(temp);
          }
        }
      }

      // console.log(color);
      // allGuesses.value.push({word: value, color: color});
      allGuesses.value.unshift({word: value, color: color});

      // currentGuess.value = "";

      if (guessedLetters == options.length) {
        wonGame();
      }
    };

    function wonGame() {
      disableInput.value = true;
      stopTimer();
    }
    function lostGame() {
      if (options.endOnTimeout) disableInput.value = true;
      stopTimer();
    }

    onMounted(() => {
      guessedWord.value = guessedWord.value.repeat(options.length);
      startTimer();
    });
    return {
      setWord,
      currentGuess,
      guess,
      allGuesses,
      guessedWord,
      timer,
      commonFunctions,
      stopTimer,
      formattedTime,
      disableInput,
    };
  },
});
</script>
<style lang=""></style>
