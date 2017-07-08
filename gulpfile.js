const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const newer = require('gulp-newer');
const notify = require('gulp-notify');

function onError(err) {
  notify.onError({
    title: 'Error',
    message: '<%= error %>',
  })(err);
  this.emit('end');
}

const plumberOptions = {
  errorHandler: onError,
};

const jsFiles = {
  vendor: [

  ],
  source: [
    'src/**/*.{js,jsx}',
  ],
};

gulp.task('eslint', () => gulp.src(jsFiles.source)
    .pipe(eslint({
      baseConfig: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

// Copy react.js to src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', () => gulp.src('node_modules/react/dist/react.js')
    .pipe(newer('src/vendor/react.js'))
    .pipe(gulp.dest('src/vendor')));

gulp.task('copy-babel-polyfill', function() {
  return gulp.src('node_modules/babel-polyfill/dist/polyfill.js')
    .pipe(newer('src/vendor/polyfill.js'))
    .pipe(gulp.dest('src/vendor'));
});

// Copy vendor/* to assets/js
gulp.task('copy-js-vendor', () => gulp
    .src([
      'src/vendor/react.js',
      'src/vendor/polyfill.js',
    ])
    .pipe(gulp.dest('lib')));

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react and eslint before concatenating
gulp.task('concat', ['eslint'], () => gulp.src(jsFiles.vendor.concat(jsFiles.source))
    .pipe(babel())
    // .pipe(concat('index.js'))
    .pipe(gulp.dest('lib')));

// Watch JSX files
gulp.task('watch', () => gulp.watch('src/**/*.{js,jsx}', ['concat']));

gulp.task('build', ['copy-js-vendor', 'concat']);
gulp.task('default', ['build', 'watch']);
