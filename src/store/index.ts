import { Word } from '../models/word';

interface Action {
  payload: Word[];
  type: ActionType;
}

export interface State {
  words: Word[];
}

export enum ActionType {
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  SEARCH_WORD_SUCCESS = 'SEARCH_WORD_SUCCESS',
  SEARCH_WORD_FAILURE = 'SEARCH_WORD_FAILURE'
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_WORDS_SUCCESS":
      return {
        ...state,
        words: action.payload,
      };
    case "SEARCH_WORD_SUCCESS":
      return {
        ...state,
        words: [...state.words, ...action.payload],
      };
    case "SEARCH_WORD_FAILURE":
      return {
        ...state,
      };
    case "DELETE_WORD_SUCCESS":
      const deletedWordId = action.payload[0].id;
      return {
        ...state,
        words: state.words.filter((word) => word.id !== deletedWordId),
      };

    default:
      return state;
  }
};
