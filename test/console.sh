trap "exit" INT
set -e

function call() {
  line="$1"
  echo "\033[0;90m✦ call <$line>\033[0m"
  eval "$line"
}

# cp ../file/base/code/example.rs test/hold/example.rs
# cp test/file/code/example.c test/hold/example.c
# cp test/file/code/quicksort.jl test/hold/quicksort.jl
# cp test/file/code/quicksort.py test/hold/quicksort.py
# cp test/file/code/example.swift test/hold/example.swift
# cp test/file/code/quicksort.rb test/hold/quicksort.rb
# cp test/file/code/quicksort.kt test/hold/quicksort.kt
# cp test/file/code/example.asm test/hold/example.asm
# cp test/file/code/quicksort.cpp test/hold/quicksort.cpp
# cp test/file/code/quicksort.sh test/hold/quicksort.sh
# cp test/file/code/quicksort.ts test/hold/quicksort.ts
# cp test/file/code/example.md test/hold/example.md
# cp test/file/code/example.dart test/hold/example.dart
# cp test/file/code/example.java test/hold/example.java
# cp test/file/code/example.cs test/hold/example.cs
# cp test/file/code/example.js test/hold/example.js
# cp test/file/code/example.php test/hold/example.php
# cp test/file/code/example.sql test/hold/example.sql
# cp test/file/code/example.go test/hold/example.go
# cp test/file/code/example.perl test/hold/example.perl
# cp test/file/code/example.tex test/hold/example.tex
# cp test/file/code/example.lua test/hold/example.lua
# cp test/file/code/example.css test/hold/example.css
# cp test/file/code/example.html test/hold/example.html
# cp test/file/code/example.f test/hold/example.f
# cp test/file/code/example.hs test/hold/example.hs
# cp test/file/code/example.cl test/hold/example.cl

alias task="pnpm tsx code/cli"

# call "task convert -I txt -O pdf -i ../file/base/document/example.txt -o test/hold/example.txt.pdf"
# call "task convert -I md -O pdf -i ../file/base/document/example.md -o test/hold/example.md.pdf --style-text-color ff0000"
# # convert and verify
# call "task convert png jpg -i ../file/base/image/fire.png -o test/hold/fire.jpg"
# call "task verify jpg -i test/hold/fire.jpg"

# call "task convert -I cr2 -O jpg -i test/file/image/trees.cr2 -o test/hold/trees.jpg"
# call "task verify jpg -i test/hold/trees.jpg"

# # task convert -I rar -i test/file/archive/archive.rar -O zip -o test/hold/archive.rar.zip

# call "task convert -I ttf -O woff -i ../file/base/font/etch.ttf -o test/hold/etch.woff"
# call "task convert -I epub -O mobi -i test/file/document/test.epub -o test/hold/test.mobi"
# task convert -I docx -O markdown -i test/file/document/sample.docx -o test/hold/sample.docx.markdown
# task convert -I docx -O pdf -i test/file/document/sample.docx -b test/hold/pdf -n document
# call "task convert -I mkv -O dvd -i test/file/document/example.mkv -o test/hold/example.mkv.dvd"
# task convert -I xlsx -O csv

# archive
# task extract zip
# task archive -O zip

# format
# task format rust -i test/hold/example.rs -o test/hold/example.rs
# task format c -i ../file/base/code/example.c -o test/hold/example.c
# task format julia -i test/file/code/example.jl -o test/hold/example.jl
# task format python ../file/base/code/example.py -o test/hold/example.py
# task format swift test/file/code/example.swift -o test/hold/example.swift
# task format ruby test/file/code/example.rb -o test/hold/example.rb
# task format kotlin ../file/base/code/example.kt -o test/hold/example.kt
# task format assembly ../file/base/code/example.asm -o test/hold/example.asm
# task format cpp -i test/file/code/quicksort.cpp -o test/hold/quicksort.cpp
# task format shell -i test/file/code/quicksort.sh -o test/hold/quicksort.sh
# task format typescript -i test/file/code/quicksort.ts -o test/hold/quicksort.ts
# task format markdown -i test/file/code/example.md -o test/hold/example.md
# task format dart -i test/file/code/example.dart -o test/hold/example.dart
# task format java -i test/file/code/example.java -o test/hold/example.java
# task format csharp -i test/file/code/example.cs -o test/hold/example.cs
# task format javascript -i test/file/code/example.js -o test/hold/example.js
# task format php -i test/file/code/example.php -o test/hold/example.php
# task format sql -i test/file/code/example.sql -o test/hold/example.sql
# task format go -i test/file/code/example.go -o test/hold/example.go
# task format perl -i test/file/code/example.perl -o test/hold/example.perl
# task format latex -i test/file/code/example.tex -o test/hold/example.tex
# task format lua -i test/file/code/example.lua -o test/hold/example.lua
# task format css -i test/file/code/example.css -o test/hold/example.css
# task format html -i test/file/code/example.html -o test/hold/example.html
# task format fortran -i test/file/code/example.f -o test/hold/example.f
# task format haskell -i test/file/code/example.hs -o test/hold/example.hs
# task format clojure -i test/file/code/example.cl -o test/hold/example.cl
# # elixer
# # erlang
# # verilog

# # compile
task compile c -O binary -i ../file/base/code/quicksort.c -o test/hold/quicksort
# task compile cpp -O binary -i test/file/code/quicksort.cpp -o test/hold/quicksort
# task compile java -O jar -i test/file/code/quicksort.java -o test/hold/quicksort.jar
task compile rust -O binary -i ../file/base/code/quicksort/quicksort.rs -o test/hold/quicksort.rust.o
task compile rust -O assembly -i ../file/base/code/quicksort/quicksort.rs -o test/hold/quicksort.rust.asm
# task compile swift -O binary -i test/file/code/quicksort/quicksort.swift -o test/hold/quicksort.swift.o
# task compile swift -O assembly -i test/file/code/quicksort/quicksort.swift -o test/hold/quicksort.swift.asm
# task compile wast -O wasm -i test/file/code/quicksort.wast -o test/hold/quicksort.wasm
# task compile llvm -O asm -i test/file/code/quicksort.ll -o test/hold/quicksort.asm
# task compile asm -O binary -i test/file/code/quicksort.asm -o test/hold/quicksort
# task disassemble binary -O assembly -i test/file/code/quicksort -o test/hold/quicksort.asm
# task minify css test/file/code/example.css -o test/hold/example.min.css
# task minify js test/file/code/example.js -o test/hold/example.min.js

# # crypto
# task generate md5 -v foo
# task decrypt
# task encrypt
# task verify
# task sign

# # misc
# task guess format -i file.txt
# task guess language -i file.txt
# task split pdf
# task slice pdf
# # run script on all files matching pattern
# task replace -r -i *.js -e script.ts
# # get data on current device
# task inspect system
# task list process
# task kill process 123
# task trace server -i https://google.com
# task find file -i . -r -e script.ts
# task request -i url # wget

# task get gematria word

# task generate name -l afrikaans --full
# task screenshot c -O png
# task optimize gif
# task deoptimize gif
