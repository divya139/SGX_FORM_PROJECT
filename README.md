# Pre-requisite

NodeJS version 14.0.0 or above.
Editors like visual studio code

## How to run the app locally 

Clone the repo form git and run the following commands

### git clone `repo url`
Open the root folder in the command prompt or VS code editor
### `npm install` 
The above command will install all necessary modules for the app.
later run the below command to start the servers.

### `npm run dev`

This will run node  and react servers concurrently 
The app will be starting at [http://localhost:3000](http://localhost:3000)

In order to trigger email to the email ID submitted in form, need to update secrete properties file with respective credentials.
This credentials will be sharing separately through email since, those are confidential.

The secreteProperties.js is in below path. 
SGX_Form_Project\server\secreteProperties.js

