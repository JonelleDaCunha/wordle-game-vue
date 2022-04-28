<template lang="">
  <div class="field has-addons">
    <div class="control" :class="{'is-loading is-large': isLoading}">
      <input
        v-if="password"
        type="password"
        name="enteredWord"
        ref="inputRef"
        v-model="enteredWord"
        class="input is-large"
        :maxlength="options.length"
        v-on:keydown.enter="enter"
        v-on:keydown="commonFunctions.isLetter"
        autocomplete="off"
        :disabled="disabled"
      />
      <input
        v-else
        type="text"
        name="enteredWord"
        ref="inputRef"
        v-model="enteredWord"
        class="input is-large is-uppercase"
        :maxlength="options.length"
        v-on:keydown.enter="enter"
        v-on:keydown="commonFunctions.isLetter"
        autocomplete="off"
        :disabled="disabled"
      />
    </div>
    <div class="control">
      <button
        v-on:click="enter"
        class="button is-primary is-large"
        :class="{'is-loading': isLoading}"
      >
        {{ button }}
      </button>
    </div>
  </div>

  <!-- <div>{{ isLoading }}</div> -->
  <p v-for="error of validations.$silentErrors" :key="error.$uid">
    <strong>{{ error.$message }}</strong>
  </p>
  <br />
</template>
<script lang="ts">
import {defineComponent} from "@vue/runtime-core";

import {computed, nextTick, onMounted, PropType, Ref, ref} from "vue";
import commonFunctions from "@/utils/commonFunctions";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {store} from "@/store";
import {Options} from "@/types/types";

export default defineComponent({
  name: "WordInput",
  components: {},
  props: {
    button: {
      type: String as PropType<string>,
      default: "Enter",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    password: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },

  setup(props, ctx) {
    const {withAsync, withMessage} = helpers;
    const enteredWord: Ref<string> = ref("");
    const inputRef = ref<HTMLInputElement | null>(null);
    const options: Options = store.getters.getOptions;

    let isLoading: Ref<boolean> = ref(false);
    onMounted(() => {
      nextTick(() => {
        // console.log(inputRef.value);
        inputRef.value?.focus();
      });
    });

    async function enter() {
      const isFormCorrect = await validations.value.$invalid;
      if (!isFormCorrect && !validations.value.$pending) {
        ctx.emit("enter", enteredWord.value);
        enteredWord.value = "";
      }
    }

    //validation code
    async function isWord(value: string): Promise<string | boolean> {
      if (enteredWord.value.length == options.length) {
        isLoading.value = true;
        let isWord = await commonFunctions.isValidWord(value);
        isLoading.value = false;
        if (isWord) {
          return true;
        }
      }

      return false;
    }

    const rules = computed(() => ({
      enteredWord: {
        required,
        minLength: minLength(options.length),
        maxLength: maxLength(options.length),
        asyncValidator: withMessage(
          "This is not a valid word",
          withAsync(isWord)
        ),
      },
    }));
    const validations = useVuelidate(rules, {enteredWord});

    return {
      enteredWord,
      validations,
      enter,
      inputRef,
      commonFunctions,
      isLoading,
      options,
    };
  },
});
</script>

<style lang=""></style>
