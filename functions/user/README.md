# Cloud Functions User

***

### `POST` Register User

Creates a new user account<br>

`user-register`

```js
const requestBody = {
    data: {
        userName: "David",
        password: "theBestOne",
        email: "david@via.dk",
    },
};
```

***

### `POST` Get User Profile

Retrieves User information account<br>

`user-getProfile`

```js
const requestBody = {
    data: {},
};
```

***

### `POST` Update User Profile

Updates users information

`user-updateProfile`

```js
const requestBody = {
    data: {
        userName: "Test User",
        age: "22",
        country: null,
        phone: "12345678",
    },
};
```

***

### `POST` Add favourite movies to User Profile

Adds User's favourite movies<br>

`user-addFavouriteMovie`

```js
const requestBody = {
    data: {
        movieId: "789456",
    },
};
```

***

### `POST` Removes favourite movies from User Profile

Adds User's favourite movies<br>

`user-removeFavouriteMovie`

```js
const requestBody = {
    data: {
        movieId: "789456",
    },
};
```
