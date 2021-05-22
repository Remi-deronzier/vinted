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
* Goal: Enable a user to create an account
* request parameters:
  
  Key name | Parameter Type | Value type |  Value example
  ---------------|--------------- | --------- | --------
  email | body | string | remi@example.com
  username |  body | string | Remi
  phone |  body | string | 0606060606
  password | body | string | azerty
  picture |  body | image file| my-picture.png 
  
* request and response example:
  
  ![signup](https://user-images.githubusercontent.com/49198371/119231193-d6611900-bb1f-11eb-8df6-bfff453dc238.png)

##### Login route
* URL: `http://localhost:<your-port>/user/login`
* Method HTTP: POST
* Goal: Enable a user to log in to his/her account
* request parameters:
  
  Key name | Parameter Type | Value type |  Value example
  ---------------|--------------- | --------- | -------
  email |  body | string | remi@example.com
  password |  body |string | azerty
  
* request and response example:
  
  ![login](https://user-images.githubusercontent.com/49198371/119231337-b1b97100-bb20-11eb-9ce1-da3330c00784.png)

#### Offer routes
##### Create-an-offer route
* URL: `http://localhost:<your-port>/offer/publish`
* Method HTTP: POST
* Goal: Create a new offer
* Headers: Authorization Bearer Token
* request parameters:
  
  Key name | Parameter Type | Value type |  Value example
  ---------------|--------------- | --------- | --------
  title |  body |string | Polo manche courte
  description |  body | string | Polo manche courte confectionné dans une belle maille couleur rouge
  price |  body | number | 28
  condition |  body | string | Peu utilisé
  city |  body | string| Paris
  brand |  body | string | H&M
  size |  body | string | M
  color |  body | string | rouge
  picture1 |  body | picture file | my-first-picture.png
  picture2 |  body | picture file | my-second-picture.png
  
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
                  // ...
              }
          },
          "_id": "60a91cf5bbc1c248b41534c3"
      },
      "product_image": [
          {
              "asset_id": "f7ecf23083b0810c517b93a760c49053",
              // ...
          },
          {
              "asset_id": "2f47c4c18c9cf6b4baa262690eb69882",
              // ...
          }
      ],
      "__v": 0
  }
  ```
  
##### Update-an-offer route
* URL: `http://localhost:<your-port>/offer/update`
* Headers: Authorization Bearer Token
* Method HTTP: PUT
* Goal: Update an offer. The image(s) stored in `Cloudinary` as well as the image data stored in `MongoDB` are updated.
* request parameters:
  
  Key name | Parameter Type | Value type |  Value example
  ---------------|--------------- | --------- | --------
  title |  body |string | Polo manche longue
  description |  body | string | Polo manche longue confectionné dans une belle maille couleur bleue
  price |  body | number | 30
  condition |  body | string | Neuf
  city |  body | string| Lyon
  brand | body |  string | Jules
  size | body |  string | S
  color | body | string | bleu
  picture1 |  body | picture file | my-first-picture.png
  picture2 |  body | picture file | my-second-picture.png
  picture-to-delete1 | body | `Cloudinary` public_id | vinted/offers/60a92672bbc1c248b41534c4/zbx5fvdw4qnvazykxwju
  picture-to-delete2 |  body |`Cloudinary` public_id | vinted/offers/60a92672bbc1c248b41534c4/l0qgq0cgpt6mdyr7ag3s
  id |  body | `MongoDB` ObjectId of the offer you want to update | 60a92672bbc1c248b41534c4
  
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
  
  ##### Delete-an-offer route
* URL: `http://localhost:<your-port>/offer/delete`
* Headers: Authorization Bearer Token
* Method HTTP: DELETE
* Goal: Delete an offer. The image(s) stored in `Cloudinary` as well as the data stored in `MongoDB` are deleted.
* request parameters:
  
  Key name | Parameter Type | Value type |  Value example
  ---------------|--------------- | --------- | ------
  id |  body | `MongoDB` ObjectId of the offer you want to update | 60a92672bbc1c248b41534c4
  
  ⚠️ Do not forget to add a Bearer Token in your request (*see approach above*).
  
