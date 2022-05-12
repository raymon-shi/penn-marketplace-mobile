# Penn Marketplace Mobile

## Description
A Penn exclusive marketplace where people within the community can buy and sell goods and services to each other.

## Table of Content
1. [Problem Statement](#problem-statement)
2. [Features](#features)
3. [Project Folder Structure](#project-folder-structure)
4. [How to Run the Project](#how-to-run-the-project)
5. [Technologies](#technologies)
6. [Web App](#web-app-version)
7. [Credit](#credit)


## Problem Statement
Over the course of the years, many students buy and use a multitude of items and services. We believe that recycling some of these items and services through the Penn community would help reduce waste to the environment while connecting students to cheaper options for their educational needs. Since buyers and sellers are from the same Penn community, this app would lower costs for students looking to buy something (e.g. used textbooks, workbooks, clothes, furniture, etc…).

Furthermore, there are a variety of platforms and websites that students usually list their items on, oftentimes leading to meetups with strangers. By using our app, we can limit the transaction population to the Penn community and reduce the risk of “shady” meetups.

## Features
Coming soon...

## Project Folder Structure
    .
    ├── backend
    │   ├── middleware                         
    │   ├── models                            
    │   ├── routes
    |   ├── userUploads
    │   ├── package.json
    │   ├── server.js
    ├── frontend
    │   ├── src
    |   |   ├── component
    |   │   │   ├── account
    |   │   │   │   ├── assets
    |   │   │   ├── buyer
    |   │   │   │   ├── cart
    |   │   │   │   ├── checkout
    |   │   │   │   ├── item
    |   │   │   ├── chat
    |   │   │   │   ├── components
    |   │   │   ├── homepage
    |   │   │   │   ├── assets
    |   │   │   ├── login
    |   │   │   │   ├── assets
    |   │   │   │   ├── data
    |   │   │   ├── searchbar
    |   │   │   │     ├── assets
    |   │   │   │     ├── components
    |   │   │   ├── search
    |   │   │   │     ├── assets
    |   │   │   │     ├── data
    |   │   │   ├── seller
    │   ├── App.js
    │   ├── package.json
    └── README.md
    
  ## How to Run the Project
  ```
  git clone the-repository
  cd backend
  npm install
  npm start
  cd frontend
  npm install
  npm start
  ```
  The project should run on localhost:3000 and the server is ran on localhost:8080
  
  ## Technologies
  The project was built with the following technologies:
-   MongoDB
-   Mongoose
-   Express.js
-   Axios
-   Bcrypt
-   React Native
-   Native Base
-   React Navigation
-   Node.js
-   Nodemon

## Web App Version
https://github.com/raymon-shi/penn-marketplace

## Credit
| Name      | GitHub Username |
| ----------- | ----------- |
| Raymon Shi      | [raymon-shi](https://github.com/raymon-shi)       |
| Cindy Chen   | [cindych](https://github.com/cindych)        |
| Harrison Ly   | [hly8](https://github.com/hly8)        |
| Damon Luong   | [damon-luong](https://github.com/damon-luong)        |
| Fei Liu   | [FeiLCube](https://github.com/FeiLCube)        |

## Footnote
note: to get rid of errors involving "export 'ViewPropTypes' was not found..."
* go to react-native-web folder inside node_modules
* go to dist/index.js
* add in the following line
```
export const ViewPropTypes = { style: null };
```

