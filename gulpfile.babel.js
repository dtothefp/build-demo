import gulp from 'gulp';
import {intersection} from 'lodash';
import loadPlugins from 'gulp-load-plugins';
import sequence from 'run-sequence';
import del from 'del';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import makeWebpackConfig from './gulp/webpack';

const devTasks = ['serve', 'watch'];
const isDev = intersection(process.argv, devTasks).length > 0;
const plugins = loadPlugins();
const src = './src';
const dest = './dist';
const html = `${src}/*.html`;
const js = `${src}/*.js`;
const {reload} = browserSync;

gulp.task('webpack', (cb) => {
  const config = makeWebpackConfig({isDev, src, dest});
  const compiler = webpack(config);

  if (!isDev) {
    compiler.run((err, stats) => {
      //stats.toString();
      // log stats here
    });
  } else {
    // builds the bundle and watches for changes
    // updates after this will be very fast
    compiler.watch({ // watch options:
      aggregateTimeout: 300,
      poll: true
    }, (err, stats) => {
      stats.toString();
      // log stats here
    });
  }

  compiler.plugin('done', (stats) => {
    console.log('DONE');

    if (cb) {
      const gulpCb = cb;
      cb = null;
      gulpCb();
    } else {
      reload();
    }

  });
});

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

gulp.task('serve', ['webpack'], (cb) => {
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