* request example:
  
  ![example-request-delete-offer](https://user-images.githubusercontent.com/49198371/119234441-3a8ad980-bb2e-11eb-87e6-1e6e38f74c5c.png)
  
* response example:

  ```js
  {
    "message": "Offer successfully deleted"
   }
  ```

##### Filter-offers route
* URL: `http://localhost:<your-port>/offers`
* Method HTTP: GET
* Goal: Filter the offers according to different parameters. Send back the number `count` of offers that match input parameters
* request parameters:
  
  Key name | Parameter Type | Value type |  Value example | Effect
  ---------------|--------------- | --------- | ------ | -----
  title |  query | string | chemise | filters the offers according to their title: only the offers of which the title match with this parameter will be send back
  priceMin |  query | number | 20 | filters the offers according to their price: only the offers of which the price is greater or equal than priceMin will be send back
  priceMax |  query | number | 100  | filters the offers according to their price: only the offers of which the price is lower or equal than priceMax will be send back
  page |  query | number | 1  | sends back only the offers which correspond to the number of the page specified
  limit |  query | number | 8 | enables to specify the number of offers which can be displayed on a single page
  sort |  query | string | `price-desc` OR `price-asc` | enables to sort the offers in ascending order (`price-asc`) or in descending order (`price-desc`) according to their price
    
* request example:
  
  ![example-request-filter-offer](https://user-images.githubusercontent.com/49198371/119235452-ef26fa00-bb32-11eb-923d-a80b3c7ab5c6.png)
  
* response example:

  ```js
  {
      "count": 3,
      "offers": [
          {
              "product_details": [
                  {
                      "MARQUE": "H&M"
                  },
                  {
                      "TAILLE": "XL"
                  },
                  {
                      "ÉTAT": "Neuf"
                  },
                  {
                      "COULEUR": "bordeau"
                  },
                  {
                      "EMPLACEMENT": "Nice"
                  }
              ],
              "_id": "6097e37cd275dc0a70a1b092",
              "product_name": "chemise hawaïenne feuille",
              "product_description": "Chemise manches courtes coupe regular. Son imprimé feuillage est tendance et facilement associable à un jean ou un bermuda. On aime sa légèreté et sa douceur grâce à sa matière viscose. Elle détient un col requin",
              "product_price": 37,
              "owner": {
                  "account": {
                      "username": "brice",
                      "phone": "0687675434"
                  },
                  "_id": "609319aa51d49813a82f6bad"
              },
              "product_image": {
                  "asset_id": "5f50a28a47f215ec07ff50991b0890ff",
                  // ...
              },
              "__v": 0
          },
          {
              // ...
          },
          {
              // ...
          }
      ]
  }
  ```
  
##### Read-one-offer route
* URL: `http://localhost:<your-port>/offer/:id`
* Method HTTP: GET
* Goal: Read one specific offer
* request parameters:
  
  Key name | Parameter Type | Value type |  Value example 
  ---------------|--------------- | --------- | ------
  id |  params | `MongoDB` ObjectId of the offer you want to read | 6097d297358ed95c0cc17dc1
  
  **NB:**
  * **If you don't specify an `id`, all the offers will be send back**

* request example:
  
  ![example-request-read-offer](https://user-images.githubusercontent.com/49198371/119235735-46799a00-bb34-11eb-95e3-27cecf76a60c.png)
  
* response example:

  ```js
  {
    "product_details": [
        {
            "MARQUE": "Nike"
        },
        {
            "TAILLE": "44"
        },
        {
            "ÉTAT": "Mauvais état"
        },
        {
            "COULEUR": "blue"
        },
        {
            "EMPLACEMENT": "Paris"
        }
    ],
    "_id": "6097d297358ed95c0cc17dc1",
    "product_name": "chaussure route de VTT",
    "product_price": 300,
    "owner": {
        "account": {
            "username": "brice",
            "phone": "0687675434"
        },
        "_id": "609319aa51d49813a82f6bad"
    },
    "product_image": {
        "asset_id": "400a946848617fb4b2290a83f39f7c69",
        // ...
    },
    "__v": 1
  }
  ```

## Enjoy! 🙂
