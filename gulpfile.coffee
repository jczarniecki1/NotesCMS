require('./bundles')

gulp = require('gulp')
path = require('path')
$ = require('gulp-load-plugins')()


gulp.task 'coffee', ->
	return gulp.src ['public/app/**/*.coffee']
        .pipe $.plumber()
        .pipe $.ngClassify (file) ->
            if file.path.indexOf('admin') isnt -1
                { appName: 'admin' }
            else
                { appName: 'app' }
		.pipe $.coffee { bare: true }
		.pipe gulp.dest 'public/dest/app'


gulp.task 'build-server', ->
	return gulp.src ['server.coffee']
		.pipe $.coffee { bare: true }
		.pipe gulp.dest '.'


gulp.task 'sass', ->
	return gulp.src 'public/styles/**/*.scss'
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
            base: path.normalize(__dirname + '/public')
        .pipe gulp.dest 'public/dest/app'


gulp.task 'watch', ->
    gulp.watch 'server.coffee'             , ['build-server']
    gulp.watch 'public/app/**/*.coffee'    , ['coffee', 'bundle-scripts']
    gulp.watch 'public/templates/**/*.jade', ['jade', 'bundle-scripts']
    gulp.watch 'public/index.jade'         , ['jade']
    gulp.watch 'public/styles/**/*.scss'   , ['sass', 'bundle-styles']


gulp.task 'default', ['bundle', 'build-server']
