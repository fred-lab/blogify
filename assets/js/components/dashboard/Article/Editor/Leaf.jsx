import React from 'react';

export default function getLeaf({ attributes, children, leaf }) {
  const { bold, italic, underline, strike } = leaf;

  let el = <>{children}</>;

  if (bold) {
    el = <strong>{el}</strong>;
  }
  if (italic) {
    el = <em>{el}</em>;
  }
  if (underline) {
    el = <u>{el}</u>;
  }
  if (strike) {
    el = <s>{el}</s>;
  }

  return <span {...attributes}>{el}</span>;
}
