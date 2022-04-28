<template>
  <div>
    <Navbar></Navbar>
    <div class="container mt-6"><router-view /></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {Navbar},
  setup() {
    onMounted(() => {
      window.addEventListener("keypress", (e) => {});
    });
  },
});
</script>

<style></style>
