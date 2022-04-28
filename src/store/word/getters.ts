import {GetterTree} from "vuex";
import {State} from "./index";
import type {State as RootState} from "@/store";

export type Getters<S = State> = {
  getSetWord(state: S): string[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  getSetWord: (state) => {
    return state.setWord;
  },
};
