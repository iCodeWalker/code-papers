import React, {useRef} from 'react';
import MonacoEditor, {EditorDidMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel'; // for pasring and formating js code

import './code-editor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    // first argumnet is the function that we can use to get the current value of the editor (getValue)
    // second argumnet is the reference to the monaco editor itself
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      // using this we can get access of current values in the code editor
      // console.log(getValue())

      onChange(getValue());
    });

    // updating tab size to 2 spaces
    monacoEditor.getModel()?.updateOptions({tabSize: 2});
  };

  const onFormatClick = () => {
    // console.log(editorRef.current);

    // get current value from editor
    const unformatedValue = editorRef.current.getModel().getValue();
    // format that value
    const formatedValue = prettier.format(unformatedValue, {
      parser: 'babel',
      plugins: [parser],
      semi: true,
      singleQuote: true,
    });
    // set the formatted value back in the editor

    editorRef.current.setValue(formatedValue);
  };

  return (
    <div className="editor-container">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}>
        format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount} // function that runs when editor is first displayed on the screen
        value={initialValue} // used for initial value only. At time of initialization
        language="javascript"
        theme="dark"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: {enabled: false},
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true, // formats code automatically when window is shrinked or expanded
        }}
      />
    </div>
  );
};

export default CodeEditor;
