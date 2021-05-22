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
##### Signup route
* URL: `http://localhost:<your-port>/user/signup`
* Method HTTP: POST
* request parameters:
  
  Parameter name | Type |  Value example
  ---------------|--------------- | ---------
  email | string | remi@example.com
  username | string | Remi
  phone | string | 0606060606
  password |string | azerty
  picture | image file| my-picture.png 
  
* request and response example:
  
  ![signup](https://user-images.githubusercontent.com/49198371/119231193-d6611900-bb1f-11eb-8df6-bfff453dc238.png)

##### Login route
* URL: `http://localhost:<your-port>/user/login`
* Method HTTP: POST
* request parameters:
  
  Parameter name | Type |  Value example
  ---------------|--------------- | ---------
  email | string | remi@example.com
  password |string | azerty
  
* request and response example:
  
  ![login](https://user-images.githubusercontent.com/49198371/119231337-b1b97100-bb20-11eb-9ce1-da3330c00784.png)

#### Offer routes
##### create-an-offer route
* URL: `http://localhost:<your-port>/offer/publish`
* Method HTTP: POST
* Headers: Authorization Bearer Token
* request parameters:
  
  Parameter name | Type |  Value example
  ---------------|--------------- | ---------
  title | string | Polo manche courte
  description | string | Polo manche courte confectionné dans une belle maille couleur rouge
  price | string | 28
  condition | string | Peu utilisé
  city | string| Paris
  brand | string | H&M
  size | string | M
  color | string | rouge
  picture1 | picture file | my-first-picture.png
  picture2 | picture file | my-second-picture.png
  
  In this version, it is possible to upload as many pictures as wanted. 
  **NB:**
  * **You can name the image variables as you please**
  * **You must specify the following parameters: price, description and title**
  
  ⚠️ Do not forget to add a Bearer Token in your request:
  
  ![bearer-token](https://user-images.githubusercontent.com/49198371/119231767-d9113d80-bb22-11eb-8687-85d52b8a7231.png)

* request example:
  
  ![example-request-create-offer](https://user-images.githubusercontent.com/49198371/119232371-5938a280-bb25-11eb-82cf-c7a68e5c20ba.png)

* response example:

  ```js
  {
      "product_details": [
          {
              "MARQUE": "H&M"
          },
          {
              "TAILLE": "M"
          },
          {
              "ÉTAT": "Peu utilisé"
          },
          {
              "COULEUR": "rouge"
          },
          {
              "EMPLACEMENT": "Paris"
          }
      ],
      "_id": "60a92672bbc1c248b41534c4",
      "product_name": "Polo manches courtes",
      "product_description": "Ce polo uni est confectionné dans une belle maille couleur rouge",
      "product_price": 28,
      "owner": {
          "account": {
              "username": "Remi",
              "phone": "0606060606",
              "avatar": {
                  "asset_id": "961ef3a59df135c5839074f31d334af3",
                  ......
              }
          },
          "_id": "60a91cf5bbc1c248b41534c3"
      },
      "product_image": [
          {
              "asset_id": "f7ecf23083b0810c517b93a760c49053",
              .......
          },
          {
              "asset_id": "2f47c4c18c9cf6b4baa262690eb69882",
              ......
          }
      ],
      "__v": 0
  }
  ```
  
##### update-an-offer route
* URL: `http://localhost:<your-port>/offer/update`
* Headers: Authorization Bearer Token
* Method HTTP: PUT
* request parameters:
  
  Parameter name | Type |  Value example
  ---------------|--------------- | ---------
  title | string | Polo manche longue
  description | string | Polo manche longue confectionné dans une belle maille couleur bleue
  price | string | 30
  condition | string | Neuf
  city | string| Lyon
  brand | string | Jules
  size | string | S
  color | string | bleu
  picture1 | picture file | my-first-picture.png
  picture2 | picture file | my-second-picture.png
  picture-to-delete1 | cloudinary public_id | vinted/offers/60a92672bbc1c248b41534c4/zbx5fvdw4qnvazykxwju
  picture-to-delete2 | cloudinary public_id | vinted/offers/60a92672bbc1c248b41534c4/l0qgq0cgpt6mdyr7ag3s
  id | Mongodb ObjectId of the offer you want to update | 60a92672bbc1c248b41534c4
  
  In this version, it is possible to upload as many pictures as wanted. 
  **NB:**
  * **You can name the image variables you want to add as you please**
  * **You have to name the image variables you want to delete as follow: `picture-to-delete${a number}`**
  * **You can specify as many parameters as you please (ie none or all). Only the `id` parameter is mandatory**
  
  ⚠️ Do not forget to add a Bearer Token in your request (*see approach above*).
  
* request example:
  
  ![example-request-update-offer](https://user-images.githubusercontent.com/49198371/119233690-8176d000-bb2a-11eb-9237-550c0a2afb47.png)
  
* response example:

  ```js
  {
    "message": "Offer successfully updated"
    }
  ```



