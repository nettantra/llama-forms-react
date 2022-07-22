<h1 align="center">Welcome to llama-forms-react 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/llama-forms-react" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/llama-forms-react.svg">
  </a>
  <a href="https://github.com/nettantra/llama-forms-react#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/nettantra/llama-forms-react/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> An HTML-free component for React form creation that employs a JSON structure to support a variety of form fields with a simple user interface. Simply import LlamaForm from llama-form to get a great form that is driven by JSON schema.

**Content**

- [Install](#install)
- [Features](#features)
- [Quickstart](#quickstart)
- [Fields](Documentation/Fields/README.md)
- [Multi Step Form](Documentation/MultiStep/README.md)
- [Examples](#Examples)
- [Documentation](#documentation)
- [Maintainers](#maintainers)

## Install

```sh
npm i llama-forms-react
```

## Features

- Simple to use
- Form based on a schema
- Validation regex support
- Form answer in JSON format
- Submit button with loader that may be customized
- Form submission callback function support
- Custom errorMessage support
- Support for sensitivity validation
- Custom style support
- multi-step form with:
  - Progress bar
  - Current step count with respective to total step
  - User defined initial step (Default is 1)
  - Callback function on each step submission

## Quickstart

**Create a Login Form using Llama Form**

```js
import LlamaForm from "llama-forms-react";

export default function Example() {
  const handleLogin = (data) => {
    console.log("Login data", data);
  };

  return (
    <LlamaForm
      schema={{
        title: "Login Form Example",
        description:
          "This is an example of a login form using llama-forms-react.",
        wizard: false, // optional (true for multi-step forms)
        properties: {
          email: {
            type: "string",
            required: true,
          },
          password: {
            type: "string",
            required: true,
          },
        },
      }}
      options={{
        fields: {
          email: {
            type: "email",
            label: "User Email",
            placeholder: "Your email address",
            description: "Email field description",
            validationRegex: "", // validation regex for the input field
            errorMessage: "Email field validation error",
            readOnly: false, // (defaults to false)
            maxLength: 30,
            autoFocus: true,
            autoComplete: true,
          },
          password: {
            type: "password",
            label: "User Passsword",
            placeholder: "Your password Please",
            description: "Password field description",
            validationRegex: "",
            errorMessage: "Password field validation error",
            readOnly: false,
            autoFocus: false,
            autoComplete: true,
          },
        },
      }}
      onSubmit={handleLogin}
    />
  );
}
```

## Documentation

### Main Props

> **schema:** The form's foundation, where you may provide a json schema for the form's creation.

> **options:** Field properties for the provided schema.

> **data:** Form field default values

> **onSubmit:** A callback that accepts a function and returns the form data.

### Schema Props

1. **title:** Title of the form.
2. **description:** Descripton of the form.
3. **wizard:** Option to enable multi-step form, default is `false`.
4. **properties:** Dynamic custom field which you want to render in form.
   - **required:** Specific field is requirement, default value is false.
   - **enum:** For option values, this property is applicable for dropdown fields, checkbox fields, radio fields, etc.
   - **step:** Specify the field position on multistep form. For instance, if the step value is 2 then that field will occur on the second step of the form, deafult value is 1.

### Options Props

Here we pass all schema fields properties. Which basically contains an object for each field that we describe in the schema.

1. **fields:**
   - **type:** Type of input field, as for email we use "type - email".
     **Input Field type support by llama-forms-react.**
     1. text - text field
     2. textarea - text area field
     3. email - email field
     4. password - password field
     5. radio - radio button is used to select one option in multiple options.
     6. checkbox - This is used to select multiple options.
     7. dropdown - This is used for dropdown value. Here we pass multiple values.
     8. color - This is used as color picker
     9. file - This is used for uploading files.
     10. number - number filed.
     11. range - This is used to set a range between two values.
     12. tel - This is used for telephone number input.
     13. time - time field
     14. date - date field
     15. datetime-local - This is used for both date and time at a time.
     16. week- week field
     17. month - month field
     18. uri - This is used for input URI.
   - **label:**
   - **placeholder:**
   - **description:** Description of input field.
   - **validationRegex:** Custome regex to input field validation.
   - **errorMessage:**
   - **readOnly:**
   - **maxLength:**
   - **autoFocus:**
   - **autoComplete:**
   - **maxFileSize:**
   - **minFileSize:**
   - **min:** Minimum value of the input field.
   - **max:** TMaximum value of the input field.
   - **interval:** Applicaple with **range** input field type, we can specify interval between two values.
   - **accept:** Applicaple with **file** input field type, we can specify the acceptable file extension. ex - ["jpg", "png", "jpeg"]

## Author

👤 **NetTantra Technologies React Developers (https://github.com/orgs/nettantra/teams/llama-forms-core)**

- Website: www.nettantra.com
- Github: [@nettantra](https://github.com/nettantra)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/nettantra/llama-forms-react/issues).

## Show your support

Give a ⭐️ if this [project](https://github.com/nettantra/llama-forms-react) helped you!

## 📝 License

Copyright © 2022 [NetTantra Technologies](https://github.com/nettantra).<br />
This project is [MIT](https://github.com/nettantra/llama-forms-react/blob/master/LICENSE) licensed.

---
