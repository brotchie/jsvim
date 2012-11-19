#!/bin/sh
../../emscripten/emmake make && mv vim vim.bc && ../../emscripten/emcc vim.bc -o vim.js
