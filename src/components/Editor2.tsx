// import * as React from 'react'
// import * as monaco from 'monaco-editor'
// import { File, State } from '../store/types';
// import { isDesktop } from './util';
// import { connect } from 'react-redux';

// interface P {
//   files: File[]
//   // onModelChange
//   // onCursorPositionChange
// }
// interface S {}

// class Editor_ extends React.Component<P, {}> {
 
//   containerEl: React.RefObject<HTMLDivElement>
//   constructor(p: P, s: {}){
//     super(p, s)
//     this.containerEl = React.createRef<HTMLDivElement>()
//   }
//   componentDidUpdate() {
//     this.installEditor()

//     // document.querySelector('#editorContainer')!.replaceWith(getMonacoInstance()!.getDomNode()!.parentNode!)
//       // getMonacoInstance()!.layout()
//   }

//  componentDidMount() {
//     this.installEditor()
//     // // const editor = getMonacoInstance()
//     // editor!.getModel()!.onDidChangeContent(throttle(this.modelChanged, 3000, {trailing: true}))
//     // editor!.onDidChangeCursorPosition(throttle(this.cursorChangedPosition, 3000, {trailing: true}))
//     // this.modelChanged()
//   }

//   render() {
//     return <div id="editorContainer" className="editorContainer" ref={this.containerEl}/>
//   }

//   private modelChanged() {
//     // const editor = getMonacoInstance()
//     // dispatch({
//     //   type: EDITOR_ACTION.EDITOR_MODEL_CHANGED,
//     //   payload: {
//     //     code: editor!.getModel()!.getValue(),
//     //     version: editor!.getModel()!.getVersionId(),
//     //   },
//     // })
//   }

//   private cursorChangedPosition(e: monaco.editor.ICursorPositionChangedEvent) {
//     // dispatch({
//     //   type: EDITOR_ACTION.EDITOR_CHANGED_CURSOR_POSITION,
//     //   payload: {
//     //     column: e.position.column,
//     //     lineNumber: e.position.lineNumber,
//     //   },
//     // }
//   }

// protected editor: monaco.editor.IStandaloneCodeEditor | undefined
// protected installEditor() {
//   if (this.editor) {
//     return this.editor
//   }

//   const containerEl = this.containerEl.current
//   if(!containerEl) {
//     return 
//   }

//   const file = this.props.files[0]

//   monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//     target: monaco.languages.typescript.ScriptTarget.ES2018,
//     // allowNonTsExtensions: true,
//     moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
//     module: monaco.languages.typescript.ModuleKind.CommonJS,
//     noEmit: true,
//     typeRoots: ['node_modules/@types'],
//     jsx: monaco.languages.typescript.JsxEmit.React,
//     // jsxFactory: 'JSXAlone.createElement',
//   })

//   this.editor = monaco.editor.create(containerEl, {
//     model: monaco.editor.createModel(file.content, 'typescript', monaco.Uri.parse(`file://${file.filePath}`)),
//     language: 'typescript',
//     // theme,
//     wordWrap: 'on',
//     lineNumbers: isDesktop() ? 'on' : 'off',
//     glyphMargin: isDesktop(),
//     folding: isDesktop(),
//     minimap: isDesktop()
//       ? undefined
//       : {
//           enabled: false,
//         },
//   })

//   // monaco.editor.createModel(jsx_alone_core_d_ts, 'typescript', monaco.Uri.parse('file:///index.d.ts'))

//   // jsxSyntaxHighlightInstall()

//   // return editor
// }



//   // private getMonacoTheme(name = this.props.layout.theme.name): string {
//   //   this.lastTheme = name === 'dark' ? 'vs-dark' : 'vs'
//   //   return this.lastTheme
//   // }
  
// }

// export const Editor = connect((state: State) => ({
//   // editor: state.editor,
//   // layout: state.layout,
//   files: [...state.files, ...state.examples]
// }))(Editor_)




// // document.querySelector('#editorContainer')!.replaceWith(getMonacoInstance()!.getDomNode()!.parentNode!)
//       // getMonacoInstance()!.layout()
