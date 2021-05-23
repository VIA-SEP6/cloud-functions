# Cloud Functions Movies

***

### `POST` Get movie

Get a specific movie<br>

`movies-get`

```js
const requestBody = {
    data: {
        movieId: "46345",
    },
};
```

***

### `POST` Get popular movies

Get all popular movies<br>

`movies-getPopular`

```js
const requestBody = {
    data: {},
};
```

***

### `POST` Get upcoming movies

Get all upcoming movies<br>

`movies-getUpcoming`

```js
const requestBody = {
    data: {},
};
```

***

### `POST` Get top rated movies

Get all top rated movies<br>

`movies-getTopRated`

```js
const requestBody = {
    data: {},
};
```

***

### `POST` Search movies

Get all top rated movies<br>

`movies-search`

```js
const requestBody = {
    data: {
        query: "Mad Max",
    },
};
```
