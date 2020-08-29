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
      }).catch(e => alert(e))
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Search search={search} />
        <div>
          {state.words.length > 0 &&
            state.words.map((word, index) => (
              <Panel word={word} key={`${index}-${word}`}>
                <DeleteButton id={word.id} />
              </Panel>
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
