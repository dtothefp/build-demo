import {sync} from 'del';

export default function() {
  sync(['dist']);
}
