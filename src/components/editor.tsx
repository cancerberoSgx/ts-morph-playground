import * as React from 'react'
import * as monaco from 'monaco-editor'
import { File, State } from '../store/types'
import { connect } from 'react-redux'
import { isDesktop } from '../util/style'
import { EXAMPLES_ACTIONS } from '../store/examples'
import { dispatch } from '..'
import { FILES_ACTIONS } from '../store/files'
import { ts_morph_d_ts } from '../examples/ts_morph_d_ts';

interface P {
  files: File[]
  selectedFile: File
}

class MonacoEditor extends React.Component<P, {}> {

  static editor: monaco.editor.IStandaloneCodeEditor | undefined

  static setEditorFile(file: File) {
    if (!file) {
      debugger
    }
    const model = monaco.editor.getModels().find(m => m.uri.toString() === MonacoEditor.buildModelUrl(file))
    MonacoEditor.editor!.setModel(model!)
  }

  private static buildModelUrl(f: File|string): string {
    return `file://${typeof f==='string' ? f : f.filePath}`
  }

  private containerEl: React.RefObject<HTMLDivElement>

  constructor(p: P, s: {}) {
    super(p, s)
    this.containerEl = React.createRef<HTMLDivElement>()
  }

  componentDidUpdate() {
    this.installEditor()
  }

  componentDidMount() {
    this.installEditor()
    MonacoEditor.editor!.getModel()!.onDidChangeContent(e => this.modelChanged())
  }

  render() {
    return <div id="editorContainer" className="editorContainer" ref={this.containerEl} />
  }

  private modelChanged() {
    const model = MonacoEditor.editor!.getModel()!
    if (model.uri.path.includes('src/')) {
      dispatch({
        type: FILES_ACTIONS.EDIT,
        content: model.getValue()
      })
    } else {
      dispatch({
        type: EXAMPLES_ACTIONS.EDIT,
        content: model.getValue()
      })
    }
  }

  protected installEditor() {
    if (MonacoEditor.editor) {
      const models = monaco.editor.getModels().map(m => m.uri.toString())
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
    monaco.languages.typescript.typescriptDefaults.addExtraLib(ts_morph_d_ts,   'lib/ts-morph.d.ts')
    this.props.files.forEach(f =>
      monaco.editor.createModel(f.content, 'typescript', monaco.Uri.parse(MonacoEditor.buildModelUrl(f)))
    )
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2018,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      baseUrl: '.',
      paths: {
        'ts-morph': ['lib/ts-morph']
      },
      jsx: monaco.languages.typescript.JsxEmit.React
    })
    MonacoEditor.editor = monaco.editor.create(containerEl, {
      model: monaco.editor
        .getModels()
        .find(m => m.uri.toString() === MonacoEditor.buildModelUrl(this.props.selectedFile)),
      language: 'typescript',
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
  }
}

export const Editor = connect((state: State) => ({
  files: [...state.files, ...state.examples],
  selectedFile: state.selectedFile
}))(MonacoEditor)
