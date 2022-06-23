<h1 align="center">Multi Step form with llama-forms-react</h1>

```js
import LlamaForm from "llama-forms-react";
export default function Example() {
  return (
    <LlamaForm
      schema={{
        title: "Registration Form",
        description: "This is a registration form",
        wizard: true,
        wizardOptions: {
          1: {
            title: "Login",
            description: "Login Form",
            onNext: login_test,
          },
          2: {
            title: "Register",
            description: "Register Form",
            onNext: login_test,
          },
          3: {
            title: "Registersas",
            description: "Register Form",
            onNext: login_test,
          },
          5: {
            title: "Forgot Password",
            description: "Forgot Password Form",
            onNext: login_test,
          },
        },
        progressBar: {
          show: true,
          color: "",
          height: "",
          width: "100%",
          text: "",
          textAlign: "",
          textColor: "",
          subProgress: true,
          align: "",
        },
        buttons: {
          previous: {
            text: "Previous",
            loader: false,
          },
          next: {
            text: "Next",
            loader: true,
          },
          submit: {
            text: "Done",
            loader: true,
          },
        },
        initialStep: 1,
        properties: {
          firstName: {
            type: "string",
            step: 1,
          },
          lastName: {
            type: "string",
            step: 1,
          },
          email: {
            type: "string",
            required: true,
            step: 2,
          },
          password: {
            type: "string",
            required: true,
            step: 2,
          },
          dob: {
            type: "string",
            step: 1,
          },
          address: {
            type: "string",
            step: 3,
          },
          city: {
            type: "string",
            step: 3,
          },
          state: {
            type: "string",
            step: 3,
          },
          zip: {
            type: "string",
            step: 3,
          },
        },
      }}
      options={{
        fields: {
          firstName: {
            type: "text",
            label: "First Name",
            placeholder: "Enter your first name",
            description: "Enter your first name",
            maxLength: 20,
          },
          lastName: {
            type: "text",
            label: "Last Name",
            placeholder: "Enter your last name",
            description: "Enter your last name",
            maxLength: 20,
          },
          email: {
            type: "email",
            label: "Email",
            placeholder: "Enter your email",
            description: "Enter your email",
            autoFocus: true,
          },
          password: {
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            description: "Enter your password",
          },
          dob: {
            type: "date",
            label: "Date of Birth",
            placeholder: "Enter your date of birth",
            description: "Enter your date of birth",
          },
          address: {
            type: "text",
            label: "Address",
            placeholder: "Enter your address",
            description: "Enter your address",
          },
          city: {
            type: "text",
            label: "City",
            placeholder: "Enter your city",
            description: "Enter your city",
          },
          state: {
            type: "text",
            label: "State",
            placeholder: "Enter your state",
            description: "Enter your state",
          },
          zip: {
            type: "number",
            label: "Zip",
            placeholder: "Enter your zip",
            description: "Enter your zip",
            maxLength: 5,
          },
        },
      }}
    />
  );
}
```
