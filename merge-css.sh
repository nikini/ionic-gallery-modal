#!/bin/bash
find ./dist -name '*.css' -type f |
while read CSS_FILE
do
  # echo "${CSS_FILE/\.css/.html}";
  (echo '<style>' && cat "${CSS_FILE}" && echo '</style>' && cat "${CSS_FILE/\.css/.html}") >> "${CSS_FILE/\.css/-compiled.html}" && mv "${CSS_FILE/\.css/-compiled.html}" "${CSS_FILE/\.css/.html}"
done
