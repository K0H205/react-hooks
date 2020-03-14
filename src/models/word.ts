export interface Word {
  word: string;
  meaning: { [key: string]: Definition[] };
}

export interface Definition {
  definition: string;
}
