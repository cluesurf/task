FROM --platform=linux/amd64 amd64/ubuntu:noble

# WORKDIR /root

ENV TERM linux
ENV DEBIAN_FRONTEND noninteractive

# Declare constants
ENV NVM_VERSION v0.39.7
ENV NODE_VERSION 20.10

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -y -q
RUN apt-get upgrade -y -q

RUN apt-get -y install build-essential
RUN apt-get -y install curl
RUN apt-get -y install exiftool
RUN apt-get -y install llvm-17
RUN apt-get -y install clang-17
RUN apt-get -y install clang-format-17
RUN apt-get -y install imagemagick

RUN apt-get update -y -q
RUN apt-get upgrade -y -q

RUN apt-get -y install fontforge
RUN apt-get -y install pandoc
RUN apt-get -y install texlive
RUN apt-get -y install ffmpeg
RUN apt-get -y install libarchive-tools
RUN apt-get -y install inkscape
RUN apt-get -y install git
RUN apt-get -y install libreoffice
RUN apt-get -y install gnupg
RUN apt-get -y install gifsicle
RUN apt-get -y install python3
RUN apt-get -y install golang
# RUN apt-get -y install python3-full
RUN apt-get -y install rustc
RUN apt-get -y install rustfmt
RUN apt-get -y install wget
RUN apt-get -y install gnupg
RUN apt-get -y install unoconv
RUN apt-get -y install ruby3.2
RUN apt-get -y install rubygems-integration
RUN apt-get -y install calibre
RUN apt-get -y install wabt
RUN apt-get -y install unar
RUN apt-get -y install default-jdk-headless
RUN apt-get -y install maven

# Reinstall curl?
RUN apt-get update -y -q
RUN apt-get upgrade -y -q
RUN apt-get -y install curl

# Install Node.js
# https://stackoverflow.com/questions/25899912/how-to-install-nvm-in-docker
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs
RUN npm install -g pnpm

