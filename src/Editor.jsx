import React, { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, insertTab } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import { nord } from "cm6-theme-nord";

const indentWithTab = {
  key: "Tab",
  run: insertTab,
};

const theme = {
  "&": {
    backgroundColor: "#36363600"
  }
}

const extensions = [
  basicSetup,
  keymap.of([defaultKeymap, indentWithTab]),
  json(),
  EditorState.tabSize.of(3),
  EditorView.theme(theme),
  nord,
];

export default function Editor({ panelValue, setPanelValue }) {
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current === "null") return;

    const state = EditorState.create({
      doc: panelValue,
      extensions: [
        ...extensions,
        EditorView.updateListener.of((view) => {
          if (view.docChanged) {
            setPanelValue(view.state.doc);
          }
        })
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [editorRef, panelValue]);

  return <section ref={editorRef} className="w-full rounded-lg mb-2 overflow-hidden bg-[#2b2b2b5d] border border-white/10"></section>;
}
