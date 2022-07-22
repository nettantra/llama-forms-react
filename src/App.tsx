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
            required: true,
            enum: ['Test', 'Test1', 'Test2'],
            step:1
          },
          phone:{
            type: 'string',
            required: true,
            // enum: ['Test', 'Test1', 'Test2'],
            depend:true,
            step:1
          },
          table:{
            type: 'string',
            step:1
          },
          password:{
            type: 'string',
            step:1
          },
          range:{
            type:"string",
            step:1
          },
          zipcode:{
            type: 'string',
            step:1
          },
          text:{
            type: 'string',
            step:1
          },
          week:{
            type: 'string',
            step:1
          },
          url:{
            type: 'string',
            step:1
          },
          checkBox1:{
            type: 'string',
            // required: true,
            enum: ['Test3', 'Test4', 'Test5'],
            step:2
          },
          para:{
            type: 'string',
            depend:true,
            step:1
          },
          checkBox2:{
            type: 'string',
            // required: true,
            enum: ['yes', 'no', 'i dont know'],
            step:3
          },
          html:{
            type: 'string',
            step:1
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
            blacklist:["Test","Test1"],
          },
          phone: {
            type: "phone",
            label: "phone",
            description: "This is phone field",
            // validationRegex:"^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$",
            parentField:'zipcode',
            dependent:{
              type:"multi",
              value:["12345","54321"]
            },
            blacklist:""
          },
          html :{
            type:"html",
            label : "Html",
            htmlData : '<p>First &middot; Second</p>',

          },
          table: {
            type: "table",
            label: "table",
            description: "This is table field",
            column : {
              columnName : ["Id", "Title", "Desc"],
              // allEditor:true,
              columnEditor : ["Id", "Title"]
            },
            rows:{
              Id: [0, 1, 2],
              Title:["sajal", "Mahapatra", "chatu", "patra", "hello"],
              Desc : ["hello", "world", "hyy", "duia"]
            }
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
          password: {
            type: "password",
            label: "password",
            description: "This is password field",
            dafaultValidation : false,
            togglePassword:true,
          },
          range:{
            type: "range",
            label: "range",
            description: "This is range field",
          },
          text: {
            type: "text",
            label: "text",
            lowercase : false,
            uppercase: false,
            description: "This is text field",
            disAllowSpace: false,
            validationRegex:"^[a-zA-Z]+$",
            blacklist:["Test","Test1"],
          },
          week: {
            type: "week",
            label: "week",
            lowercase : false,
            uppercase: false,
            description: "This is week field",
            disAllowSpace: false,
            // enum: ["2015-W04", "2015-W03", "2015-W02", "2015-W01"],
            validationRegex:""
          },
          url: {
            type: "url",
            label: "url",
            lowercase : false,
            uppercase: false,
            description: "This is url field",
            disAllowSpace: false,
            // validationRegex:"^[a-zA-Z]+$"
          },
          checkBox1: {
            type: "checkbox",
            label: "Check Box1 test",
            description: "This is checkbox1 field",
            onlyCheck:"Test3",
            blacklist:["Test"]
          },
          para: {
            type: "paragraph",
            text: "This is paragraph field for testing",
            parentField: "checkBox1",
            dependent:{
              value : ["Test3"],
              type: "single",          //multi or single
            }
          },
          checkBox2: {
            type: "checkbox",
            label: "Check Box2 test",
            description: "This is checkbox2 field",
            blacklist:["yes","Test1"],
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