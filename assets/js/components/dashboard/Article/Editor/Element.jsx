import React from 'react';

export default function getElements({ element, children, attributes }) {
  switch (element.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'code':
      return <code {...attributes}>{children}</code>;
    case 'h1':
      return <h1 {...attributes}>{children}</h1>;
    case 'h2':
      return <h2 {...attributes}>{children}</h2>;
    case 'h3':
      return <h3 {...attributes}>{children}</h3>;
    case 'h4':
      return <h4 {...attributes}>{children}</h4>;
    case 'h5':
      return <h5 {...attributes}>{children}</h5>;
    case 'h6':
      return <h6 {...attributes}>{children}</h6>;
    case 'h6':
      return <h6 {...attributes}>{children}</h6>;
    default:
      return <p {...attributes}>{children}</p>;
  }
}
