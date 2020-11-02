export const paths = {
  styles: {
    src: 'src/sass/style.scss',
    dest: 'build/css/'
  },
  scripts: {
	src: [
        './node_modules/svg4everybody/dist/svg4everybody.min.js',
		'./node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/lazysizes/lazysizes.min.js',
        'src/js/**/*.js'
    ],
    dest: 'build/js/'
  },
  views: {
    src: 'src/templates/*.html',
    dest: 'build/'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'build/fonts'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'build/img/'
  },
  icons: {
    src: 'src/icons/**/*',
    dest: 'build/icons'
  }
}
