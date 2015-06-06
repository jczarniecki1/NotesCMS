gulp = require('gulp')
$ = require('gulp-load-plugins')()

gulp.task 'coffee', ->
	gulp.src ['src', 'public/app/**/*.coffee']
        .pipe $.ngClassify (file) ->
            if file.path.indexOf('admin') isnt -1  # use 'admin' as the appName if 'admin' is found in the file path
                { appName: 'admin' }
            else
                { appName: 'app' }
		.pipe $.coffee { bare: true }
		.pipe gulp.dest 'public/dest/app'
		

gulp.task 'sass', ->
	gulp.src ['src', 'public/styles']
		.pipe $.rubySass { compass: true }
		.pipe gulp.dest 'public/dest/styles'
		
	
gulp.task 'jade', ->
    gulp.src "public/index.jade"
        .pipe $.jade()
        .pipe gulp.dest 'public'
		
gulp.task 'default', ['coffee', 'sass', 'jade']


gulp.task 'watch', ->
    gulp.watch 'public/styles/**/*.scss',   ['sass']  
    gulp.watch 'public/app/**/*.coffee',    ['coffee']
    gulp.watch 'public/index.jade',         ['jade']