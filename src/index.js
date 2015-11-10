import './index.html';
//import _ from 'lodash';
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

const h1 = $('h1');
console.log(h1);

console.log('I\'m a big OBJ %s', JSON.stringify(bigObj));
