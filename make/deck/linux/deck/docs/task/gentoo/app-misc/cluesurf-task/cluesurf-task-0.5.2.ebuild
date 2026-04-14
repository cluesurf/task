EAPI=8

DESCRIPTION="Native tool dependencies for @cluesurf/task"
HOMEPAGE="https://github.com/cluesurf/task"
LICENSE="MIT"
SLOT="0"
KEYWORDS="~amd64 ~arm64"
RDEPEND="sys-devel/gcc
net-misc/curl
net-misc/wget
dev-vcs/git
app-crypt/gnupg
dev-util/pkgconf
media-libs/exiftool
sys-devel/llvm
sys-devel/clang
media-gfx/imagemagick
media-gfx/fontforge
dev-python/fonttools
media-libs/woff2
media-libs/harfbuzz
app-text/pandoc
app-text/texlive
media-video/ffmpeg
media-sound/id3v2
sys-apps/ripgrep
sys-apps/fd
app-arch/libarchive
media-gfx/inkscape
app-office/libreoffice
media-gfx/gifsicle
dev-lang/python
dev-python/pip
dev-lang/go
dev-lang/rust
app-office/unoconv
dev-lang/ruby
app-text/calibre
dev-util/wabt
app-arch/unar
app-arch/atool
app-arch/p7zip
app-arch/zip
app-arch/unzip
app-arch/zstd
app-arch/xz-utils
app-arch/bzip2
virtual/jdk
dev-java/maven-bin
net-libs/nodejs
app-text/qpdf
app-text/poppler
app-text/mupdf
app-text/ghostscript-gpl"
DEPEND=""
BDEPEND=""

# metapackage — no src to fetch.
S="${WORKDIR}"

src_install() {
  # metapackage — owns no files.
  :
}
