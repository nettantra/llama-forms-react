import React from 'react';
import LlamaForm from './llama/index'
// import {LlamaForm} from "test-react-form";


function App() {

  const login_test = (data:any) => {
    console.log("login", data)
  }

  return (
    <div style={{ width: "50%", margin: "auto" }}>
        <LlamaForm
          schema={{
            type: 'object',
            title: 'Login',
            description: 'Login Form',
            wizard: true,
            wizardOptions : {
              onNext:login_test,
              onPrev:login_test,
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
                //required: true,
                enum: "",
                step: 1,
              },
              password: {
                type: 'string',
                //required: true,
                enum: "",
                step: 2,
              },
              details: {
                type: 'string',
                //required: true,
              },
              color: {
                type: "string",
                required: false,
                step:3,
              },
              question: {
                type: 'string',
                //required: true,
                step: 4,
                enum: ['yes', 'no', 'I dont know'],
              },
              gender: {
                type: 'string',
                //required: true,
                enum: {
                  Male: 'male',
                  Female: 'female',
                  Unknown: 'unknown'
                },
                step: 5,
              },
              zip:{
                type: 'number',
                step: 3,
                //required: true,
              },
              image: {
                type: 'string',
                required: true,
                step: 1,
              },
              file: {
                type: 'string',
                // required: true,
                step: 1,
              },
              checkBox:{
                type: 'string',
                // required: true,
                enum: ['Test', 'Test1', 'Test2'],
                step:1
              },
              urlField: {
                type: 'string',
                required: true,
              }
            }
          }}
          options={{
            type: 'object',
            fields: {
              urlField:{
                type: 'url',
                label: 'Url',
                readOnly: true,
              },
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
                // prefix:"sajal-",
                lowercase: false,
                uppercase: false,
                readOnly: false,
                maxLength: 30,
                autoFocus: true,
                autoComplete: true,
                capsLockWaring: true,
                capsLockMessage : "Caps Lock is On",
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
              checkBox: {
                type: "checkbox",
                label: "Check Box test",
                description: "This is checkbox field",
                onlyCheck:"Test",
              },
              image: {
                type: 'image',
                label: 'Image',
                description: "This is image field",
                required: true,
                errorMessage: "Please input jpg, png, jpeg only",
                readOnly: false,
                maxFileSize: 10000,
                minFileSize: 1,
              },
              file: {
                type: 'file',
                label: 'Image',
                description: "This is image field",
                required: true,
                errorMessage: "Please input jpg, png, jpeg only",
                readOnly: false,
                maxFileSize: 10000,
                minFileSize: 1,
                // style:{color:"red"},
                // accept: ["jpg", "png", "jpeg"],
              }
            }
          }}
          data={{
            // email: 'mobashir@gmail.com',
            password: '123456',
            question: "yes",
            urlField: "https://www.google.com",
            // checkBox: {Test:false, Test1:true, Test2:true},
            checkBox: {Test:false, Test1:true, Test2:true},
          }}
          onSubmit={login_test}
        />
      </div>
  );
}

export default App;
