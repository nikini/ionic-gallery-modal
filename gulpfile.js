const gulp = require('gulp');
const inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('inline-templates', function () {
    return gulp.src('dist/**/*.ts')
        .pipe(inlineNg2Template({
            useRelativePaths: true,
            indent: 0,
            removeLineBreaks: true,
        }))
        .pipe(gulp.dest('dist'));
});
