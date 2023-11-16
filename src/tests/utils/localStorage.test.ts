import { saveToLocalStorage, getFromLocalStorage } from '../../utils';

describe('localStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('saveToLocalStorage stores value in localStorage', () => {
    const key = 'test';
    const value = 'abcxyz';
    saveToLocalStorage(key, value);
    expect(localStorage.getItem('test')).toBe(value);
  });
  it('getFromLocalStorage retrieves value from localStorage', () => {
    const key = 'test';
    const value = 'abcxyz';
    localStorage.setItem(key, value);
    expect(getFromLocalStorage(key)).toBe(value);
  });
  it('getFromLocalStorage returns null if value is not in localStorage', () => {
    const key = 'abc';
    expect(getFromLocalStorage(key)).toBeNull();
  });
});
