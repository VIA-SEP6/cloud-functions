# Cloud Functions Movies

### `POST` Get movie

Get a specific movie<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/movies-get`

```js
const requestBody = {
  data: {
    movieId: "46345",
  },
};
```

### `POST` Get popular movies

Get all popular movies<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/movies-getPopular`

```js
const requestBody = {
  data: {},
};
```

### `POST` Get upcoming movies

Get all upcoming movies<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/movies-getUpcoming`

```js
const requestBody = {
  data: {},
};
```

### `POST` Get top rated movies

Get all top rated movies<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/movies-getTopRated`

```js
const requestBody = {
  data: {},
};
```

### `POST` Search movies

Get all top rated movies<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/movies-search`

```js
const requestBody = {
  data: {
    query: "Mad Max",
  },
};
```
