// import * as React from 'react'
// import * as monaco from 'monaco-editor'
// import {getMonacoInstance, installEditor} from '../monaco/monaco'
// import {EDITOR_ACTION} from '../store/editor'
// import {dispatch, getState} from '../store/store'
// import {State, Layout, Editor as EditorS} from '../store/types'
// import {registerStyle} from '../style/styles'
// import {throttle} from '../util/throttle'
// import {query} from '../util/util'
// import {Component} from './util/component'
// import {css, height} from '../util/media'
// import {connect} from 'react-redux'

// interface P {
//   layout: Layout
//   editor: EditorS
// }
// interface S {}
// registerStyle(`
// ${css(
//   `.editorExplorerBody.is-horizontal #editorContainer`,
//   `height: ${height() - 100}px;`,
//   `height: ${height() - 160}px;`,
// )}

// ${css(
//   `.editorExplorerBody.is-vertical #editorContainer`,
//   `height: ${height() / 2.2}px;`,
//   `height: ${height() / 2.2}px;`,
// )}

// `)

// class Editor_ extends Component<P, S> {
//   private lastTheme: string = 'vs'

//   constructor(p: P, s: S) {
//     super(p, s)
//     this.modelChanged = this.modelChanged.bind(this)
//     this.cursorChangedPosition = this.cursorChangedPosition.bind(this)
//   }

//   componentDidUpdate() {
//     if (this.props.layout.theme.name !== this.lastTheme) {
//       monaco.editor.setTheme(this.getMonacoTheme())
//     }
//   }

//   async componentDidMount() {
//     const editor = await installEditor(this.props.editor.code, this.getMonacoTheme(), query('#editorContainer'))
//     // const editor = getMonacoInstance()
//     editor!.getModel()!.onDidChangeContent(throttle(this.modelChanged, 3000, {trailing: true}))
//     editor!.onDidChangeCursorPosition(throttle(this.cursorChangedPosition, 3000, {trailing: true}))
//     this.modelChanged()
//   }

//   render() {
//     return <div id="editorContainer" className="editorContainer" />
//   }

//   private modelChanged() {
//     // if (this.props.state.options.autoApply || !respectAutoApplyOption) {
//     const editor = getMonacoInstance()
//     dispatch({
//       type: EDITOR_ACTION.EDITOR_MODEL_CHANGED,
//       payload: {
//         code: editor!.getModel()!.getValue(),
//         version: editor!.getModel()!.getVersionId(),
//       },
//     })
//     // }
//   }

//   private cursorChangedPosition(e: monaco.editor.ICursorPositionChangedEvent) {
//     // if(this.props.state.compiled.explorer && !this.props.state.compiled.explorer!.disableEditorBind) {
//     dispatch({
//       type: EDITOR_ACTION.EDITOR_CHANGED_CURSOR_POSITION,
//       payload: {
//         column: e.position.column,
//         lineNumber: e.position.lineNumber,
//       },
//     })
//     // }
//   }

//   private getMonacoTheme(name = this.props.layout.theme.name): string {
//     this.lastTheme = name === 'dark' ? 'vs-dark' : 'vs'
//     return this.lastTheme
//   }
// }
// export const Editor = connect((state: State) => ({
//   editor: state.editor,
//   layout: state.layout,
// }))(Editor_)

// // document.querySelector('#editorContainer')!.replaceWith(getMonacoInstance()!.getDomNode()!.parentNode!)
//       // getMonacoInstance()!.layout()
