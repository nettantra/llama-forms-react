import React from 'react';
import LlamaForm from './llama/index'
// import {LlamaForm} from "test-react-form";


function App() {

  const login_test = (data: any) => {
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
        
          checkBox:{
            type: 'string',
            // required: true,
            enum: ['Test', 'Test1', 'Test2'],
            step:1
          },
          phone:{
            type: 'string',
            // required: true,
            // enum: ['Test', 'Test1', 'Test2'],
            step:1
          },
          range:{
            type: 'string',
            step:1
          },
          zipcode:{
            type: 'string',
            step:1
          },
          checkBox1:{
            type: 'string',
            // required: true,
            enum: ['Test3', 'Test4', 'Test5'],
            step:2
          },
          checkBox2:{
            type: 'string',
            // required: true,
            enum: ['yes', 'no', 'i dont know'],
            step:3
          }
        }
      }}
      options={{
        type: 'object',
        fields: {
          checkBox: {
            type: "checkbox",
            label: "Check Box test",
            description: "This is checkbox field",
            // onlyCheck:"Test",
          },
          phone: {
            type: "phone",
            label: "phone",
            description: "This is phone field",
            validationRegex:"^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$"
          },
          zipcode: {
            type: "zipcode",
            label: "zipcode",
            blockCharacter :{
              active : true,
              value : ['e', 'E', '+', '-'],
            },
            description: "This is zipcode field",
            validationRegex:"/^\d{5}(?:[- ]?\d{4})?$/"
          },
          range: {
            type: "range",
            label: "range",
            description: "This is range field",
          },
          checkBox1: {
            type: "checkbox",
            label: "Check Box1 test",
            description: "This is checkbox1 field",
          },
          checkBox2: {
            type: "checkbox",
            label: "Check Box2 test",
            description: "This is checkbox2 field",
          }
        }
      }}
      data={{
        // email: 'mobashir@gmail.com',
        password: '123456',
        question: "yes",
        urlField: "https://www.google.com",
        // checkBox: {Test:false, Test1:true, Test2:true},
        // checkBox: {Test:false, Test1:true, Test2:true},
      }}
      onSubmit={login_test}
    />
    </div>
  );
}

export default App;
