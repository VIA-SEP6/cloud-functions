# Cloud Functions Reviews

***

### `POST` Add Review

Adds a new review <br>
`reviews-add`

```js
const requestBody = {
    data: {
        movieId: "7009",
        description: "This movie is the best",
        rating: 9.5,
    },
};
```

***

### `POST` Like Review

Like a review <br>

`reviews-like`

```js
const requestBody = {
    data: {
        reviewId: "as5d4as",
    },
};
```

***

### `POST` Dislike Review

Dislike a review <br>

`reviews-dislike`

```js
const requestBody = {
    data: {
        reviewId: "as5d4as",
    },
};
```

***

### `POST` Remove Reaction Review

Remove reaction from review <br>

`reviews-removeReaction`

```js
const requestBody = {
    data: {
        reviewId: "as5d4as",
    },
};
```
