import React, { useReducer, useEffect } from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import Search from './components/search';
import Panel from './components/panel';
import { Word } from './models/word';
import DeleteButton from './components/delete-button';
import { reducer, ActionType, State } from './store/index';
import * as indexedDB from './assets/indexed-db';
import { handleErrors } from './utils/handle-error';

const App: React.FC = () => {
  const darkTheme = createMuiTheme({
    palette: {
      // Switching the dark mode on is a single property value change.
      type: 'dark'
    }
  });

  const initialState: State = {
    words: []
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchWords();
  }, []);

  const search = (word: string) => {
    const url = `https://dictionaryapi.herokuapp.com/?define=${word}`;
    fetch(url)
      .then((res) => handleErrors(res))
      .then((res) => res.json())
      .then((res) => res.shift())
      .then((res) => addWord(res as Word))
      .catch((e) => alert(e));
  };

  const fetchWords = () => {
    indexedDB.getAll().then((words: Word[]) =>
      dispatch({
        type: ActionType.FETCH_WORDS_SUCCESS,
        payload: words,
      })
    );
  };

  const addWord = (word: Word) => {
    indexedDB.add(word).then((result) => {
        dispatch({
          type: ActionType.SEARCH_WORD_SUCCESS,
        payload: [result],
      });
        });
  };

  const deleteWord = (word: Word) => {
    indexedDB.remove(word.id).then();
    dispatch({
      type: ActionType.DELETE_WORD_SUCCESS,
      payload: [word],
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Search search={search} />
        <div>
          {state.words.length > 0 &&
            state.words.map((word, index) => (
              <Panel word={word} key={`${index}-${word}`}>
                <DeleteButton word={word} deleteWord={deleteWord} />
              </Panel>
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
