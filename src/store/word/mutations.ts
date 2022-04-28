import {MutationTree} from "vuex";
import {State} from "./index";

export enum MutationTypes {
  SET_WORD = "SET_WORD",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_WORD](state: S, newWord: string[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_WORD](state, newWord) {
    state.setWord = newWord;
  },
};
