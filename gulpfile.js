import gulp from "gulp";

import imagemin from "gulp-imagemin";

import replace from "gulp-replace";

import plumber from "gulp-plumber";

import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

import pugPlugin from "gulp-pug";
import htmlBeaty from "gulp-html-beautify";
import prettier from "gulp-prettier";
import { clear } from "console";

const otfToTtf = () => {
  return gulp
    .src("./fonts/*.otf", {})
    .pipe(plumber())
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(gulp.dest(`./fonts/`));
};

const ttfToWoff = () => {
  return gulp
    .src("./fonts/*.ttf", {})
    .pipe(plumber())
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(gulp.dest(`./project/fonts/`))
    .pipe(gulp.src("./fonts/*.ttf", {}))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(`./project/fonts/`));
};

const fontStyle = () => {
  let fontsFile = `./project/_fonts.scss`;
  fs.readdir("./project/fonts", function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            switch (fontWeight.toLowerCase()) {
              case "thin":
                fontWeight = 100;
                break;
              case "extralight":
                fontWeight = 200;
                break;
              case "light":
                fontWeight = 300;
                break;
              case "regular":
                fontWeight = 400;
                break;
              case "medium":
                fontWeight = 500;
                break;
              case "semibold":
                fontWeight = 600;
                break;
              case "bold":
                fontWeight = 700;
                break;
              case "extrabold":
                fontWeight = 800;
                break;
              case "black":
                fontWeight = 900;
                break;
              default:
                fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("./fonts/${fontFileName}.woff") format("woff"), url("./fonts/${fontName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          "Файл scss/fonts уже существует. Для обновления файла его нужно удалить"
        );
      }
    }
  });
  return gulp.src(`./`);
  function cb() {}
};

const images = async () => {
  return gulp
    .src("./project/img/**/*.{jpg,jpeg,png,gif,webp,svg}")
    .pipe(plumber())
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest("./build/img/"));
};

export const pug = () => {
  return gulp
    .src("./project/*.pug")
    .pipe(
      pugPlugin({
        pretty: true,
      })
    )
    // .pipe(
    //   htmlBeaty({
    //     indentSize: 2,
    //   })
    // )
		.pipe(prettier())
    .pipe(gulp.dest("./project/"));
};

export const pugWatch1 = () => {
	gulp.watch("./project/*.pug", pug)
};
export const pugWatch2 = () => {
	gulp.watch("./project/pug/**/*.pug", pug)
};

export const pugWatch = () => {
	gulp.watch("./project/*.pug", pug)
	gulp.watch("./project/pug/**/*.pug", pug)
}

gulp.task("images", images);
gulp.task("fonts", gulp.series(otfToTtf, ttfToWoff));
gulp.task("fontStyle", fontStyle);
