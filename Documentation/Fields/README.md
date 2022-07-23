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
validationRegex:"^[a-zA-Z]+$",
errorMessage: "Error occured",
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

### email

```jsx
type: "email",
label: "Enter email",
placeholder: "Enter email",
readOnly: false, //default: false
required: true, //default: false
autoFocus: true, //default: false
autoComplete: true, //default: false
lowercase : false, //default: false
uppercase: false, //default: false
description: "This is text field",
validationRegex: "",
height: 150px, 
width: 60%,
errorMessage: "Error occured",
className: "llm-test llm-test2"
```

### password

```jsx
type: "password",
label: "Enter password",
placeholder: "Enter password",
readOnly: false, //default: false
required: true, //default: false
autoFocus: true, //default: false
autoComplete: true, //default: false
lowercase : false, //default: false
uppercase: false, //default: false
description: "This is text field",
validationRegex: "",
height: 150px, 
width: 60%,
maxlength:"",
errorMessage: "Error occured",
prefix: "",
togglePassword: true, //default: false
className: "llm-test llm-test2"
```

### radio

```jsx
type: "radio",
label: "Select option",
readOnly: false, //default: false
required: true, //default: false
description: "This is text field",
```

### checkbox

```jsx
type: "checkbox",
label: "Check option",
readOnly: false, //default: false
required: true, //default: false
description: "This is text field",
```