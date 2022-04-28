import {InjectionKey} from "vue";
import {createStore, useStore as baseUseStore, Store} from "vuex";
import word, {State as WordState, Store as WordStore} from "./word";
import options, {State as OptionState, Store as OptionStore} from "./options";
export interface State {
  word: WordState;
}
export type RootStore = WordStore<Pick<State, "word">>;

export const key: InjectionKey<Store<State>> = Symbol("store");

export const store = createStore<State>({
  modules: {
    word,
    options,
  },
});

export function useStore() {
  return baseUseStore(key);
}
