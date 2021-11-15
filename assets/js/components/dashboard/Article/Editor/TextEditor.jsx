import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Transforms, Editor } from 'slate';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { withHistory } from 'slate-history';
import getElements from './Element';
import getLeaf from './Leaf';
import Toolbar from './Toolbar';

import './editor.scss';

const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true, italic: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', code: true },
        { text: '!' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: 'bold', bold: true },
        {
          text: ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Try it out for yourself!' }],
    },
  ]);

  const editText = (content) => {
    setValue(content);
  };

  const renderElement = useCallback((props) => getElements(props), []);
  const renderLeaf = useCallback((props) => getLeaf(props), []);

  return (
    // Slate is a context component
    <Slate editor={editor} value={value} onChange={(text) => editText(text)}>
      <Toolbar />
      {/* Editable is the component that renders the document hierarchy for editing */}
      <Editable
        renderElement={renderElement}
        renderLeaf={(props) => getLeaf(props)}
      />
    </Slate>
  );
};

export default TextEditor;
