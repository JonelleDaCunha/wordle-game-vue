<template lang="">
  <div :style="{'background-color': color}">
    <p class="title box is-square">{{ char }}</p>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "LetterBox",
  props: {
    char: {
      type: String,
      require: true,
      default: "",
    },
    color: {
      type: String,
      require: false,
      default: "white",
    },
  },
  setup(props) {},
});
</script>
<style>
.box {
}
</style>
