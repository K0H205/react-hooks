import React, { useReducer, useEffect } from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import Search from './components/search';
import Panel from './components/panel';
import { Word } from './models/word';
import { reducer, ActionType, State } from './store/index';
import * as indexedDB from './assets/indexed-db';

const handleErrors = (res: Response) => {
  if (res.ok) {
    return res;
  }

  switch (res.status) {
    case 400:
      throw Error('INVALID_TOKEN');
    case 401:
      throw Error('UNAUTHORIZED');
    case 500:
      throw Error('INTERNAL_SERVER_ERROR');
    case 502:
      throw Error('BAD_GATEWAY');
    case 404:
      throw Error('NOT_FOUND');
    default:
      throw Error('UNHANDLED_ERROR');
  }
};

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
    indexedDB.getAll().then((data: Word[]) =>
      dispatch({
        type: ActionType.FETCH_WORDS_SUCCESS,
        payload: data
      })
    );
  }, []);

  const search = (word: string) => {
    const url = `https://dictionaryapi.herokuapp.com/?define=${word}`;
    fetch(url)
      .then(result => handleErrors(result))
      .then(response => response.json())
      .then(res => res.shift())
      .then((data: Word) => {
        indexedDB.add(data).then();
        dispatch({
          type: ActionType.SEARCH_WORD_SUCCESS,
          payload: [data]
        });
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Search search={search} />
        <div>
          {state.words.length > 0 &&
            state.words.map((word, index) => (
              <Panel word={word} key={`${index}-${word}`} />
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
