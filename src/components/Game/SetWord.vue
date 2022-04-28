<template lang="">
  <div>Enter the word:</div>
  <!-- <Temp></Temp> -->
  <WordInput @enter="setWord" :password="true"></WordInput>
  <br />
  <span>{{ errorMessage }}</span>
</template>
<script lang="ts">
import {MutationTypes} from "@/store/word/mutations";
import {defineComponent} from "@vue/runtime-core";
import {useRouter} from "vue-router";
import {useStore} from "@/store";

import commonFunctions from "@/utils/commonFunctions";

import WordInput from "@/components/WordInput.vue";

export default defineComponent({
  name: "SetWord",
  components: {
    WordInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const setWord = (enteredWord: string) => {
      store.commit(MutationTypes.SET_WORD, enteredWord.toUpperCase());
      router.push({name: "GuessWord"});
    };
    return {
      setWord,
      commonFunctions,
    };
  },
});
</script>
<style lang=""></style>
