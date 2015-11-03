import path from 'path';
import fs from 'fs-extra';

export default function() {
  const src = path.join(process.cwd(), 'src/index.html');
  const dest = path.join(process.cwd(), 'dist/index.html');

  fs.copy(src, dest, (err) => {
    if (err) return console.error(err)
      console.log('success!')
  });
}
