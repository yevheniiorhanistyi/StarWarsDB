import { ChangeEvent } from 'react';

import { useSearchInput } from '../SearchInputProvider/SearchInputProvider';
import { ISearchInputProps } from '../../types/types';

import styles from './SearchInput.module.scss';

const SearchInput: React.FC<ISearchInputProps> = ({ handleSubmit, onSearchChange }) => {
  const { inputValue } = useSearchInput();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onSearchChange(value);
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
          value={inputValue}
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
