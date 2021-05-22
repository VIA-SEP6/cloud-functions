# Cloud Functions Reviews

### `POST` Add Review

Adds a new review <br>

`https://europe-west1-sep6-310611.cloudfunctions.net/reviews-add`

```js
const requestBody = {
  data: {
    movieId: "7009",
    description: "This movie is the best",
    rating: 9.5,
  },
};
```

### `POST` Like Review

Like a review <br>

`https://europe-west1-sep6-310611.cloudfunctions.net/reviews-like`

```js
const requestBody = {
  data: {
    reviewId: 3456,
  },
};
```

### `POST` Dislike Review

Dislike a review <br>

`https://europe-west1-sep6-310611.cloudfunctions.net/reviews-dislike`

```js
const requestBody = {
  data: {
    reviewId: 3456,
  },
};
```

### `POST` Remove Reaction Review

Remove reaction from review <br>

`https://europe-west1-sep6-310611.cloudfunctions.net/reviews-removeReaction`

```js
const requestBody = {
  data: {
    reviewId: 3456,
  },
};
```
