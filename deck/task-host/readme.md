
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<h3 align='center'>@termsurf/task</h3>
<p align='center'>
  Common Actions Interface
</p>

<br/>
<br/>
<br/>

## Summary

Task is a collections of common actions to perform in code. Here are some immediately helpful resources:

- [`ghcr.io/termsurf/task` Docker image](https://ghcr.io/termsurf/task)
- [`task.surf` API docs](https://task.surf)

This is the library that powers [`task.surf`](https://task.surf), an emerging website with lots of digital tools to make it easy for one off manual tasks. Ideally we could run all the tasks like image processing, video processing, etc., directly in the browser through WASM, but unfortunately the technology is not there yet so we need to run server-side code against these robust CLI libraries.

The `task` JavaScript/TypeScript library has these features:

- CLI
- Programmatic Browser API (for where we can do browser tasks)
- Programmatic Node.js API (for everything)

## Installing the Library

Requirements on Mac:

```bash
brew cask install java
brew cask install mactex
brew install calibre
brew install --cask libreoffice
brew install imagemagick
brew install fontforge
brew install ffmpeg
brew install go
brew install unoconv
go install github.com/klauspost/asmfmt/cmd/asmfmt@ef134b9cec704e2b7b336fb02153b7d1a58247da
brew install qpdf
brew install mvn
brew install objconv
brew install wabt
brew install unar
brew install pyenv
brew install jupyter
pip install nbconvert
pip install docx2pdf
```

To use `docx2pdf` you need to have the Microsoft Word app installed on your machine as well.

Requirements for Windows:

```
choco install libreoffice-fresh
choco install imagemagick --version 7.0.10.19
choco install fontforge
choco install ffmpeg
choco install miktex
choco install nodejs
```

Requirements for Linux:

```
sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install texlive-xetex
sudo apt-get install imagemagick
sudo apt-get install libreoffice
sudo apt-get install fontforge
sudo apt-get install inkscape
sudo apt-get install ffmpeg
sudo apt-get install ufraw
sudo apt-get install rar
```

Finally, with these dependencies installed, you can install the act:

```
npm install -g @termsurf/task
```

Docs on each individual possible API function are going to be found eventually at [`task.surf`](https://task.surf).

## Creating Your Own Docker Image

You can link to the Docker image at [`ghcr.io/termsurf/task`](https://ghcr.io/termsurf/task) like this sample `Dockerfile` shows:

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/termsurf/task:latest
RUN mkdir -p /home/app
WORKDIR /home/app
ENV PORT 3000
COPY *.yaml .
COPY *.json .
RUN pnpm install
COPY src/ src
EXPOSE ${PORT}
CMD [ "sh", "-c", "pnpm start"]
```

## TODO

- https://github.com/tensorflow/swift/blob/main/Installation.md
- make a CLI command builder for the various delegations, so the commands can be printed in the UI based on their input.
- https://github.com/jupyter/nbconvert

## License

MIT
