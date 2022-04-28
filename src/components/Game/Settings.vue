<template lang="">
  <div class="card has-text-centered">
    <header class="card-header">
      <p class="card-header-title has-background-primary">Options</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column">
            <div class="field has-addons">
              <div class="control">
                <button class="button is-static">Word Length</button>
              </div>
              <div class="control">
                <input
                  id="wordLengthOption"
                  type="number"
                  name="wordLengthOption"
                  class="input is-rtl"
                  v-model="options.length"
                />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field has-addons">
              <div class="control">
                <button class="button is-static">Timelimit Option</button>
              </div>
              <div class="control">
                <!-- <input
                  id="timelimitOption"
                  type="time"
                  name="timelimitOption"
                  class="input time is-rtl"`  
                /> -->

                <Datepicker
                  v-model="date"
                  timePicker
                  :format="'HH:mm:ss'"
                  enableSeconds
                  :minTime="{seconds: 30}"
                  :maxTime="{minutes: 10}"
                ></Datepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <input
                id="duplicateOption"
                type="checkbox"
                name="duplicateOption"
                class="switch is-rtl"
                v-model="options.duplicate"
              />
              <label for="duplicateOption">Allow Duplicate Guesses</label>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <input
                id="timeoutOption"
                type="checkbox"
                name="timeoutOption"
                class="switch is-rtl"
                v-model="options.endOnTimeout"
              />
              <label for="timeoutOption">End Game on Timeout</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <button
        v-on:click="setOptions"
        class="button is-primary card-footer-item"
      >
        Start Game
      </button>
      <!-- <router-link :to="{name: 'SetWord'}" class="card-footer-item"
        >Start Game</router-link
      > -->
    </footer>
  </div>
</template>
<script lang="ts">
import {computed, defineAsyncComponent, defineComponent, Ref, ref} from "vue";
import Calendar from "bulma-calendar/dist/components/vue/bulma_calendar.vue";
import Datepicker from "@vuepic/vue-datepicker";
import {Options} from "@/types/types";
import {useStore} from "@/store";
import {MutationTypes} from "@/store/options/mutations";
import router from "@/router";

export default defineComponent({
  components: {
    Calendar,
    Datepicker,
  },
  setup() {
    const store = useStore();
    // const filters = computed(() => {
    //   return {
    //     times: {
    //       hours: Array.from(Array(24).keys()), // disable specific hours
    //     },
    //   };
    // });
    const options: Ref<Options> = ref({
      length: 4,
      timelimit: 3 * 60,
      duplicate: false,
      endOnTimeout: true,
    });
    const date = ref({
      hours: 0,
      minutes: 0,
      seconds: options.value.timelimit,
    });
    // function updateDate() {
    //   console.log("uodates tome");
    //   options.value.timelimit = date.value.minutes * 60 + date.value.seconds;
    // }

    function setOptions() {
      options.value.timelimit = date.value.minutes * 60 + date.value.seconds;
      console.log(options.value.timelimit);

      store.commit(MutationTypes.SET_OPTIONS, options);
      router.push({name: "SetWord"});
    }
    return {
      date,
      options,
      setOptions,
      // filters,
    };
  },
});
</script>
