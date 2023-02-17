## Sending HTTP Requests and Connecting to the Database 
React Project
Author : Smriti Pradhan
Date : 17 - 02 - 2023 

In this Project we will understand how to send http requests and connecting to the Database .

### Connect React Application to Backend & Database .

1. How do React Apps Interact with Database ?
2. Sending HTTP Requests and Using Responses.
3. Handling Errors and Loading State.

### How to (Not) connect to Database directly

In General React Apps, browser side codes or JS Codes running in a browser should never talk to Database directly. We should never establish a connection directly from Database to the React Application / BrowserSide Codes / JS Codes.

If we directly try to connect to the database directly from inside your client-side , your browser side Javascript code, you would expose your database credentials at that code because all the javascript code can be accessed and read not just by the browser but also by the users of the websites.(Exposure of credentials related to the Database). This could bring some performance issues but security problems is the biggest problem of all .

We have a backend application running in server. Now this backend application can be written with any server side language of choice - NodeJS , PHP , [ASP.NET](http://ASP.NET) 

Backend code cannot be visible to the users and they can never see the code as it is written in another server .

### Using Star Wars API

https://swapi.dev/

RestAPIs . 

1. Sending a Get Request