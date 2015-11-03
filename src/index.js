//do some es6 stuff
//
const arr = [1, 2, 3, 4];
const key = 'whatevs';

const bigObj = {
  key,
  ...arr.reduce((memo, num) => ({
    ...memo,
    [`num_${num}`]: num
  }), {})
};

console.log('I\'m a big OBJ %s', JSON.stringify(bigObj));
console.log('whatevs');
