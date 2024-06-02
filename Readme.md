# Shopify ![Shopify](./shopify//src/assets/icons/logo.png) 


## Description

This is a simple ecommrece website built with following technologies:

- React
- Tailwind CSS
- Express
- TypeScript
- MongoDB

## Installation and setup

1. Clone the repository

2. Install the dependencies

backend dependencies

```bash
npm install
npm install -g typescript
```

frontend dependencies

make sure you have vite for react

```bash
cd shopify 
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```


## Starting

3. Start the backend server

```bash
tsc -b
npm start
```
This will start the backend server on port 4000

4. Start the frontend server

```bash
npm run dev
```
This will start the frontend server on port 5173


## keep in mind

1. **mongodb** Make sure you have MongoDB installed and running on your machine if not you can use MongoDB Atlas, or docker to run the MongoDB server in a container.

2. Make sure you have the **.env** in which you have the following variables

```
JWT_SECRET="secret"
MONGODB_URL="mongodb://localhost/shopify"
PORT=4000
```
3. make sure you have the same api port as backend is running on in helper.jsx file in the frontend folder and my repo is using the following url so comment out "import.meta.env.VITE_API_URL" in the helper.jsx file as follows

```
export const base_url = 'http://localhost:4000/api/v1';
// export const base_url = import.meta.env.VITE_API_URL;
export const base_image_url = 'http://localhost:4000/uploads';

```
4. if you want to use docker file in the backend folder you can use the following command to build the image and run the container

```
docker build -t shopify .
docker run -p 4000:4000 shopify
```
but database will not be connected to the container so you have to use the following command to connect the database to the container. this will need a mongodb container running on your machine and connected to same network as the shopify container


## Hosting 

1. **Frontend** is hosted on **vercel** 
2. **Backend** is hosted on **render.com**
3. **Database** is hosted on **MongoDB Atlas**

**Note**: Since all are free tier services, the initial load time might be slow. please be patient. 
