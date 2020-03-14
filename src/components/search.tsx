import React, { useState } from 'react';

import SearchIcon from '@material-ui/icons/Search';

const Search: React.FC<{ search: (word: string) => void }> = props => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChanges = (e: any) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction = (e: any) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <div className="header">
      <div className="title">Defenition List</div>
      <form className="search">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
          placeholder="Add Word…"
        />
        <button onClick={callSearchFunction}>
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default Search;