# Install swift dependencies
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install binutils
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install git
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install unzip
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install gnupg2
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libc6-dev
# RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libcurl4-openssl-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libedit2
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libgcc-11-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libpython3-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libsqlite3-0
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libstdc++-11-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libxml2-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install libz3-dev
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install pkg-config
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install python3-lldb
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install tzdata
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true && apt-get -q -y install zlib1g-dev
RUN rm -r /var/lib/apt/lists/*

# Install swift
ARG SWIFT_SIGNING_KEY=A62AE125BBBFBB96A6E042EC925CC1CCED3D1561
ARG SWIFT_PLATFORM=ubuntu22.04
ARG SWIFT_BRANCH=swift-5.9.2-release
ARG SWIFT_VERSION=swift-5.9.2-RELEASE
ARG SWIFT_WEBROOT=https://download.swift.org

ENV SWIFT_SIGNING_KEY=$SWIFT_SIGNING_KEY \
    SWIFT_PLATFORM=$SWIFT_PLATFORM \
    SWIFT_BRANCH=$SWIFT_BRANCH \
    SWIFT_VERSION=$SWIFT_VERSION \
    SWIFT_WEBROOT=$SWIFT_WEBROOT

RUN set -e; \
    ARCH_NAME="$(dpkg --print-architecture)"; \
    url=; \
    case "${ARCH_NAME##*-}" in \
        'amd64') \
            OS_ARCH_SUFFIX=''; \
            ;; \
        'arm64') \
            OS_ARCH_SUFFIX='-aarch64'; \
            ;; \
        *) echo >&2 "error: unsupported architecture: '$ARCH_NAME'"; exit 1 ;; \
    esac; \
    SWIFT_WEBDIR="$SWIFT_WEBROOT/$SWIFT_BRANCH/$(echo $SWIFT_PLATFORM | tr -d .)$OS_ARCH_SUFFIX" \
    && SWIFT_BIN_URL="$SWIFT_WEBDIR/$SWIFT_VERSION/$SWIFT_VERSION-$SWIFT_PLATFORM$OS_ARCH_SUFFIX.tar.gz" \
    && SWIFT_SIG_URL="$SWIFT_BIN_URL.sig" \
    # - Grab curl here so we cache better up above
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -q update && apt-get -q install -y curl && rm -rf /var/lib/apt/lists/* \
    # - Download the GPG keys, Swift toolchain, and toolchain signature, and verify.
    && export GNUPGHOME="$(mktemp -d)" \
    && curl -fsSL "$SWIFT_BIN_URL" -o swift.tar.gz "$SWIFT_SIG_URL" -o swift.tar.gz.sig \
    && gpg --batch --quiet --keyserver keyserver.ubuntu.com --recv-keys "$SWIFT_SIGNING_KEY" \
    && gpg --batch --verify swift.tar.gz.sig swift.tar.gz \
    # - Unpack the toolchain, set libs permissions, and clean up.
    && tar -xzf swift.tar.gz --directory / --strip-components=1 \
    && chmod -R o+r /usr/lib/swift \
    && rm -rf "$GNUPGHOME" swift.tar.gz.sig swift.tar.gz \
    && apt-get purge --auto-remove -y curl

# RUN source ~/.nvm/nvm.sh; \
#   nvm install $NODE_VERSION; \
#   nvm use --delete-prefix $NODE_VERSION; \
#   npm install -g pnpm

# Setup python virtual environment
RUN apt-get update -y -q
RUN apt-get upgrade -y -q
RUN apt-get -y install software-properties-common
RUN apt-get -y install python3.12-venv
# RUN wget https://www.python.org/ftp/python/3.9.16/Python-3.9.16.tar.xz
# RUN tar -xf Python-3.9.16.tar.xz
# RUN cd Python-3.9.16 && ./configure --enable-optimizations --enable-shared \
#   && make -j 6 \
#   && make altinstall \
# RUN ldconfig Python-3.9.16
# RUN python3.9 --version
RUN mkdir -p /home/python
RUN python3 -m venv /home/python/venv
# RUN python3.9 -m venv /home/python/venv2

# Install python packages
RUN /home/python/venv/bin/pip install black
RUN /home/python/venv/bin/pip install "black[jupyter]"
RUN /home/python/venv/bin/pip install jill
# RUN /home/python/venv2/bin/pip install guesslang

# Install go packages
RUN go install github.com/klauspost/asmfmt/cmd/asmfmt@ef134b9cec704e2b7b336fb02153b7d1a58247da

# Install Julia
RUN /home/python/venv/bin/jill install --preferred-arch arm64 -c

# Install ruby formatter rubocop
RUN gem install rubocop

# Setup basic aliases
RUN rm /usr/bin/clang
RUN ln -s /usr/bin/clang-17 /usr/bin/clang
RUN ln -s /usr/bin/clang-format-17 /usr/bin/clang-format
RUN ln -s /usr/bin/llc-17 /usr/bin/llc
RUN ln -s /home/python/venv/bin/black /usr/bin/black
# RUN ln -s /home/python/venv2/bin/guesslang /usr/bin/guesslang

# Install swift formatter swift-format
# RUN wget -O swift-format.509.0.0.tar.gz https://github.com/apple/swift-format/archive/refs/tags/509.0.0.tar.gz
# RUN tar -xvzf swift-format.509.0.0.tar.gz
# RUN cd swift-format-509.0.0 && swift build -c release \
#   && cp /swift-format-509.0.0/.build/x86_64-unknown-linux-gnu/release/swift-format /usr/local/bin

# Install shell formatter shfmt
RUN go install mvdan.cc/sh/v3/cmd/shfmt@v3.7.0

# Install kotlin formatter ktfmt
RUN wget -O ktfmt.v0.46.tar.gz https://github.com/facebook/ktfmt/archive/refs/tags/v0.46.tar.gz
RUN tar -xvzf ktfmt.v0.46.tar.gz
RUN cd ktfmt-0.46 && mvn -B install --file pom.xml && mv ./core/target/ktfmt-0.46-jar-with-dependencies.jar /usr/local/bin

# Install objconv
RUN wget -O obvconv.v2.50.tar.gz https://github.com/gitGNU/objconv/archive/refs/tags/v2.50.tar.gz
RUN tar -xvzf obvconv.v2.50.tar.gz
RUN cd objconv-2.50/src && ./build.sh && mv objconv /usr/local/bin

# Label the container
LABEL org.opencontainers.image.source https://github.com/termsurf/task
LABEL org.opencontainers.image.title "Task: Common Actions Interface"
LABEL org.opencontainers.image.description "A wrapper around a lot of tools to make it easier to use them all."

RUN /home/python/venv/bin/pip install antlr4-tools
RUN ln -s /home/python/venv/bin/antlr4-parse /usr/bin/antlr4-parse

RUN /home/python/venv/bin/pip install patool
RUN ln -s /home/python/venv/bin/patool /usr/bin/patool

RUN apt-get install apt-transport-https
RUN wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/dart.gpg
RUN echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' | tee /etc/apt/sources.list.d/dart_stable.list
RUN apt-get update -y -q
RUN apt-get -y install dart

RUN apt-get update -y -q
RUN apt-get upgrade -y -q
RUN apt-get -y install curl

RUN apt-get -y install php-cli
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
RUN HASH=`curl -sS https://composer.github.io/installer.sig` \
  && php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

RUN wget https://github.com/PHP-CS-Fixer/PHP-CS-Fixer/releases/download/v3.13.0/php-cs-fixer.phar -O php-cs-fixer
RUN chmod a+x php-cs-fixer
RUN mv php-cs-fixer /usr/local/bin/php-cs-fixer

RUN apt-get update
RUN apt-get -y install g++
RUN apt-get -y install make
RUN apt-get -y install cmake
RUN apt-get -y install unzip
RUN apt-get -y install libcurl4-openssl-dev
RUN apt-get -y install enscript

RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*
