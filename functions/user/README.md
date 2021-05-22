# Cloud Functions User

### `POST` Register User

Creates a new user account<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/user-register`

```js
const requestBody = {
  data: {
    userName: "David",
    password: "theBestOne",
    email: "david@via.dk",
    userInfo: {
      age: 22,
      country: "Denmark",
      phone: "+4578451296",
    },
  },
};
```

### `POST` Get User Profile

Retrieves User information account<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/user-getProfile`

```js
const requestBody = {
  data: {
    userId: "ugqkdgybwh549849",
  },
};
```

### `POST` Update User Profile

Adds User's favourite movies<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/user-addFavouriteMovie`

```js
const requestBody = {
  data: {
    userId: "Cv3bBw5woEcfJYCcEY9sFlGzvwE3",
    movieId: "789456",
  },
};
```

### `POST` Add favourite movies to User Profile

Adds User's favourite movies<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/user-addFavouriteMovie`

```js
const requestBody = {
  data: {
    userId: "Cv3bBw5woEcfJYCcEY9sFlGzvwE3",
    movieId: "789456",
  },
};
```

### `POST` Removes favourite movies from User Profile

Adds User's favourite movies<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/user-removeFavouriteMovie`

```js
const requestBody = {
  data: {
    userId: "Cv3bBw5woEcfJYCcEY9sFlGzvwE3",
    movieId: "789456",
  },
};
```
