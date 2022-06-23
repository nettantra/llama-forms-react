<h2 align="center">Student Registration Form with llama-forms-react</h2>

```JS
import LlamaForm from "llama-forms-react";

export default function Example() {

  const handleRegistration = (data) => {
    console.log("Registration data,", data)
  }
  return (
    <div style={{ width: "50%", margin: "auto", color: "green" }}>
      <LlamaForms
        schema={{
          type: 'object',
          description: 'Student Registration Form',
          wizard: false, //true,
          properties: {
            FirstName: {
              type: 'string',
              required: true,
              enum: "",
              step: 1,
            },
            MiddleName: {
              type: 'string',
              required: true,
              enum: "",
              step: 1,
            },
            LastName: {
              type: 'string',
              required: true,
              enum: "",
              step: 1,
            },
            email: {
              type: 'string',
              required: true,
              enum: "",
              step: 1,
            },
            password: {
              type: 'string',
              required: true,
              enum: "",
              step: 2,
            },

            image: {
              type: 'string',
              required: true,
              step: 1,
            },

            gender: {
              type: 'string',
              required: true,
              enum: {
                Male: 'male',
                Female: 'female',
                Unknown: 'unknown'
              },
              step: 5,
            },
            dob: {
              type: 'string',
              required: true,
            },

          }
        }}
        options={{
          type: 'object',
          fields: {
            FirstName: {
              type: "String",
              label: "FirstName",
              placeholder: "Enter your Firstname",
              readOnly: false,
              autoFocus: false,
              autoComplete: true,
            },
            MiddleName: {
              type: "String",
              label: "MiddleName",
              placeholder: "Enter your MiddleName",
              readOnly: false,
              autoFocus: false,
              autoComplete: true,
            },
            LastName: {
              type: "String",
              label: "LastName",
              placeholder: "Enter your LastName",
              readOnly: false,
              autoFocus: false,
              autoComplete: true,
            },
            email: {
              type: 'email',
              label: 'Email',
              placeholder: "Enter your Email",
              description: "This is email field",
              errorMessage: "",
              readOnly: false,
              maxLength: 30,
              autoFocus: true,
              autoComplete: true,
            },

            password: {
              type: 'password',
              label: 'Password',
              placeholder: "Enter your password",
              description: "This is passsword field",
            },

            image: {
              type: 'file',
              label: 'Image',
              description: "Upload your latest photo",
              required: true,
              errorMessage: "Please input jpg, png, jpeg only",
              readOnly: false,
              maxFileSize: 10000,
              minFileSize: 1,
              accept: ["jpg", "png", "jpeg"],
            },

            gender: {
              type: "dropdown",
              label: "Gender",
              description: "Select Your Gender",
              placeholder: "Select Your Gender",
              autofocus: true,
              readOnly: false,
            },
            dob: {
              type: "date",
              label: "DOB",
              value: "1997-02-01",
              errorMessage: "",
              readOnly: false,
              autoFocus: false,
              autoComplete: true,

            },

          }
        }}
        data={{

          question: "yes",
          dataRange: 50,
        }}
        onSubmit={handleRegistration}
      />
    </div>
  );
}
```
