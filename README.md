Tovia’s Enigma, is a web application that lets users create an encrypted message given a random
passphrase (they can always generate a new passphrase to keep their privacy) that they have to share
between each other.

It gives them the ability to create private text, that only other users that have their passphrase and the
encrypted message can read and create.

Another feature of this application is to set expiration times for a message. As another layer of security,
the user that created the message, can set an expiration time that will not allow anyone to decrypt an
expired message.

If the user enters a message that is undecryptable, the application should return a message stating that
the message has either expired or is an invalid encrypted message.

* De/Encryption should happen on the server side (minimal API), without using database.
The following animated GIF can give you an idea of how the app should function:
https://media.giphy.com/media/l0Iye9w3CFoz5rP2w/source.gif
Keep in mind, that passphrase(s) should be passed by url hash, something like:
http://localhost:3000/#uAkk2

In order to create the app that is similar to Tovia’s Enigma app, you need to use:
● NodeJS
● React.js
● React Toolbox

Feel free to use any other libraries that can assist you achieve this challenge.
At a minimum your code has to be written in JS - ES6.
It should be linted as well (preferably linted to Airbnb's eslint config) and as readable as you can.

Bonus points:
● Input Validations
● Create your api of de/encryption using GraphQL
● Create a test suite for your application
● Create your app by using Webpack (preferably v2)
● Create a production build script
● Use the latest JS features assisting with Babel