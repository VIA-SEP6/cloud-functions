# Cloud Functions

### `POST` Register User 
Creates a new user account<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/user-register`

```js
const requestBody = {
data:{
  userName: "David",
  password: "theBestOne",
  email: "david@via.dk",
  userInfo: {
    age: 22,
    country: "Denmark",
    phone: "+4578451296"
    }
   }
}
```

### `POST` Get User Profile
Retrieves User information account<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/user-getProfile`

```js
const requestBody = {
data:{
  userId: "ugqkdgybwh549849"
   }
}
```


### `POST` Update User Profile
Updates User information<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/user-getProfile`

```js
const requestBody = {
data:{
  userId: "ugqkdgybwh549849",
  user:{
     userName: "Dorcia",
     phone: "68485165469"
  }
   }
}
```
