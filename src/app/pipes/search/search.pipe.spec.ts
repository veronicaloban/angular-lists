import { SearchPipe } from './search.pipe';

describe('SearchPipePipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe();

    expect(pipe).toBeTruthy();
  });

  it('should filter the given array with the string', () => {
    const pipe = new SearchPipe();

    const arrayOfObjects = [
      {
        name: 'item',
      },
      {
        name: '23',
      },
    ];

    expect(pipe.transform(arrayOfObjects, 'item')[0].name).toBe('item');
  });
});
