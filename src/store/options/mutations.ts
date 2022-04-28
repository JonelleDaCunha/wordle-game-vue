import {Options} from "@/types/types";
import {MutationTree} from "vuex";
import options, {State} from "./index";

export enum MutationTypes {
  SET_OPTIONS = "SET_OPTIONS",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_OPTIONS](state: S, options: Options): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_OPTIONS](state, options) {
    state.setOptions = options;
  },
};
