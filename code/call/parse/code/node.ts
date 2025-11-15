// import Parser from 'tree-sitter'
// import JavaScript from 'tree-sitter-javascript'
// import Swift from 'tree-sitter-swift'
// import fsp from 'fs/promises'

// // compileToAsm({
// //   input: {
// //     format: 'js',
// //     file: { path: 'test/file/code/quicksort/quicksort' },
// //   },
// // })

// // compileToAsm({
// //   input: {
// //     format: 'js',
// //     file: { path: 'test/file/code/quicksort/quicksort.swift' },
// //   },
// // })

// const TREE_SITTER_LANGUAGE: Record<string, any> = {
//   js: JavaScript,
//   swift: Swift,
// }

// export async function compileToAsm(input: CompileToAst) {
//   const parser = new Parser()
//   parser.setLanguage(TREE_SITTER_LANGUAGE[input.input.format])
//   const code = await fsp.readFile(input.input.file.path, 'utf-8')
//   const tree = parser.parse(code)
//   return traverse(tree.rootNode)

//   function traverse(node) {
//     const out: any = {
//       form: node.type,
//       base: node.startPosition,
//       head: node.endPosition,
//     }
//     if (node.type.match(/^[\w_]+$/)) {
//       switch (node.type) {
//         case 'identifier':
//         case 'number':
//         case 'string':
//         case 'comment':
//         case 'string_fragment':
//         case 'template_string':
//         case 'simple_identifier':
//         case 'var':
//         case 'let':
//         case 'const':
//         case 'true':
//         case 'return':
//         case 'false':
//           out.text = node.text
//           break
//       }
//     } else {
//       out.text = node.text
//     }
//     if (node.children?.length) {
//       out.nest = []
//       for (const child of node.children) {
//         out.nest.push(traverse(child))
//       }
//     }
//     return out
//   }
// }

// function define(
//   lang: string,
//   build: (x) => Array<string>,
//   run: (cmd: Array<string>) => Promise<void>,
// ) {
//   const IO = BuildBaseFileInputOutputModel.superRefine(
//     transform_input_output_file(lang, lang),
//   )

//   CALL_CODE[String(`/${lang}/format`)] = async (source: any) => {
//     const input = IO.parse(source)
//     const cmd = build(input)
//     await run(cmd)
//   }
// }

// define('kotlin', FormatKotlin, runFormatKotlinCommand)
// define('swift', FormatSwift, runFormatSwiftCommand)
// define('rust', FormatRust, runFormatRustCommand)
// define('python', FormatPython, runFormatPythonCommand)
// define('ruby', FormatRuby, runFormatRubyCommand)
// define(
//   'assembly',
//   FormatAssembly,
//   runFormatAssemblyCommand,
// )
// define('c', FormatC, runFormatCCommand)
// define('cpp', FormatCpp, runFormatCCommand)
// define('java', FormatJava, runFormatCCommand)

//  CSharp: .cs
//  Java: .java
//  JavaScript: .mjs .js .ts
//  Json: .json
//  Objective-C: .m .mm
//  Proto: .proto .protodevel
//  TableGen: .td
//  TextProto: .textpb .pb.txt .textproto .asciipb
//  Verilog: .sv .svh .v .vh

// cargo rustc --release -- --emit asm
// rustc --emit=asm
// rustc --emit=llvm-ir
// cargo rustc -- --emit=llvm-ir

// objdump -S --x86-asm-syntax=intel example.out
// objdump -f assert
// objdump -x assert
