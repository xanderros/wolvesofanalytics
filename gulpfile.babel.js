import gulp from 'gulp'
import browserSync from 'browser-sync'
import del from 'del'

import { paths } from './gulp/config'
import environments from 'gulp-environments'

const development = environments.development;
const production = environments.production;

/**
 * Import theme specific tasks
 */
import { styles } from './gulp/template'
import { scripts } from './gulp/template'
import { views } from './gulp/template'
import { imageMinification } from './gulp/template'
import { imageCopy } from './gulp/template'
import { svgIcons } from './gulp/template'
import { copy } from './gulp/template'

/**
 *  Start the engine
 */
const server = () => {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  })
}

const reload = (done) => {
  browserSync.reload();
  done();
}

const watch = () => {
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload))
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.views.src, gulp.series(views, reload))
}

/**
 * Wipe assets
 */
const clean = () => del([ 'build' ])

/**
 * Build icons and images
 */
export const icons = gulp.series(svgIcons)
export const imagesMin = gulp.series(imageMinification)
export const images = gulp.series(imageCopy)

/**
 * Custom environments
 */
const dev = gulp.series(clean, icons, gulp.parallel(server, images, scripts, styles, views, copy, watch))
const prod = gulp.series(clean, gulp.series(clean, icons, images, scripts, styles, views, copy))

let build = production() ? prod : dev

export default build
