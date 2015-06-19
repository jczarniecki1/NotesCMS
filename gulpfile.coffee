gulp = require('gulp')
$ = require('gulp-load-plugins')()


gulp.task 'coffee', ->
	gulp.src ['src', 'public/app/**/*.coffee']
        .pipe $.plumber()
        .pipe $.ngClassify (file) ->
            if file.path.indexOf('admin') isnt -1
                { appName: 'admin' }
            else
                { appName: 'app' }
		.pipe $.coffee { bare: true }
		.pipe gulp.dest 'public/dest/app'


gulp.task 'sass', ->
	gulp.src 'public/styles/**/*.scss'
		.pipe $.sass(errLogToConsole: true, outputStyle: 'compressed').on 'error', $.sass.logError
        #.pipe autoprefixer browsers ['last 2 versions']
		.pipe gulp.dest 'public/dest/styles'


gulp.task 'jade', ->
    gulp.src 'public/index.jade'
        .pipe $.plumber()
        .pipe $.jade()
        .pipe gulp.dest 'public'
    gulp.src 'public/templates/**/*.jade'
        .pipe $.jade()
        .pipe $.angularTemplatecache
            module: 'app'
            base: __dirname + '\\public'
        .pipe gulp.dest 'public/dest/app'


gulp.task 'watch', ->
    gulp.watch 'public/app/**/*.coffee'    , ['coffee']
    gulp.watch 'public/templates/**/*.jade', ['jade']
    gulp.watch 'public/index.jade'         , ['jade']
    gulp.watch 'public/styles/**/*.scss'   , ['sass']


gulp.task 'default', ['coffee', 'jade', 'sass']
