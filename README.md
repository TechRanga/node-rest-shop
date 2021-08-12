# node-rest-shop
NodeJS RESTful service sample code - GET/POST APIs for Product and Orders

Simple NodeJS RESTFul service to manipulate users, products and orders. Included jwt token authorization for all post requests (except login/register).

Depdendencies used:
bcrypt 5.0.1 -> To hash passwords
dotenv 10.0.0 -> For environment variables (DBURL, Token Key etc)
jsonwebtoken 8.5.1 -> Auth Token
multer 1.4.2 -> To upload image files
express 4.17.1 -> To manage HTTP requests
mongoose 5.13.3 -> To manage database connections/schema
morgan 1.10.0 -> Logger for all requests response 

Routes:
POST user/signup
POST user/register

GET product/ (gets all product)
POST product/ (create product)
GET product/{:productID} (get specific product)
DELETE product/{:productID} (delete specific product)
PATH product/{:productID} (update details of specific product)

GET order/ (get all orders)
POST order/ (create order)
DELETE order/{:orderID} (delete specific order)

APIs tested using Postman app.

Databse: MongoDB
