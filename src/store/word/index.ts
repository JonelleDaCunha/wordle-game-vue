import {mutations, Mutations} from "./mutations";
import {Getters, getters} from "./getters";
import {Store as VuexStore, CommitOptions, Module} from "vuex";
import type {State as RootState} from "@/store";

interface State {
  setWord: string[];
}
const state: State = {
  setWord: [],
};

const word: Module<State, RootState> = {
  state,
  mutations,
  getters,
};

export {State, Store};
export default word;

type Store<S = State> = Omit<VuexStore<S>, "commit" | "getters"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
