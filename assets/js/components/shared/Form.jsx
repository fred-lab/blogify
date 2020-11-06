import React from 'react';

const Input = ({
  children,
  name,
  value,
  onChange,
  onFocus,
  onKeyUp,
  checked,
  className,
  type,
  placeholder,
  required,
}) => (
  <div className="form-group">
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onKeyUp={onKeyUp}
      checked={checked}
      className={className ? `input-${className}` : 'form-input'}
      placeholder={placeholder}
      required={required}
    />
    <label
      htmlFor={name}
      className={className ? `label-${className}` : 'form-label'}
    >
      {children}
    </label>
  </div>
);

const Checkbox = ({ children, name, value, onChange, checked }) => (
  <Input
    type="checkbox"
    id={name}
    name={name}
    value={value}
    onChange={onChange}
    checked={checked}
    className="checkbox"
  >
    {children}
  </Input>
);

const Switch = ({ children, name, value, onChange, checked }) => (
  <Input
    type="checkbox"
    id={name}
    name={name}
    value={value}
    onChange={onChange}
    checked={checked}
    className="switch"
  >
    {children}
  </Input>
);

const TextArea = ({
  name,
  className,
  placeholder,
  autofocus,
  disabled = false,
}) => (
  <textarea
    id={name}
    className={`form-textarea + ${className}`}
    name={name}
    placeholder={placeholder}
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus={autofocus}
    disabled={disabled}
  />
);

export { Input, Checkbox, Switch, TextArea };
