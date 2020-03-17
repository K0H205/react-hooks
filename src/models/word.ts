export interface Word {
  word: string;
  meaning: { [key: string]: Definition[] };
  id: number;
}

export interface Definition {
  definition: string;
}
