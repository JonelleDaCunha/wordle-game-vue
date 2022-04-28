<template>
  <Instructions></Instructions>
  <Settings> </Settings>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import Settings from "./Settings.vue";
import Instructions from "./Instructions.vue";

export default defineComponent({
  name: "SetWord",
  components: {
    Settings,
    Instructions,
  },
});
</script>
