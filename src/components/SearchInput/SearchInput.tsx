import { ChangeEvent } from 'react';

import { ISearchInputProps } from '../../types/types';

import styles from './SearchInput.module.scss';

const SearchInput: React.FC<ISearchInputProps> = ({ value, handleSubmit, onSearchChange }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onSearchChange(inputValue);
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Type to search"
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.search__icon}>
          <span className={styles.search__span} />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
