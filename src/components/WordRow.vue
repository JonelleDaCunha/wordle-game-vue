<template lang="">
  <div class="columns has-text-centered">
    <LetterBox
      v-for="(char, index) in word"
      :key="index"
      :char="char"
      :color="color[index]"
      class="column"
    ></LetterBox>
  </div>
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
import LetterBox from "@/components/LetterBox.vue";

export default defineComponent({
  name: "WordRow",
  components: {
    LetterBox,
  },
  props: {
    word: {
      type: String as PropType<string>,
      require: true,
      default: [],
    },
    color: {
      type: Array,

      default: [],
    },
  },
  setup(props) {
    // console.log(props.color);
  },
});
</script>
<style></style>
