export type GuessWord = {
  word: string;
  color: string[];
};

export type Options = {
  length: number;
  timelimit: number;
  duplicate: boolean;
  endOnTimeout: boolean;
};
