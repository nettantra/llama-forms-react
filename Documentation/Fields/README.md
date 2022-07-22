<h1 align="center">Llama Form Fields</h1>

### text

```jsx
type: "text",
label: "Enter text",
placeholder: "Enter text",
readOnly: false, //default: false
required: true, //default: false
autoFocus: true, //default: false
autoComplete: true, //default: false
hidden: false, //default: false
lowercase : false, //default: false
uppercase: false, //default: false
maxLength: 30,
minLength: 5,
description: "This is text field",
disAllowSpace: false, //default: true
validationRegex:"^[a-zA-Z]+$"
className: "llm-test llm-test2"
```

### textarea

```jsx
type: "textarea",
label: "Enter texts",
placeholder: "Enter text",
readOnly: false, //default: false
required: true, //default: false
autoFocus: true, //default: false
autoComplete: true, //default: false
hidden: false, //default: false
lowercase : false, //default: false
uppercase: false, //default: false
maxLength: 30,
minLength: 5,
description: "This is text field",
rows: 3,
cols: 4,
height: 150px, //minimum height default: 180px
width: 60%, //minimum width default: 95%
className: "llm-test llm-test2"
```