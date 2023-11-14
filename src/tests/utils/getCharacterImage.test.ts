import { initialCharData } from '../../constats/constats';
import { getCharacterImage } from '../../utils';

vi.mock('./getNumberFromString', () => ({
  getNumberFromString: vi.fn().mockReturnValue(1),
}));

describe('getCharacterImage', () => {
  it('Generates the correct image path', () => {
    const imagePath = getCharacterImage(initialCharData);
    expect(imagePath).toBe('/characters/1.jpg');
  });
});
