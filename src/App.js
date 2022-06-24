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
            wizardOptions : {
              1: {
                title: 'Login',
                description: 'Login Form',
                onNext : login_test
              },
              2: {
                title: 'Register',
                description: 'Register Form',
                onNext : login_test
              },
              3: {
                title: 'Registersas',
                description: 'Register Form',
                onNext : login_test
              },
              5: {
                title: 'Forgot Password',
                description: 'Forgot Password Form',
                onNext : login_test
              }
            },
            progressBar:{
              show: true,
              color: '',
              height: '',
              width: '100%',
              text: '',
              textAlign: '',
              textColor: '',
              subProgress: true,
              align: '',
              
            },
            buttons: {
              previous:{
                text: 'Previous',
                loader:false,
              },
              next:{
                text: 'Next',
                loader:true,
              },
              submit:{
                text: 'Done',
                loader:true,
              },
            },
            initialStep:1,
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
              zip:{
                type: 'number',
                required: true,
              }
            }
          }}
          options={{
            type: 'object',
            fields: {
              zip:{
                type: 'number',
                label:  "zipcode",
                maxLength: 10,
                max:6,
                // validationRegex:"^[0-9]{5}(?:-[0-9]{4})?$",
                errorMessage:"your error message"
              },
              email: {
                type: 'email',
                label: 'Email',
                placeholder: "Enter your name",
                description: "This is email field",
                // validationRegex: "",
                errorMessage: "",
                prefix:"sajal-",
                lowercase: false,
                uppercase: true,
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
                lowercase:false,
                uppercase:true,
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
              //   type: "text",
              //   label: "What do you think ?",
              //   description: "This is a feedback field",
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
        />
      </div>
  );
}

export default App;
