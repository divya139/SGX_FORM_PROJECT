# Pre-requisite

NodeJS version 14.0.0 or above.
Editors like visual studio code

## How to run the app locally 

Clone the repo form git and run the following commands

### git clone `<repoUrl>`
Open the root folder in the command prompt or VS code editor and run the below command

File path: `/SGX_Form_Project`
### `npm install` 
The above command will install all necessary modules for the sever

Open the client folder in command prompt and run below command to install necessary modules in client 

File Path: `/SGX_Form_Project/client`
### `npm install` 


later run the below command to in the root folder SGX_Form_Project

### `npm run dev`

This will run node  and react servers concurrently 
The app will be starting at [http://localhost:3000](http://localhost:3000)

In order to trigger email to the email ID submitted in the form, need to update secrete properties file with respective credentials.
This credentials will be sharing separately through email since, those are confidential.

The secreteProperties.js is in below path. 
`SGX_Form_Project/server/secreteProperties.js`

Need to update below values with the credentials provided through email

EMAIL_USER_NAME: '',
EMAIL_PASSWORD: ''

