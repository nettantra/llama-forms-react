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
          wizard: false,
          wizardOptions: {
            onNext: login_test,
            onPrev: login_test,
          },
          progressBar: {
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
            previous: {
              text: 'Previous',
              loader: false,
            },
            next: {
              text: 'Next',
              loader: true,
            },
            submit: {
              text: 'Done',
              loader: true,
            },
          },
          initialStep: 1,
          properties: {
            monthTest: {
              type: 'string',
              // step: 1
            }
          }
        }}
        options={{
          type: 'object',
          fields: {
            monthTest: {
              type: "password",
              label: "date Test",
              description: "This is checkbox field",
              validationRegex: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$",
              // errorMessage:"Please enter a valid password",
            }
          }
        }}
        data={{
          // email: 'mobashir@gmail.com',
          // password: '123456',
          // question: "yes",
          // urlField: "https://www.google.com",
          // checkBox: {Test:false, Test1:true, Test2:true},
          // checkBox: {Test:false, Test1:true, Test2:true},
        }}
        onSubmit={login_test}
      />
    </div>
  );
}

export default App;
