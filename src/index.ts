import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, continuedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const ednLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Map: continuedIndent({except: /^\s*\}/}),
        Array: continuedIndent({except: /^\s*\]/})
      }),
      foldNodeProp.add({
        "Map Array": foldInside
      }),
      styleTags({
        'PropertyKey!': t.propertyName,
        Nil: t.null,
        Boolean: t.bool,
        String: t.string,
        Number: t.number,
        ",": t.comment,
        "[ ] ( )": t.squareBracket,
        "{ }": t.brace
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["[", "{", '"', '(']},
    indentOnInput: /^\s*[\}\]\)]$/
  }
})

export function edn() {
  return new LanguageSupport(ednLanguage)
}

export { ednParseLinter } from './lint';
