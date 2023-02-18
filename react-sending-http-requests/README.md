## Sending HTTP Requests and Connecting to the Database 
React Project
Author : Smriti Pradhan
Date : 17 - 02 - 2023 

In this Project we will understand how to send http requests and connecting to the Database .

* Use npm i inside folders to install node modules before runnning the application

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

#### 1. Sending a Get Request

We will be using fetch which is built into the browser to send HTTP request to fetch and send data . By default in fetch the method is GET.The data is sent in a JSON format in which the keys are wrapped into double quotes.There are no methods and only data. It needs to be transformed into a javascript object.

-------------------------------------------------------------------
```

function fetchMoviesHandler(){
    fetch('https://swapi.dev/api/films/').then(response=> {
     return response.json();
    }).then(data=>{
      console.log(data?.results);
    });
}

```
-------------------------------------------------------------------
After transforming the json data to javascript object we return it and then we receive the data in another then block. As of now in the initial phase of the project we access the data of movies in a function in App.js file when we click on the Fetch Movies button.

-------------------------------------------------------------------
```

function fetchMoviesHandler(){
    fetch('https://swapi.dev/api/films/').then(response=> {
     return response.json();
    }).then(data=>{

      const transformedMovies = data?.results?.map(moviesData=>{
        return {
          id:moviesData?.episode_id,
          title:moviesData?.title,
          openingText:moviesData?.opening_crawl,
          releaseDate : moviesData?.release_date,

        }
      })

      setMovies(transformedMovies);
    });
  }

```
  -------------------------------------------------------------------
  We used episode_id , title , opening_crawl and release date from the response data object we received from the API.

#### Using Async and Await
folder - 02-async-await 

Run npm i inside 02-async-await folder . You can find the code which uses async and await to handle promises.A promise is a placeholder object for the eventual result (or error) of an asynchronous operation.

```
  async function fetchMoviesHandler() {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedMovies = data?.results?.map((moviesData) => {
      return {
        id: moviesData?.episode_id,
        title: moviesData?.title,
        openingText: moviesData?.opening_crawl,
        releaseDate: moviesData?.release_date,
      };
    });

    setMovies(transformedMovies);
  }

  ```

  #### Handling Loading and Data States
  folder - 02-async-await 

  Dummy way to show different states based on the data we get . Replace the below code with a spinner or different loading Messages based on the Project requirements . 

  1. We got no movies
  2. We have movies
  3. We are loading

```
  async function fetchMoviesHandler() {
    setIsLodaing(true);
    ....
    ....
    setIsLodaing(false);
  }

<section>
        {isLoading && <p>Loading....</p>}
        {!isLoading && movies?.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies?.length === 0 && <p>Found no movies </p>}
 </section>

 ```

#### Handling HTTPS Errors


List of Errors which we may encounter with the HTTP status codes
https://en.wikipedia.org/wiki/List_of_HTTP_status_codes


```
const [error,setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLodaing(true);
    setError(null);

    try{
      const response = await fetch("https://swapi.dev/api/film/"); //url mistaken
      if(!response.ok) 
      // Manually throwing errors using response.ok
      {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const transformedMovies = data?.results?.map((moviesData) => {
        return {
          id: moviesData?.episode_id,
          title: moviesData?.title,
          openingText: moviesData?.opening_crawl,
          releaseDate: moviesData?.release_date,
        };
      });
  
      setMovies(transformedMovies);
      setIsLodaing(false);
    }
    catch(error)
    {
      setError(error.message);  // we catch the error here and set the error as error.message we received
    }
    setIsLodaing(false); //no matter success or failure we stop loading
  }

  .......
  {!isLoading && movies?.length === 0 && !error&& <p>Found no movies </p>}
  {!isLoading && error && <p>{error}</p>}
  .......


  ```


Displaying all the conditions elegantly.

```
 let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

 ...

<section>
    {content}
</section>
 ...

```