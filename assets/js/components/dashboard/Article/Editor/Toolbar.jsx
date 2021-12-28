import React from 'react';
import { useEditor } from 'slate-react';
import { Editor, Range, Transforms } from 'slate';

export default function Toolbar() {
  // Get the instance of the editor
  const editor = useEditor();

  /**
   * Check if a style is active on the selected element
   * @param {Editor} editor
   * @param {string} style
   * @returns boolean
   */
  const isStyleActive = (editor, style) => {
    const styles = Editor.marks(editor);

    return styles[style] === true;
  };

  /**
   * Toggle the style of an inline element
   * @param {string} style
   */
  const toggleStyle = (style) => {
    if (isStyleActive(editor, style)) {
      Editor.removeMark(editor, style);
    } else {
      Editor.addMark(editor, style, true);
    }
  };

  /**
   * Check if a block has an active format
   * @param {string} format
   * @returns boolean
   */
  const isBlockActive = (format) => {
    const selectedNode = getSelectedNode();

    return selectedNode.type === format;
  };

  /**
   * Toggle the format of a Node (block) element
   * @param {string} format
   * @returns void
   */
  const toggleBlock = (format) => {
    const isActive = isBlockActive(format);
    const selectedNode = getSelectedNode();

    if (!selectedNode) return;

    Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : format,
    });
  };

  /**
   * Return the selected node if there is currently one
   * @returns Node | false
   */
  const getSelectedNode = () => {
    /**
     * https://www.smashingmagazine.com/2021/05/building-wysiwyg-editor-javascript-slatejs/#locations-and-selection
     * Selection is an object with 2 keys :
     * Anchor : where user’s selection began
     * Focus : where user’s selection ended
     * Each keys has a 'Path' key : an array that provide the position of the node in the document(start from 0) : eg Path [0, 3] rpresents the 4th child node of the first node in the document.
     * And each keys has also a key 'offset' : the position of the selection in the selected node
     */
    const { selection } = editor;

    if (selection === null) return false;

    /** start is an object with a 'path' array */
    const [start] = Range.edges(selection);

    const [selectedNode] = Editor.node(editor, [start.path[0]]);

    return selectedNode;
  };

  /**
   * Toolbar Button JSX component
   * @param {Object} props
   * @returns JSX
   */
  const ToolbarButton = ({ title, format, isBlock = true, icon = null }) => {
    const toggle = (event) => {
      event.preventDefault();

      return isBlock ? toggleBlock(format) : toggleStyle(format);
    };

    return (
      <span
        className="toolbar__button"
        onMouseDown={(e) => toggle(e, format)}
        role="menuitem"
        tabIndex="0"
      >
        {title}
      </span>
    );
  };

  /**
   * Render the element
   */
  return (
    <menu className="toolbar__container">
      <div className="toolbar__titles">
        <ToolbarButton title="H1" format="h1" />
        <ToolbarButton title="H2" format="h2" />
        <ToolbarButton title="H3" format="h3" />
        <ToolbarButton title="H4" format="h4" />
        <ToolbarButton title="H5" format="h5" />
        <ToolbarButton title="H6" format="h6" />
      </div>
      <div className="toolbar__elements">
        <ToolbarButton title="Quote" format="blockquote" />
        <ToolbarButton title="Code" format="code" />
      </div>
      <div className="toolbar__leafs">
        <ToolbarButton title="Bold" format="bold" isBlock={false} />
        <ToolbarButton title="Italic" format="italic" isBlock={false} />
        <ToolbarButton title="Underline" format="underline" isBlock={false} />
        <ToolbarButton title="Strike" format="strike" isBlock={false} />
      </div>
    </menu>
  );
}
