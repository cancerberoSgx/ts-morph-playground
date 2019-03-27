import * as React from 'react'
import * as monaco from 'monaco-editor'
import { File, State } from '../store/types'
import { connect } from 'react-redux'
import { isDesktop } from '../util/style'
import { EXAMPLES_ACTIONS } from '../store/examples'
import { dispatch } from '..'
import { FILES_ACTIONS } from '../store/files'
import { ts_morph_d_ts } from '../examples/ts_morph_d_ts'
import { install } from '../monaco/navigateExternalDefinitions'
import { buildModelUrl } from '../monaco/monaco'
import { packedExamples } from '../examples/packedExamples';
import { createStyles } from '../theme/style';
import { Theme } from '../theme/theme';
import withStyles, { WithSheet } from 'react-jss'

interface P extends WithSheet<typeof styles, Theme> {
  files: File[]
  selectedFile: File
}

class MonacoEditor extends React.Component<P, {}> {
  static editor: monaco.editor.IStandaloneCodeEditor | undefined

  static setEditorFile(file: File) {
    const model = monaco.editor.getModels().find(m => m.uri.path === file.filePath)
    MonacoEditor.editor!.setModel(model!)
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
    return <div className={this.props.classes.editor} ref={this.containerEl} />
  }

  private modelChanged() {
    const model = MonacoEditor.editor!.getModel()!
    if (model.uri.path === '/lib/ts-morph.d.ts') {
      return
    }
    if (packedExamples.find(e => e.filePath === model.uri.path)) {
      dispatch({
        type: EXAMPLES_ACTIONS.EDIT,
        content: model.getValue()
      })
    } else {
      dispatch({
        type: FILES_ACTIONS.EDIT,
        content: model.getValue()
      })
    }
  }

  protected installEditor() {
    if (MonacoEditor.editor) {
      const models = monaco.editor.getModels().map(m => m.uri.path)
      this.props.files
        .filter(f => !models.includes(f.filePath))
        .forEach(f => {
          monaco.editor.createModel(f.content, 'typescript', buildModelUrl(f))
        })
      return
    }
    const containerEl = this.containerEl.current
    if (!containerEl) {
      return
    }
    // monaco.languages.typescript.typescriptDefaults.addExtraLib(ts_morph_d_ts,   'file:///lib/ts-morph.d.ts')
    monaco.editor.createModel(ts_morph_d_ts, 'typescript', buildModelUrl('/lib/ts-morph.d.ts'))
    this.props.files.forEach(f => monaco.editor.createModel(f.content, 'typescript', buildModelUrl(f)))
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      libs: ['dom','esnext'],
      baseUrl: '.',
      paths: {
        'ts-morph': ['file:///lib/ts-morph']
      },
      jsx: monaco.languages.typescript.JsxEmit.React
    })
    MonacoEditor.editor = monaco.editor.create(containerEl, {
      model: monaco.editor.getModels().find(m => m.uri.path === this.props.selectedFile.filePath),
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
    install(MonacoEditor.editor!, (editor, model, def) => {
      editor.setModel(model)
      editor.revealPositionInCenter({ column: def.range.startColumn, lineNumber: def.range.startLineNumber })
      editor.setSelection(def.range)
    })
  }
}

const styles = (theme: Theme) =>
  createStyles({
    editor: {
      width: '100%',
      height: '500px'
    }
  })

export const Editor = withStyles(styles)(connect((state: State) => ({
  files: [...state.files, ...state.examples],
  selectedFile: state.selectedFile
}))(MonacoEditor))
