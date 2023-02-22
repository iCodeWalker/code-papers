import React, {useState, useEffect, useRef} from 'react';
import MDEditor from '@uiw/react-md-editor';

import './text-editor.css';
import {Cell} from '../state/cell';
import {useActions} from '../hooks/useActions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {updateCell} = useActions();

  const textEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        textEditorRef.current &&
        event.target &&
        textEditorRef.current.contains(event.target as Node)
      ) {
        // console.log('Ediotr is clicked');
        return;
      }

      //   console.log('Clicked outside editor')
      setIsEditing(false);
    };

    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click', listener, {capture: true});
    };
  }, []);

  if (isEditing) {
    return (
      <div className="text-editor" ref={textEditorRef}>
        <MDEditor
          value={cell.data}
          onChange={val => updateCell(cell.id, val || '')}
        />
      </div>
    );
  }

  return (
    <div
      className="text-editor-markdown card"
      onClick={() => setIsEditing(true)}>
      <div className="">
        <MDEditor.Markdown source={cell.data || 'Click here to make notes'} />
      </div>
    </div>
  );
};

export default TextEditor;
