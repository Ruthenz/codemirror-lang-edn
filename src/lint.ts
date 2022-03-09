import {Diagnostic} from "@codemirror/lint"
import {EditorView} from "@codemirror/view"
import EDN from 'edn-parser';

/// Calls
/// [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
/// on the document and, if that throws an error, reports it as a
/// single diagnostic.
export const ednParseLinter = () => (view: EditorView): Diagnostic[] => {
  try {
    EDN.parse(view.state.doc.toString())
  } catch (e) {
    if (!(e instanceof SyntaxError)) throw e;
    return [{
      message: e.message,
      severity: 'error',
      from: -1,
      to: -1
    }]
  }
  return [];
}
