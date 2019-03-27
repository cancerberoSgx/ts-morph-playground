import * as React from 'react'
import * as monaco from 'monaco-editor'
import { File, State } from '../store/types'
import { connect } from 'react-redux'
import { isDesktop } from '../util/style'

interface P {
  files: File[]
  selectedFile: File
  // onModelChange
  // onCursorPositionChange
}

class MonacoEditor extends React.Component<P, {}> {
  containerEl: React.RefObject<HTMLDivElement>
  constructor(p: P, s: {}) {
    super(p, s)
    this.containerEl = React.createRef<HTMLDivElement>()
  }
  componentDidUpdate() {
    this.installEditor()

    // document.querySelector('#editorContainer')!.replaceWith(getMonacoInstance()!.getDomNode()!.parentNode!)
    // getMonacoInstance()!.layout()
  }

  componentDidMount() {
    this.installEditor()
    // // const editor = getMonacoInstance()
    // editor!.getModel()!.onDidChangeContent(throttle(this.modelChanged, 3000, {trailing: true}))
    // editor!.onDidChangeCursorPosition(throttle(this.cursorChangedPosition, 3000, {trailing: true}))
    // this.modelChanged()
  }

  render() {
    return <div id="editorContainer" className="editorContainer" ref={this.containerEl} />
  }

  private modelChanged() {
    // const editor = getMonacoInstance()
    // dispatch({
    //   type: EDITOR_ACTION.EDITOR_MODEL_CHANGED,
    //   payload: {
    //     code: editor!.getModel()!.getValue(),
    //     version: editor!.getModel()!.getVersionId(),
    //   },
    // })
  }

  private cursorChangedPosition(e: monaco.editor.ICursorPositionChangedEvent) {
    // dispatch({
    //   type: EDITOR_ACTION.EDITOR_CHANGED_CURSOR_POSITION,
    //   payload: {
    //     column: e.position.column,
    //     lineNumber: e.position.lineNumber,
    //   },
    // }
  }

  static editor: monaco.editor.IStandaloneCodeEditor | undefined
  static setEditorFile(file: File) {
    if (!file) {
      debugger
    }
    const model = monaco.editor.getModels().find(m => m.uri.toString() === MonacoEditor.buildModelUrl(file))
    MonacoEditor.editor!.setModel(model!)
  }
  protected installEditor() {
    if (MonacoEditor.editor) {
      const models = monaco.editor.getModels().map(m => m.uri.toString())
      // .find(m=>m.uri.toString().endsWith())
      this.props.files
        .filter(f => !models.includes(MonacoEditor.buildModelUrl(f)))
        .forEach(f => {
          monaco.editor.createModel(f.content, 'typescript', monaco.Uri.parse(`file://${f.filePath}`))
        })
      return
    }

    const containerEl = this.containerEl.current
    if (!containerEl) {
      return
    }

    this.props.files.forEach(f =>
      monaco.editor.createModel(f.content, 'typescript', monaco.Uri.parse(MonacoEditor.buildModelUrl(f)))
    )
    // const file = this.props.files[0]

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2018,
      // allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ['node_modules/@types'],
      jsx: monaco.languages.typescript.JsxEmit.React
      // jsxFactory: 'JSXAlone.createElement',
    })

    MonacoEditor.editor = monaco.editor.create(containerEl, {
      model: monaco.editor
        .getModels()
        .find(m => m.uri.toString() === MonacoEditor.buildModelUrl(this.props.selectedFile)),
      language: 'typescript',
      // theme,
      wordWrap: 'on',
      lineNumbers: isDesktop() ? 'on' : 'off',
      glyphMargin: isDesktop(),
      folding: isDesktop(),
      minimap: isDesktop()
        ? undefined
        : {
            enabled: false
          }
    })

    // monaco.editor.createModel(jsx_alone_core_d_ts, 'typescript', monaco.Uri.parse('file:///index.d.ts'))

    // jsxSyntaxHighlightInstall()

    // return editor
  }
  static buildModelUrl(f: File): string {
    return `file://${f.filePath}`
  }

  // private getMonacoTheme(name = this.props.layout.theme.name): string {
  //   this.lastTheme = name === 'dark' ? 'vs-dark' : 'vs'
  //   return this.lastTheme
  // }
}

export const Editor = connect((state: State) => ({
  // editor: state.editor,
  // layout: state.layout,
  files: [...state.files, ...state.examples],
  selectedFile: state.selectedFile
}))(MonacoEditor)

// document.querySelector('#editorContainer')!.replaceWith(getMonacoInstance()!.getDomNode()!.parentNode!)
// getMonacoInstance()!.layout()
