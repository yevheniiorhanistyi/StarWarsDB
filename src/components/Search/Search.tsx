import { Component, ChangeEvent } from 'react';

import { ISearchProps } from '../../types/types';

import styles from './Search.module.scss';

class Search extends Component<ISearchProps> {
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const { onSearchChange } = this.props;
    onSearchChange(inputValue);
  };

  onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit();
  };

  render() {
    const { value } = this.props;
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.search__input}
            placeholder="Type to search"
            value={value}
            onChange={this.handleInputChange}
          />
          <button type="submit" className={styles.search__icon}>
            <span className={styles.search__span} />
          </button>
        </div>
      </form>
    );
  }
}

export default Search;
