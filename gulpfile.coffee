gulp = require('gulp')
$ = require('gulp-load-plugins')()


gulp.task 'coffee', ->
	gulp.src ['src', 'public/app/**/*.coffee']
        .pipe $.plumber()
        .pipe $.ngClassify (file) ->
            if file.path.indexOf('admin') isnt -1  # use 'admin' as the appName if 'admin' is found in the file path
                { appName: 'admin' }
            else
                { appName: 'app' }
		.pipe $.coffee { bare: true }
		.pipe gulp.dest 'public/dest/app'
		

# gulp.task 'sass', ->
# 	gulp.src ['src', 'public/styles']
# 		.pipe $.rubySass { compass: true }
# 		.pipe gulp.dest 'public/dest/styles'
		
	
gulp.task 'jade', ->
    gulp.src 'public/index.jade'
        .pipe $.plumber()
        .pipe $.jade()
        .pipe gulp.dest 'public'
    gulp.src 'public/templates/jade/**/*.jade'
        .pipe $.jade()
        .pipe gulp.dest 'public/templates/html'


gulp.task 'templates', ->
    config =
        module: 'app'
        src: 'public/templates/html/**/*.html'
        dest: 'public/dest/app'

    gulp.src config.src
        .pipe $.angularTemplatecache
            module: config.module
            base: __dirname + '\\public'
        .pipe gulp.dest(config.dest)
  

gulp.task 'watch', ->
    gulp.watch 'public/app/**/*.coffee'         , ['coffee']
    gulp.watch 'public/templates/jade/**/*.jade', ['jade']
    gulp.watch 'public/index.jade'              , ['jade']
    gulp.watch 'public/templates/html/**/*.html', [ 'templates' ]     
    

gulp.task 'default', ['coffee', 'jade', 'templates']
