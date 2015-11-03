import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import sequence from 'run-sequence';
import del from 'del';
import browserSync from 'browser-sync';

const isDev = process.argv.indexOf('watch') !== -1;
const plugins = loadPlugins();
const src = './src';
const dest = './dist';
const html = `${src}/*.html`;
const js = `${src}/*.js`;
const {reload} = browserSync;

gulp.task('clean', (cb) => {
  del([dest]).then((files) => {
    console.log(`Deleted ${files}`);
    cb();
  });
});

gulp.task('copy', () => {
  return gulp.src([html])
    .pipe(gulp.dest(dest))
    .pipe(reload({stream: true}));
});

gulp.task('es6', () => {
  return gulp.src([js])
    .pipe(plugins.babel())
    .pipe(gulp.dest(dest))
    .pipe(reload({stream: true}));
});

gulp.task('serve', (cb) => {
  browserSync({
    server: dest
  }, cb);
});

gulp.task('build', (cb) => {
  if (isDev) {
    sequence(
      'clean',
      ['copy', 'es6'],
      'serve',
      cb
    );
  } else {
    sequence(
      'clean',
      ['copy', 'es6'],
      cb
    );
  }
});

gulp.task('watch', ['build'], () => {
  gulp.watch(html, ['copy']);
  gulp.watch(js, ['es6']);
});
