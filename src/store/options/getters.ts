import {GetterTree} from "vuex";
import {State} from "./index";
import type {State as RootState} from "@/store";
import {Options} from "@/types/types";

export type Getters<S = State> = {
  getOptions(state: S): Options;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getOptions: (state) => {
    return state.setOptions;
  },
};
