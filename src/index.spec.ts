
import func from './index';

test('Run tests', () => {
  expect(func([1, 2, 3, 4], function(n) {return n >= 3;})).toStrictEqual([3, 4]);
  expect(func([0, 1, 0, 1], function(n) {return n === 1;})).toStrictEqual([1, 0, 1]);
  expect(func([1, 2, 3], function(n) {return n > 0;})).toStrictEqual([1, 2, 3]);
  expect(func([1, 2, 3, 4], function(n) {return n > 5;})).toStrictEqual([]);
  expect(func([1, 2, 3, 7, 4], function(n) {return n > 3;})).toStrictEqual([7, 4]);
  expect(func([1, 2, 3, 9, 2], function(n) {return n > 2;})).toStrictEqual([3, 9, 2]);
});
