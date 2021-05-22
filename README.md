# Vinted API exercise

Vinted API exercise is a miniature-scale reproduction of the Vinted API that allows users to : create an account, login to this account, create an offer, update this offer (including uploading pictures), filter the offers and delete an offer.

This little educational project was made during my web and mobile developer training with [Le Réacteur](https://www.lereacteur.io/).

## Prerequisties

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of `node.js`, `MongoDB` and you have a [Cloudinary](https://cloudinary.com/) account 
* You have a `Windowd/Linux/Mac` machine.

*Option : you can install [Postman](https://www.postman.com/) to easily make requests.*

## Installing Vinted API exercise

To install Vinted API exercise, follow these steps:
1. Download the code
![download-code](https://user-images.githubusercontent.com/49198371/119229498-a6624780-bb18-11eb-82ba-48008a112c83.png)
2. Install all the npm packages needed typing the following install command in a terminal (make sure you are in the good folder):
```js
npm i
```
3. Create a `.env` file at the root of the project and store the following environment variables:
```js
CLOUDINARY_NAME = <your-cloudinary-name>
CLOUDINARY_API_KEY = <your-cloudinary-api-key>
CLOUDINARY_API_SECRET = <your-cloudinary-api-secret>
MONGODB_URI = <your-mongodb-uri>
PORT = <the-listening-port-of-your-server>
```
## Using Vinted API exercise

To use Vinted API exercise, follow these steps:
1. Start your server typing the following command in a terminal (make sure you are in the good folder):
```js
npx nodemon index.js
```
If everything works correctly, you should see this:

![start-server](https://user-images.githubusercontent.com/49198371/119230185-76687380-bb1b-11eb-8db2-6a1e0d78eec4.png)

2. Make requests using `Postman` (this is not mandatory, but it is an easy way to send requests):

![welcome-page](https://user-images.githubusercontent.com/49198371/119230510-ce53aa00-bb1c-11eb-93c1-4a624a590874.png)

### Route details
#### User routes
##### Signup













