import React from 'react';
import { useEditor } from 'slate-react';
import { Editor } from 'slate';

export default function Toolbar() {
  // Get the instance of the editor
  const editor = useEditor();

  const isStyleActive = (editor, style) => {
    const styles = Editor.marks(editor);

    return styles[style] === true;
  };

  const toggleStyle = (event, style) => {
    event.preventDefault();

    if (isStyleActive(editor, style)) {
      Editor.removeMark(editor, style);
    } else {
      Editor.addMark(editor, style, true);
    }
    console.log('style ', style);
    console.log('mark ', Editor.marks(editor));
    console.log('editor ', editor);
    console.log('Editor ', Editor);
  };

  return (
    <menu className="toolbar__container">
      <div className="toolbar__titles">
        <span
          className="toolbar__button"
          onMouseDown={(e) => toggleStyle(e, 'h1')}
          role="menuitem"
          tabIndex="0"
        >
          H1
        </span>
        <span className="toolbar__button">H2</span>
        <span className="toolbar__button">H3</span>
        <span className="toolbar__button">H4</span>
        <span className="toolbar__button">H5</span>
        <span className="toolbar__button">H6</span>
      </div>
      <div className="toolbar__elements">
        <span className="toolbar__button">Code</span>
        <span className="toolbar__button">Image</span>
        <span className="toolbar__button">Quote</span>
      </div>
      <div className="toolbar__leafs">
        <span
          className="toolbar__button"
          onMouseDown={(e) => toggleStyle(e, 'bold')}
          role="menuitem"
          tabIndex="0"
        >
          Bold
        </span>
        <span
          className="toolbar__button"
          onMouseDown={(e) => toggleStyle(e, 'italic')}
          role="menuitem"
          tabIndex="0"
        >
          Italic
        </span>
        <span
          className="toolbar__button"
          onMouseDown={(e) => toggleStyle(e, 'underline')}
          role="menuitem"
          tabIndex="0"
        >
          Underline
        </span>
        <span className="toolbar__button">Line</span>
      </div>
    </menu>
  );
}
