module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
             {
                expand: true,
                cwd: "./public",
                src: ["**"],
                dest: "./dist/public"
            },
            {
                expand:true,
                cwd: "src/server",
                src: "*.json",
                dest: "./dist/server"
            }
        ]
      }
    },
    ts: {
      app: {
        files: [
            {
                src: ["src/\server/\*\*/\*.ts"],
                dest: "./dist"
            },
            {
                src: ["src/\client/*.ts", "!src/.baseDir.ts"],
                dest: "./dist/public"
            }
        ],
        options: {
          fast: "never",
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          rootDir: "src"
        }
      }
    },
    watch: {
      ts: {
        files: ["server/*.ts"],
        tasks: ["ts"]
      },
      public: {
        files: ["public/**/*.html"],
        tasks: ["copy"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "copy",
    "ts"
  ]);

};