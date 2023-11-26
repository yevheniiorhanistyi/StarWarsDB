import { ChangeEvent, useState } from 'react';

import { ISearchInputProps } from '../../types/types';

import styles from './SearchInput.module.scss';

const SearchInput: React.FC<ISearchInputProps> = ({ term, handleSubmit }) => {
  const [inputValue, setInputValue] = useState(term);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleSubmit(inputValue);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Type to search"
          value={inputValue}
          onChange={onSearchChange}
        />
        <button type="submit" name="submit" className={styles.search__icon}>
          <span className={styles.search__span} />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
