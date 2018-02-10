# Geolocation Service
This is a service for storing secret messages at locations.

## Running

### Install Dependencies
To start using this service, you will need do install and configure some dependencies.
You must have `node` and `npm` up and running in you machine.
First of all go to the project folder and run `npm install`. After that, the project dependencies will be installed. Follow the next instructions before run you app.

#### MongoDB
You need to have an MongoDB database up and running.
The database can be named according your preference, but after creating it you need to put its url in the __config/settings.js__ file, in the property __config.database.url.development__.
If you want to run tests, create another database named as you prefer and change the property __database.url.test__ of the same file with the url of the testing database.
If you need some help to do this, I recommend you to follow this [link](https://docs.mongodb.com/manual/administration/install-on-linux/) instructions.

### Running the Application
After follow the `Install Dependencies` section guide, you are able to run the application.
To achieve it, you just need to run `npm start` in the project folder.

## Testing
To run the tests you will need to install the `mocha` npm package globally running `npm install -g mocha`.
After install it, just run `mocha` in the project folder and the tests should run.
