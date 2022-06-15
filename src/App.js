import React from 'react';
import LlamaForm from './llama/index'
// import {LlamaForm} from "test-react-form";

function App() {

  const login_test = (data) => {
    console.log("login", data)
  }
  // const handleChange = () => {
  //   alert("you have clicked in first step")
  // }
  // const handle = () => {
  //   alert("you have clicked in 2nd step")
  // }
  return (
      <div style={{ width: "50%", margin: "auto" }}>
        <LlamaForm
          schema={{
            type: 'object',
            title: 'Login',
            description: 'Login Form',
            wizard: true,
            ProgressBar:false,
            progressBarColor:"",
            progressBarHeight: "",
            progressBarText:"",
            progressBarTextColor:"",
            subProgressBar: false,
            previousButton:"",
            nextButton:"",
            properties: {
              email: {
                type: 'string',
                required: true,
                enum: "",
                step: 1,
              },
              doubt: {
                type: 'string',
                required: true,
                enum: ["Yes","No"],
                step: 2,
              },
              wdoubt: {
                type: 'string',
                depend : true,
                step: 2,
              },
              password: {
                type: 'string',
                required: true,
                enum: "",
                step: 2,
              },
              details: {
                type: 'string',
                required: true,

              },
              color: {
                type: "string",
                required: false,
              },
              image: {
                type: 'string',
                required: true,
                step: 1,
              },
              dataRange: {
                type: "string",
                required: true,
                step: 3
              },
              question: {
                type: 'string',
                required: true,
                step: 4,
                enum: ['yes', 'no', 'I dont know'],
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
              currentTime: {
                type: 'string',
                required: true,
              },
              feedback: {
                type: 'string',
                required: true,
                enum: ["You are good", "You have a good sense", "Maybe", "Also I am confused"]
              },
            }
          }}
          options={{
            type: 'object',
            fields: {
              email: {
                type: 'email',
                label: 'Email',
                placeholder: "Enter your name",
                description: "This is email field",
                // validationRegex: "",
                errorMessage: "",
                readOnly: false,
                maxLength: 30,
                autoFocus: true,
                autoComplete: true,
              },
              doubt: {
                type: 'radio',
                label: 'Doubt',
                description: "This is radio field",
              },
              wdoubt: {
                type: 'textarea',
                label: 'What is your doubt',
                description: "This is textarea field",
                parentField: "doubt",
                dependentValue: "Yes",
              },
              details: {
                type: "textarea",
                label: "Details",
                description: "This is details field",
                placeholder: "Write......",
                errorMessage: "",
                readOnly: false,
                autoFocus: true,
                autoComplete: true,
              },
              password: {
                type: 'password',
                label: 'Password',
                placeholder: "Enter your password",
                description: "This is passsword field",
              },
              color: {
                type: "color",
                label: "Color",
                description: "This is color field",
                readOnly: false,
              },
              dataRange: {
                type: "range",
                label: "Range",
                // required: true,
                errorMessage: "",
                readOnly: false,
                maxLength: 30,
                autoFocus: true,
                autoComplete: true,
                // style:{color:"red"},
                min: 0,
                max: 200,
                interval: 10,
              },
              image: {
                type: 'file',
                label: 'Image',
                description: "This is image field",
                required: true,
                errorMessage: "Please input jpg, png, jpeg only",
                readOnly: false,
                maxFileSize: 10000,
                minFileSize: 1,
                // style:{color:"red"},
                accept: ["jpg", "png", "jpeg"],
              },
              question: {
                type: 'radio',
                label: "This is an amazing form builder. Do you like it?",
                description: "This is radio field",
                readOnly: false,
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
                // min: "2000-01-01",
                // max: "2000-01-02",
              },
              // feedback:{
              //   type: "checkbox",
              //   label: "What do you think ?",
              //   description: "This is a checkbox"
              // },
              currentTime: {
                type: "time",
                label: "Current Time",
                description: "This is a time field",
                readOnly: false,
                autoFocus: false,
                autoComplete: true,
              },
            }
          }}
          data={{
            email: 'mobashir@gmail.com',
            password: '123456',
            question: "yes",
            dataRange: 50,
          }}
          onSubmit={login_test}
          // onClick = {{
          //   1 : handleChange,
          //   2 : () => {
          //     alert("you have clicked in 2nd step")
          //     // handle()
          //   },
          //   // 3 : () => {
          //   //   console.log("click 3")
          //   // },
          //   // 4 : () => {
          //   //   console.log("click 4")
          //   // },
          //   // 5: handleChange
          // }}
        />
      </div>
  );
}

export default App;
