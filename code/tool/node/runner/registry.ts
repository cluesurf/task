/**
 * Tier 1 ecosystem registry — the 95%-of-clones set.
 *
 * Order matters. More-specific markers (lockfiles) come first
 * so `pnpm` is preferred over bare `npm` when both apply, etc.
 *
 * Adding a new ecosystem: append an entry. Every row of the
 * Detection Matrix in `note/idea/zero-config-build-runner.md` is
 * a candidate.
 */

import type { Ecosystem } from './types'

export const REGISTRY: Ecosystem[] = [
  // ---- JS / TS: lockfile-specific wins ---------------------------
  {
    id: 'pnpm',
    name: 'pnpm',
    markers: [
      { form: 'file', path: 'package.json' },
      { form: 'any',  paths: ['pnpm-lock.yaml', 'pnpm-workspace.yaml'] },
    ],
    commands: {
      build:   'pnpm build',
      test:    'pnpm test',
      run:     'pnpm dev',
      lint:    'pnpm lint',
      format:  'pnpm prettier --write .',
      install: 'pnpm install',
      clean:   'rm -rf node_modules dist',
    },
  },
  {
    id: 'bun',
    name: 'bun',
    markers: [
      { form: 'file', path: 'package.json' },
      { form: 'any',  paths: ['bun.lockb', 'bun.lock'] },
    ],
    commands: {
      build:   'bun run build',
      test:    'bun test',
      run:     'bun dev',
      install: 'bun install',
      clean:   'rm -rf node_modules dist',
    },
  },
  {
    id: 'npm',
    name: 'npm',
    // Any package.json qualifies — runs after pnpm/bun so those
    // win when their lockfiles exist.
    markers: [{ form: 'file', path: 'package.json' }],
    commands: {
      build:   'npm run build',
      test:    'npm test',
      run:     'npm run dev',
      install: 'npm install',
      clean:   'rm -rf node_modules dist',
    },
  },

  // ---- Systems ---------------------------------------------------
  // Ordered from most-specific (language-native manifests: Cargo,
  // go.mod, Zig, Nimble) through mono-repo build systems (bazel,
  // buck2, pants, please) down to C/C++ meta-builders (cmake,
  // meson, scons, autotools, ninja) and finally the bottom-of-
  // stack fallbacks (make, tup, earthly). First-marker-match wins.
  {
    id: 'cargo',
    name: 'cargo (rust)',
    markers: [{ form: 'file', path: 'Cargo.toml' }],
    commands: {
      build:   'cargo build',
      test:    'cargo test',
      run:     'cargo run',
      lint:    'cargo clippy',
      format:  'cargo fmt',
      clean:   'cargo clean',
    },
  },
  {
    id: 'go',
    name: 'go',
    markers: [{ form: 'any', paths: ['go.mod', 'go.work'] }],
    commands: {
      build:   'go build ./...',
      test:    'go test ./...',
      run:     'go run .',
      lint:    'golangci-lint run',
      format:  'gofmt -s -w .',
      install: 'go mod tidy',
      clean:   'go clean',
    },
  },
  {
    id: 'zig',
    name: 'zig',
    markers: [{ form: 'file', path: 'build.zig' }],
    commands: {
      build:   'zig build',
      test:    'zig build test',
      run:     'zig build run',
      format:  'zig fmt .',
      clean:   'rm -rf zig-cache zig-out',
    },
  },
  {
    id: 'nim',
    name: 'nim (nimble)',
    // `*.nimble` glob-match via `contains` would need a dir walk;
    // keep this simple by checking the two canonical file names
    // plus any `*.nimble` via `any` pathspec isn't possible — use
    // nim.cfg / config.nims as proxies.
    markers: [{ form: 'any', paths: ['nim.cfg', 'config.nims'] }],
    commands: {
      build:   'nimble build',
      test:    'nimble test',
      run:     'nimble run',
      install: 'nimble install',
      clean:   'rm -rf nimcache bin',
    },
  },
  {
    id: 'dub',
    name: 'd (dub)',
    markers: [{ form: 'any', paths: ['dub.json', 'dub.sdl'] }],
    commands: {
      build:   'dub build',
      test:    'dub test',
      run:     'dub run',
      clean:   'dub clean',
    },
  },
  {
    id: 'v',
    name: 'v lang',
    markers: [{ form: 'file', path: 'v.mod' }],
    commands: {
      build:   'v .',
      test:    'v test .',
      run:     'v run .',
    },
  },
  {
    id: 'jai',
    name: 'jai',
    markers: [{ form: 'file', path: 'build.jai' }],
    commands: {
      build:   'jai build.jai',
      run:     'jai run',
    },
  },
  {
    id: 'buck2',
    name: 'buck2',
    markers: [{ form: 'any', paths: ['BUCK', 'BUCK2', '.buckconfig'] }],
    commands: {
      build:   'buck2 build //...',
      test:    'buck2 test //...',
      run:     'buck2 run //...',
      clean:   'buck2 clean',
    },
  },
  {
    id: 'bazel',
    name: 'bazel',
    // Requires a top-level BUILD + a workspace marker. Without
    // MODULE.bazel or WORKSPACE we might false-positive on a
    // random `BUILD` text file.
    markers: [
      { form: 'any', paths: ['BUILD', 'BUILD.bazel'] },
      { form: 'any', paths: ['MODULE.bazel', 'WORKSPACE', 'WORKSPACE.bazel'] },
    ],
    commands: {
      build:   'bazel build //...',
      test:    'bazel test //...',
      run:     'bazel run //...',
      clean:   'bazel clean',
    },
  },
  {
    id: 'pants',
    name: 'pants',
    markers: [{ form: 'file', path: 'BUILD.pants' }],
    commands: {
      build:   'pants package ::',
      test:    'pants test ::',
      run:     'pants run ::',
    },
  },
  {
    id: 'please',
    name: 'please (plz)',
    markers: [{ form: 'file', path: 'please.yaml' }],
    commands: {
      build:   'plz build //...',
      test:    'plz test //...',
      run:     'plz run //...',
      clean:   'plz clean',
    },
  },
  {
    id: 'cmake',
    name: 'cmake',
    markers: [{ form: 'file', path: 'CMakeLists.txt' }],
    commands: {
      // Assumes an out-of-source `build/` dir. `cmake -S . -B build`
      // first time; after that these just incrementally rebuild.
      build:   'cmake -S . -B build && cmake --build build',
      test:    'ctest --test-dir build',
      run:     'cmake --build build --target run',
      clean:   'rm -rf build',
    },
  },
  {
    id: 'meson',
    name: 'meson',
    markers: [{ form: 'file', path: 'meson.build' }],
    commands: {
      build:   'meson setup build && meson compile -C build',
      test:    'meson test -C build',
      clean:   'rm -rf build',
    },
  },
  {
    id: 'scons',
    name: 'scons',
    markers: [{ form: 'any', paths: ['SConstruct', 'SConscript'] }],
    commands: {
      build:   'scons',
      test:    'scons test',
      clean:   'scons -c',
    },
  },
  {
    id: 'autotools',
    name: 'autotools',
    markers: [{ form: 'any', paths: ['configure.ac', 'autogen.sh', 'configure'] }],
    commands: {
      // Bootstrap ./configure if it doesn't exist yet, then build.
      build:   '[ -x ./configure ] || ./autogen.sh; ./configure && make',
      test:    'make check',
      clean:   'make clean',
    },
  },
  {
    id: 'ninja',
    name: 'ninja',
    markers: [{ form: 'file', path: 'build.ninja' }],
    commands: {
      build:   'ninja',
      test:    'ninja test',
      clean:   'ninja -t clean',
    },
  },
  {
    id: 'odin',
    name: 'odin',
    // `*.odin` files with no manifest — cheap marker: presence of
    // an `.odin` extension anywhere in cwd. Avoid a full walk by
    // checking a few conventional file names.
    markers: [{ form: 'any', paths: ['main.odin', 'src/main.odin'] }],
    commands: {
      build:   'odin build .',
      test:    'odin test .',
      run:     'odin run .',
    },
  },
  {
    id: 'tup',
    name: 'tup',
    markers: [{ form: 'file', path: 'Tupfile' }],
    commands: {
      build:   'tup',
      clean:   'tup -d',
    },
  },
  {
    id: 'earthly',
    name: 'earthly',
    markers: [{ form: 'any', paths: ['Earthfile', 'BUILD.earthly'] }],
    commands: {
      build:   'earthly +build',
      test:    'earthly +test',
    },
  },

  // ---- Python -----------------------------------------------------
  // Ordered most-specific lockfile first (uv / poetry / pdm / hatch),
  // then Pipfile, then conda, then bare pyproject (PEP 517), then
  // setup.py (legacy), then requirements.txt (pip). The `$(basename
  // "$PWD")` fallback for `run` assumes the dir name is also the
  // importable package name — override via `.taskrc` when it's not.
  {
    id: 'uv',
    name: 'uv',
    markers: [
      { form: 'file', path: 'pyproject.toml' },
      { form: 'file', path: 'uv.lock' },
    ],
    commands: {
      build:   'uv build',
      test:    'uv run pytest',
      run:     'uv run python -m "$(basename "$PWD")"',
      lint:    'uv run ruff check .',
      format:  'uv run ruff format .',
      install: 'uv sync',
      clean:   'rm -rf .venv dist build *.egg-info',
    },
  },
  {
    id: 'poetry',
    name: 'poetry',
    markers: [
      { form: 'file', path: 'pyproject.toml' },
      { form: 'file', path: 'poetry.lock' },
    ],
    commands: {
      build:   'poetry build',
      test:    'poetry run pytest',
      run:     'poetry run python -m "$(basename "$PWD")"',
      lint:    'poetry run ruff check .',
      format:  'poetry run ruff format .',
      install: 'poetry install',
      clean:   'rm -rf dist build *.egg-info',
    },
  },
  {
    id: 'pdm',
    name: 'pdm',
    markers: [
      { form: 'file', path: 'pyproject.toml' },
      { form: 'file', path: 'pdm.lock' },
    ],
    commands: {
      build:   'pdm build',
      test:    'pdm run pytest',
      run:     'pdm run python -m "$(basename "$PWD")"',
      lint:    'pdm run ruff check .',
      format:  'pdm run ruff format .',
      install: 'pdm install',
      clean:   'rm -rf .venv dist build *.egg-info',
    },
  },
  {
    id: 'hatch',
    name: 'hatch',
    markers: [
      { form: 'file', path: 'pyproject.toml' },
      { form: 'any',  paths: ['hatch.toml', '.hatch'] },
    ],
    commands: {
      build:   'hatch build',
      test:    'hatch run test',
      run:     'hatch run default',
      lint:    'hatch run lint',
      format:  'hatch run fmt',
      install: 'hatch env create',
      clean:   'hatch clean',
    },
  },
  {
    id: 'pipenv',
    name: 'pipenv',
    markers: [{ form: 'file', path: 'Pipfile' }],
    commands: {
      build:   'pipenv run python -m build',
      test:    'pipenv run pytest',
      run:     'pipenv run python -m "$(basename "$PWD")"',
      lint:    'pipenv run ruff check .',
      format:  'pipenv run ruff format .',
      install: 'pipenv install',
      clean:   'rm -rf dist build *.egg-info',
    },
  },
  {
    id: 'conda',
    name: 'conda',
    markers: [{ form: 'any', paths: ['environment.yml', 'environment.yaml', 'conda.yaml'] }],
    commands: {
      build:   'python -m build',
      test:    'pytest',
      run:     'python -m "$(basename "$PWD")"',
      lint:    'ruff check .',
      format:  'ruff format .',
      // `env create` fails noisily when the env already exists;
      // fall through to `env update` in that case. User can override.
      install: 'conda env create -f environment.yml || conda env update -f environment.yml',
      clean:   'rm -rf dist build *.egg-info __pycache__',
    },
  },
  {
    id: 'py',
    name: 'python (pep 517 / bare pyproject)',
    markers: [{ form: 'file', path: 'pyproject.toml' }],
    commands: {
      build:   'python -m build',
      test:    'pytest',
      run:     'python -m "$(basename "$PWD")"',
      lint:    'ruff check .',
      format:  'ruff format .',
      install: 'pip install -e .',
      clean:   'rm -rf dist build *.egg-info __pycache__',
    },
  },
  {
    id: 'setuptools',
    name: 'python (legacy setup.py)',
    markers: [{ form: 'file', path: 'setup.py' }],
    commands: {
      build:   'python setup.py build',
      test:    'pytest',
      run:     'python setup.py run',
      lint:    'ruff check .',
      format:  'ruff format .',
      install: 'pip install -e .',
      clean:   'python setup.py clean --all',
    },
  },
  {
    id: 'pip',
    name: 'pip (requirements.txt)',
    markers: [{ form: 'file', path: 'requirements.txt' }],
    commands: {
      build:   'python -m build',
      test:    'pytest',
      run:     'python main.py',
      lint:    'ruff check .',
      format:  'ruff format .',
      install: 'pip install -r requirements.txt',
      clean:   'rm -rf dist build *.egg-info __pycache__',
    },
  },

  // ---- JVM -------------------------------------------------------
  // gradle-kts / gradle / maven / sbt / mill / scala-cli / clojure
  // lockfile-ish markers (project.clj / shadow-cljs / build.boot).
  {
    id: 'gradle-kts',
    name: 'gradle (kotlin dsl)',
    markers: [{ form: 'file', path: 'build.gradle.kts' }],
    commands: {
      build: 'gradle build', test: 'gradle test', run: 'gradle run',
      format: 'gradle ktlintFormat',
      install: 'gradle --refresh-dependencies dependencies',
      clean: 'gradle clean',
    },
  },
  {
    id: 'gradle',
    name: 'gradle (groovy dsl)',
    markers: [{ form: 'file', path: 'build.gradle' }],
    commands: {
      build: 'gradle build', test: 'gradle test', run: 'gradle run',
      install: 'gradle --refresh-dependencies dependencies',
      clean: 'gradle clean',
    },
  },
  {
    id: 'maven',
    name: 'maven',
    markers: [{ form: 'file', path: 'pom.xml' }],
    commands: {
      build: 'mvn package', test: 'mvn test', run: 'mvn exec:java',
      install: 'mvn install', clean: 'mvn clean',
    },
  },
  {
    id: 'sbt',
    name: 'sbt (scala)',
    markers: [{ form: 'file', path: 'build.sbt' }],
    commands: {
      build: 'sbt compile', test: 'sbt test', run: 'sbt run',
      clean: 'sbt clean',
    },
  },
  {
    id: 'mill',
    name: 'mill (scala)',
    markers: [{ form: 'any', paths: ['build.sc', 'mill', '.mill-version'] }],
    commands: {
      build: 'mill __.compile', test: 'mill __.test', run: 'mill run',
      clean: 'mill clean',
    },
  },
  {
    id: 'scala-cli',
    name: 'scala-cli',
    markers: [{ form: 'any', paths: ['project.scala', '.scala-build'] }],
    commands: {
      build: 'scala-cli compile .', test: 'scala-cli test .',
      run: 'scala-cli run .',
    },
  },
  {
    id: 'clojure',
    name: 'clojure (deps)',
    markers: [{ form: 'file', path: 'deps.edn' }],
    commands: {
      build: 'clj -T:build', test: 'clj -M:test', run: 'clj -M:run',
    },
  },
  {
    id: 'leiningen',
    name: 'leiningen',
    markers: [{ form: 'file', path: 'project.clj' }],
    commands: {
      build: 'lein uberjar', test: 'lein test', run: 'lein run',
      install: 'lein deps', clean: 'lein clean',
    },
  },
  {
    id: 'shadow-cljs',
    name: 'clojurescript (shadow)',
    markers: [{ form: 'file', path: 'shadow-cljs.edn' }],
    commands: {
      build: 'shadow-cljs release app',
      test: 'shadow-cljs test',
      run: 'shadow-cljs watch app',
    },
  },

  // ---- .NET -------------------------------------------------------
  // `*.sln` (solution) wins if present; otherwise any `*.csproj` /
  // `*.fsproj` / `*.vbproj`. File-glob markers are approximated via
  // `contains` scans — here we use `any` + common names.
  {
    id: 'dotnet-sln',
    name: 'dotnet (sln)',
    markers: [{ form: 'contains', path: '.', pattern: /\.sln$/m }],
    commands: {
      build: 'dotnet build', test: 'dotnet test', run: 'dotnet run',
      install: 'dotnet restore', clean: 'dotnet clean',
    },
  },
  // Can't glob via `contains` on a dir; fall back to marker
  // presence via sibling conventions.
  {
    id: 'dotnet',
    name: 'dotnet (project)',
    markers: [{ form: 'any', paths: ['global.json', 'Directory.Build.props', 'nuget.config'] }],
    commands: {
      build: 'dotnet build', test: 'dotnet test', run: 'dotnet run',
      install: 'dotnet restore', clean: 'dotnet clean',
    },
  },

  // ---- Haskell family --------------------------------------------
  {
    id: 'stack',
    name: 'stack (haskell)',
    markers: [{ form: 'file', path: 'stack.yaml' }],
    commands: {
      build: 'stack build', test: 'stack test', run: 'stack run',
      install: 'stack install --only-dependencies', clean: 'stack clean',
    },
  },
  {
    id: 'cabal',
    name: 'cabal (haskell)',
    markers: [{ form: 'any', paths: ['cabal.project', 'cabal.project.local'] }],
    commands: {
      build: 'cabal build', test: 'cabal test', run: 'cabal run',
      install: 'cabal update', clean: 'cabal clean',
    },
  },
  {
    id: 'hpack',
    name: 'hpack (haskell)',
    markers: [{ form: 'file', path: 'package.yaml' }],
    commands: {
      build: 'stack build', test: 'stack test', run: 'stack run',
      clean: 'stack clean',
    },
  },
  {
    id: 'elm',
    name: 'elm',
    markers: [{ form: 'file', path: 'elm.json' }],
    commands: {
      build: 'elm make src/Main.elm --output dist/index.html',
      test: 'elm-test',
      run: 'elm reactor',
      format: 'elm-format --yes src/',
      install: 'elm make',
      clean: 'rm -rf elm-stuff dist',
    },
  },
  {
    id: 'spago',
    name: 'purescript (spago)',
    markers: [{ form: 'any', paths: ['spago.yaml', 'spago.dhall'] }],
    commands: {
      build: 'spago build', test: 'spago test', run: 'spago run',
      install: 'spago install', clean: 'rm -rf .spago output',
    },
  },
  {
    id: 'roc',
    name: 'roc',
    markers: [{ form: 'file', path: 'main.roc' }],
    commands: {
      build: 'roc build main.roc',
      test: 'roc test main.roc',
      run: 'roc main.roc',
    },
  },

  // ---- Proof assistants / formal methods -------------------------
  {
    id: 'coq',
    name: 'coq',
    markers: [{ form: 'any', paths: ['_CoqProject', 'CoqMakefile'] }],
    commands: {
      // `coq_makefile -f _CoqProject -o Makefile && make` is the
      // canonical bootstrap; once `Makefile` exists, plain `make`
      // re-checks. Do both so first-run and incremental work.
      build: '[ -f Makefile ] || coq_makefile -f _CoqProject -o Makefile; make',
      test:  'make test',
      clean: 'make clean',
    },
  },

  // ---- Interaction-net / research --------------------------------
  {
    id: 'bend',
    name: 'bend (HVM)',
    // Bend has no manifest yet — detection is filename-based.
    // Probe a few conventional entry points; users override via
    // `.taskrc` when their main file lives elsewhere.
    markers: [{ form: 'any', paths: ['main.bend', 'src/main.bend', 'index.bend'] }],
    commands: {
      // `bend gen-cu` lowers to CUDA; `bend run` JIT-runs via HVM.
      build: 'bend gen-cu main.bend',
      run:   'bend run main.bend',
    },
  },

  // ---- OCaml / F# / Reason / ReScript ----------------------------
  {
    id: 'dune',
    name: 'dune (ocaml)',
    markers: [{ form: 'file', path: 'dune-project' }],
    commands: {
      build: 'dune build', test: 'dune runtest', run: 'dune exec',
      format: 'dune build @fmt --auto-promote',
      install: 'opam install . --deps-only',
      clean: 'dune clean',
    },
  },
  {
    id: 'rescript',
    name: 'rescript',
    markers: [{ form: 'any', paths: ['rescript.json', 'bsconfig.json'] }],
    commands: {
      build: 'rescript build',
      clean: 'rescript clean',
    },
  },

  // ---- Ruby -------------------------------------------------------
  // Rails beats bare Gemfile; Rakefile is a clean fallback.
  {
    id: 'rails',
    name: 'rails',
    markers: [
      { form: 'file', path: 'Gemfile' },
      { form: 'any',  paths: ['config/routes.rb', 'bin/rails'] },
    ],
    commands: {
      build: 'bin/rails assets:precompile',
      test: 'bin/rails test',
      run: 'bin/rails server',
      install: 'bundle install',
      clean: 'bin/rails assets:clobber',
    },
  },
  {
    id: 'bundler',
    name: 'bundler',
    markers: [{ form: 'file', path: 'Gemfile' }],
    commands: {
      build: 'bundle install',
      test: 'bundle exec rspec',
      run: 'bundle exec rackup',
      install: 'bundle install',
      format: 'bundle exec rubocop -a',
      clean: 'rm -rf .bundle vendor/bundle',
    },
  },
  {
    id: 'rake',
    name: 'rake',
    markers: [{ form: 'file', path: 'Rakefile' }],
    commands: {
      build: 'rake build', test: 'rake test', run: 'rake run',
      clean: 'rake clean',
    },
  },

  // ---- PHP -------------------------------------------------------
  {
    id: 'laravel',
    name: 'laravel',
    markers: [
      { form: 'file', path: 'composer.json' },
      { form: 'any',  paths: ['artisan', 'bootstrap/app.php'] },
    ],
    commands: {
      build: 'composer install',
      test: 'php artisan test',
      run: 'php artisan serve',
      install: 'composer install',
      clean: 'php artisan cache:clear',
    },
  },
  {
    id: 'composer',
    name: 'composer (php)',
    markers: [{ form: 'file', path: 'composer.json' }],
    commands: {
      build: 'composer install',
      test: './vendor/bin/phpunit',
      run: 'php -S localhost:8000',
      install: 'composer install',
      clean: 'rm -rf vendor',
    },
  },

  // ---- Elixir / Erlang / BEAM ------------------------------------
  {
    id: 'phoenix',
    name: 'phoenix (elixir)',
    markers: [
      { form: 'file', path: 'mix.exs' },
      { form: 'contains', path: 'mix.exs', pattern: /:phoenix/ },
    ],
    commands: {
      build: 'mix assets.deploy && mix compile',
      test: 'mix test',
      run: 'mix phx.server',
      install: 'mix deps.get',
      format: 'mix format',
      clean: 'mix clean',
    },
  },
  {
    id: 'mix',
    name: 'elixir (mix)',
    markers: [{ form: 'file', path: 'mix.exs' }],
    commands: {
      build: 'mix compile', test: 'mix test', run: 'mix run --no-halt',
      install: 'mix deps.get', format: 'mix format', clean: 'mix clean',
    },
  },
  {
    id: 'rebar3',
    name: 'erlang (rebar3)',
    markers: [{ form: 'any', paths: ['rebar.config', 'rebar3.config'] }],
    commands: {
      build: 'rebar3 compile', test: 'rebar3 eunit', run: 'rebar3 shell',
      install: 'rebar3 get-deps', clean: 'rebar3 clean',
    },
  },
  {
    id: 'gleam',
    name: 'gleam',
    markers: [{ form: 'file', path: 'gleam.toml' }],
    commands: {
      build: 'gleam build', test: 'gleam test', run: 'gleam run',
      format: 'gleam format', clean: 'gleam clean',
    },
  },

  // ---- Apple / mobile --------------------------------------------
  {
    id: 'swift-pm',
    name: 'swift package manager',
    markers: [{ form: 'file', path: 'Package.swift' }],
    commands: {
      build: 'swift build', test: 'swift test', run: 'swift run',
      format: 'swift-format format --in-place --recursive Sources/',
      clean: 'swift package clean',
    },
  },
  {
    id: 'flutter',
    name: 'flutter',
    markers: [
      { form: 'file', path: 'pubspec.yaml' },
      { form: 'any',  paths: ['ios', 'android', 'macos'] },
    ],
    commands: {
      build: 'flutter build apk',
      test: 'flutter test',
      run: 'flutter run',
      install: 'flutter pub get',
      format: 'dart format .',
      clean: 'flutter clean',
    },
  },
  {
    id: 'dart',
    name: 'dart (pub)',
    markers: [{ form: 'file', path: 'pubspec.yaml' }],
    commands: {
      build: 'dart compile exe bin/main.dart',
      test: 'dart test',
      run: 'dart run',
      install: 'dart pub get',
      format: 'dart format .',
      clean: 'rm -rf .dart_tool build',
    },
  },
  {
    id: 'android-gradle',
    name: 'android (gradle)',
    markers: [{ form: 'any', paths: ['android/settings.gradle', 'android/settings.gradle.kts'] }],
    commands: {
      build: './gradlew assembleDebug',
      test: './gradlew test',
      run: './gradlew installDebug',
      clean: './gradlew clean',
    },
  },

  // ---- Julia / R (scientific) ------------------------------------
  {
    id: 'julia',
    name: 'julia',
    markers: [{ form: 'any', paths: ['Project.toml', 'JuliaProject.toml'] }],
    commands: {
      build:   'julia --project=. -e "using Pkg; Pkg.build()"',
      test:    'julia --project=. -e "using Pkg; Pkg.test()"',
      run:     'julia --project=. src/main.jl',
      install: 'julia --project=. -e "using Pkg; Pkg.instantiate()"',
      clean:   'rm -rf deps/build',
    },
  },
  {
    id: 'r',
    name: 'r (renv)',
    markers: [{ form: 'file', path: 'renv.lock' }],
    commands: {
      build:   'Rscript -e "devtools::build()"',
      test:    'Rscript -e "devtools::test()"',
      run:     'Rscript main.R',
      install: 'Rscript -e "renv::restore()"',
      clean:   'rm -rf .Rproj.user',
    },
  },

  // ---- Static site generators (static doc builders) --------------
  {
    id: 'hugo',
    name: 'hugo',
    markers: [{ form: 'any', paths: ['hugo.toml', 'hugo.yaml', 'hugo.json', 'config.toml'] }],
    commands: {
      build: 'hugo', run: 'hugo server -D',
      clean: 'rm -rf public resources',
    },
  },
  {
    id: 'jekyll',
    name: 'jekyll',
    markers: [{ form: 'file', path: '_config.yml' }],
    commands: {
      build: 'bundle exec jekyll build',
      run:   'bundle exec jekyll serve',
      install: 'bundle install',
      clean: 'bundle exec jekyll clean',
    },
  },
  {
    id: 'mdbook',
    name: 'mdbook',
    markers: [{ form: 'file', path: 'book.toml' }],
    commands: {
      build: 'mdbook build', test: 'mdbook test', run: 'mdbook serve',
      clean: 'mdbook clean',
    },
  },
  {
    id: 'mkdocs',
    name: 'mkdocs',
    markers: [{ form: 'file', path: 'mkdocs.yml' }],
    commands: {
      build: 'mkdocs build', run: 'mkdocs serve',
      clean: 'rm -rf site',
    },
  },

  // ---- Docker: runs last because most projects also have one ----
  {
    id: 'docker',
    name: 'docker',
    markers: [
      { form: 'any', paths: ['Dockerfile', 'dockerfile', 'Containerfile'] },
    ],
    commands: {
      build:   'docker build -t $(basename "$PWD") .',
      run:     'docker run --rm -it $(basename "$PWD")',
      clean:   'docker system prune -f',
    },
  },

  // ---- Make: the bottom-of-the-stack fallback -------------------
  {
    id: 'make',
    name: 'make',
    markers: [{ form: 'any', paths: ['Makefile', 'GNUmakefile', 'makefile'] }],
    commands: {
      build:   'make',
      test:    'make test',
      run:     'make run',
      lint:    'make lint',
      format:  'make fmt',
      install: 'make install',
      clean:   'make clean',
    },
  },
]
