# Llama Forms (React)

> This is a React form builder component where we can implement a number of form fields without using any HTML tags by only using JSON data sets. You just need to `import LlamaForm from llama-form` and enjoy an amazing form by JSON schema.

[![NPM](https://img.shields.io/npm/v/llama-form.svg)](https://www.npmjs.com/package/llama-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Example Usage


**Login Form with email and password and their validation.**

```
import LlamaForm from 'llama-form';

export default function Example() 
    {
        return <LlamaForm
                    schema={{
                        title: 'Login Form Example',
                        description: 'This is an example of a login form.',
                        wizard: false, // optional (true for multi-step forms)
                        properties: {
                            email: {
                                type: 'string',
                                required: true, // here we mention that the field is required or not
                            },
                            password: {
                                type: 'string',
                                required: true,
                            }
                        }
                    }}
                    options={{
                        fields: {
                            email: {
                                type: 'email', // this one defaine the input field type (defaults to 'text')
                                label: 'User Email', // this one defines the label for the input field
                                placeholder: "Your email address", // this one defines the placeholder text for the input field
                                description: "This is a description for the email field", // this one defines the description for the input field
                                validationRegex:"", // this one defines the validation regex for the input field
                                errorMessage: "This is an error message for the email field", // this one defines the error message for the input field
                                readOnly: false, // this one defines if the input field is read only (defaults to false)
                                maxLength: 30, // this one defines the max length for the input field
                                autoFocus: true, // this one defines if the input field should be focused on load
                                autoComplete: true, // this one defines if the input field should be autocompleted
                            },
                            password: {
                                type: 'password',
                                label: 'User Passsword',
                                placeholder: "Your password Please",
                                description: "This is a description for the password field",
                                validationRegex:"",
                                errorMessage: "This is an error message for the password field",
                                readOnly: false,
                                autoFocus: false,
                                autoComplete: true,
                            }
                        }
                    }}
                />
    }
```

**Create Registration Form useing llama-form**

```
import LlamaForm from 'llama-form';

export default function Example()
    {
        return <LlamaForms
                    schema={{
                        title: "Registration Form",
                        description: "This is a registration form",
                        wizard: false,
                        properties: {
                            firstName: {
                                type: "string",
                            },
                            lastName: {
                                type: "string",
                            },
                            email: {
                                type: "string",
                                required: true,
                            },
                            password: {
                                type: "string",
                                required: true,
                            },
                            dob: {
                                type: "string",
                            },
                            address: {
                                type: "string",
                            },
                            city: {
                                type: "string",
                            },
                            state: {
                                type: "string",
                            },
                            zip: {
                                type: "string",
                            }
                        }
                    }}
                    options={{
                        fields: {
                            firstName: {
                                type: "text",
                                label: "First Name",
                                placeholder: "Enter your first name",
                                description: "Enter your first name",
                                maxLength: 20
                            },
                            lastName: {
                                type: "text",
                                label: "Last Name",
                                placeholder: "Enter your last name",
                                description: "Enter your last name",
                                maxLength: 20
                            },
                            email: {
                                type: 'email',
                                label: 'Email',
                                placeholder: 'Enter your email',
                                description: 'Enter your email',
                                autoFocus: true,
                            },
                            password: {
                                type: 'password',
                                label: 'Password',
                                placeholder: 'Enter your password',
                                description: 'Enter your password',
                            },
                            dob: {
                                type: 'date',
                                label: 'Date of Birth',
                                placeholder: 'Enter your date of birth',
                                description: 'Enter your date of birth',
                            },
                            address: {
                                type: 'text',
                                label: 'Address',
                                placeholder: 'Enter your address',
                                description: 'Enter your address',
                            },
                            city: {
                                type: 'text',
                                label: 'City',
                                placeholder: 'Enter your city',
                                description: 'Enter your city',
                            },
                            state: {
                                type: 'text',
                                label: 'State',
                                placeholder: 'Enter your state',
                                description: 'Enter your state',
                            },
                            zip: {
                                type: 'number',
                                label: 'Zip',
                                placeholder: 'Enter your zip',
                                description: 'Enter your zip',
                                maxLength: 5,
                            }
                        }
                    }}
                />
    }
```

**Create Multi-step Registration Form useing llama-form**

```
import LlamaForm from 'llama-form';

export default function Example() {
    return <LlamaForms
                schema={{
                    title: "Registration Form",
                    description: "This is a registration form",
                    wizard: true,
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
                        }
                    }
                }}
                options={{
                    fields: {
                        firstName: {
                            type: "text",
                            label: "First Name",
                            placeholder: "Enter your first name",
                            description: "Enter your first name",
                            maxLength: 20
                        },
                        lastName: {
                            type: "text",
                            label: "Last Name",
                            placeholder: "Enter your last name",
                            description: "Enter your last name",
                            maxLength: 20
                        },
                        email: {
                            type: 'email',
                            label: 'Email',
                            placeholder: 'Enter your email',
                            description: 'Enter your email',
                            autoFocus: true,
                        },
                        password: {
                            type: 'password',
                            label: 'Password',
                            placeholder: 'Enter your password',
                            description: 'Enter your password',
                        },
                        dob: {
                            type: 'date',
                            label: 'Date of Birth',
                            placeholder: 'Enter your date of birth',
                            description: 'Enter your date of birth',
                        },
                        address: {
                            type: 'text',
                            label: 'Address',
                            placeholder: 'Enter your address',
                            description: 'Enter your address',
                        },
                        city: {
                            type: 'text',
                            label: 'City',
                            placeholder: 'Enter your city',
                            description: 'Enter your city',
                        },
                        state: {
                            type: 'text',
                            label: 'State',
                            placeholder: 'Enter your state',
                            description: 'Enter your state',
                        },
                        zip: {
                            type: 'number',
                            label: 'Zip',
                            placeholder: 'Enter your zip',
                            description: 'Enter your zip',
                            maxLength: 5,
                        }
                    }
                }}

            />
}
```


**Create a form with a default value.**

```
export default function Example() {
    return <LlamaForms
                schema={{
                    title: "Registration Form",
                    description: "This is a registration form",
                    wizard: true,
                    properties: {
                        firstName: {
                            type: "string",
                        },
                        lastName: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        }
                    }
                }}
                options={{
                    fields: {
                        firstName: {
                            type: "text",
                            label: "First Name",
                            placeholder: "Enter your first name",
                            description: "Enter your first name",
                            maxLength: 20
                        },
                        lastName: {
                            type: "text",
                            label: "Last Name",
                            placeholder: "Enter your last name",
                            description: "Enter your last name",
                            maxLength: 20
                        },
                        email: {
                            type: 'email',
                            label: 'Email',
                            placeholder: 'Enter your email',
                            description: 'Enter your email',
                            autoFocus: true,
                        }
                    }
                }}
                data={{
                    firstName: "NetTantra",
                    lastName: "Technologies",
                    email: "nettantra@nettantra.net"
                }}

            />
}
```

# llama-form Props

### Main Props

> **schema:** It is the base part of the form where you can give json schema for creating form.

> **options:** Here we define the properties of fields. Besically It is responsible for making your form more meaningful

> **data:** Here we can pass the default value for fields of a form. 

> **onSubmit:** This is a call back which accept a function in which it return the form data.

 
### Schema Props

1. **title:** Here we give a title to the form.
2. **description:** Here we give the description to the form.
3. **wizard:** It is used for multistep form. If its 'true' then form is multi-step.
4. **properties:** This will carry your dynamic custom field which you want to render in form.
    * **required:** Here we define whether the particular field is required or not. The default value is false.
    * **enum:** This is for passing some sets of values. Basically, this is used by dropdown fields, checkbox fields, radio fields, etc.
    * **step:** This is used to define the field's position on the multistep form with respect to the provided value. For instance, if the step value is 2 then that field will occur on the second step of the form and the default value of the step field is 1.

### Options Props

1. **fields:** Here we pass all schema fields properties. Which basically contains an object for each field that we describe in the schema.
    * **type:** This is used to define which type of input field we want for our field. As for email we use "type - email". 
	   **Input Field type support by llama-form.**        
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
    * **label:** This is normally used for labeling the input field.
    * **placeholder:** This is used for showing some helper message to the user regarding a particular input field.
    * **description:** Here we describe our input field. 
    * **validationRegax:** Here we pass a custom regex for validation of the input data.
    * **errorMessage:** Here we pass some error message so when the user does anything wrong then get that error message.
    * **readOnly:** This is to make a field read-only.
    * **maxLength:** Here we pass how many characters we want in this field. 
    * **autoFocus:** This is to make a field on focus while the page is active.
    * **autoComplete:** This is for giving suggestions of your history data to autocomplete.
    * **maxFileSize:** This is used when the input type is a file. where we can set the maximum size of the file before upload.
    * **minFileSize:** This is used when the input type is a file. where we can set the minimum size of the file before upload.
    * **min:** This is used to set the minimum value of the input field.
    * **max:** This is used to set the maximum value of the input field.
    * **interval:** This is used when the input field type is range. Here we define the interval between two values.
    * **accept:** This is used when the input type is a file. where we can accept a particular extension file, ex - ["jpg", "png", "jpeg"]

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
