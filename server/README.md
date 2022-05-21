<h1 align="center">Fifth Wall Media</h1>
<p align="center"><a href="https://www.linkedin.com/in/ben-skee-software-engineer/">LinkedIn</a>

## About The Project

This is the backend for the Fifth Wall Media project. Fifth Wall Media is a website that allows users to host a video with a webpage that changes its display based on the timestamp of the video. An active version of this project can be found at <a href="https://fifth-wall-media.herokuapp.com/">https://fifth-wall-media.herokuapp.com/</a>. The frontend for the website can be found at <a href="https://github.com/benskee/fifth-wall-media">https://github.com/benskee/fifth-wall-media</a>. The hosted version of the backend with a connection to the database can be found at <a href="https://fifth-wall-media-api.herokuapp.com/api">https://fifth-wall-media-api.herokuapp.com/api</a>.

## Getting Started

1. Clone the repo
    ```shell
    git clone https://github.com/benskee/fifth-wall-media.git
    ```

2. Install packages
    ```sh
    npm install
    ```

3. Activate Server

    ```sh 
    node server.js
    ```

    or if you want to monitor changes with nodemon

    ```sh 
    nodemon server.js
    ```

**This project will need a .env file with a mongoDB connection string as the variable MONGOURI