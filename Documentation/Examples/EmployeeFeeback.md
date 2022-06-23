<h2 align="center">Employee Feedback Form with llama-forms-react</h2>

```JS
import LlamaForm from "llama-forms-react";

export default function Example() {

  const handleSubmit = (data) => {
    console.log("Registration data,", data)
  }
  return (
    <div style={{ width: "50%", margin: "auto", color: "green" }}>
      <LlamaForms
        schema={{
          type: 'object',
          //title: 'Login',
          description: 'Employee Feedback',
          wizard: false, //true,
          properties: {
            EmplID: {
              type: 'string',
              required: true,

            },
            email: {
              type: 'string',
              required: true,
              enum: "",
              step: 1,
            },
            Position: {
              type: 'string',
              required: true,

            },

            question1: {
              type: 'string',
              required: true,
              enum: {
                Yes: 'yes',
                No: 'no',
              },
            },

            question2: {
              type: 'string',
              required: true,
              enum: {
                Yes: 'yes',
                No: 'no',
              },
            },
            question3: {
              type: 'string',
              required: true,
              enum: {
                Yes: 'yes',
                No: 'no',
              },
            },
            question4: {
              type: 'string',
              required: true,
              step: 4,
              enum: ['Excellent', 'Above Average', 'Average', 'Below Average', 'Poor'],
            },
            dataRange: {
              type: "string",
              required: true,
            },

          }
        }}
        options={{
          type: 'object',
          fields: {
            EmplID: {
              type: "String",
              label: "Employee ID",
              placeholder: "Enter your Employee Id ",
              readOnly: false,
              autoFocus: false,
              autoComplete: true,
            },
            email: {
              type: 'email',
              label: 'Email',
              placeholder: "Enter your Company Email",
              errorMessage: "",
              readOnly: false,
              maxLength: 30,
              autoFocus: true,
              autoComplete: true,
            },
            Position: {
              type: "String",
              label: "Position",
              placeholder: "Enter your Position ",
              readOnly: false,
              autoFocus: false,
              autoComplete: true,
            },
            question1: {
              type: "dropdown",
              description: "* Did our staff greet you in a friendly manner",
              autofocus: true,
              readOnly: false,
            },

            question2: {
              type: "dropdown",
              description: "* Did our staff Answer your all questions",
              autofocus: true,
              readOnly: false,
            },
            question3: {
              type: "dropdown",
              description: "* Did our staff able to resolve your issuse or concern",
              autofocus: true,
              readOnly: false,
            },
            question4: {
              type: 'radio',
              label: "* Please rate your overall employee experience",
              readOnly: false,
            },
            dataRange: {
              type: "range",
              label: "Ratting your exprience out of 10",
              errorMessage: "",
              readOnly: false,
              autoFocus: true,
              autoComplete: true,
              min: 0,
              max: 10,
              interval: 1,
            },
          }
        }}
        data={{
          question: "yes",
          dataRange: 5,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```
