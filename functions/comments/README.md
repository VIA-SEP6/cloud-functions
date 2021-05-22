# Cloud Functions comments

### `POST` Add comment

Adds a new comment <br>

`https://europe-west1-sep6-310611.cloudfunctions.net/comments-add`

```js
const requestBody = {
  data: {
    movieId: "7009",
    description: "This movie is the best",
    rating: 9.5,
  },
};
```

### `POST` Like comment

Like a comment <br>

`https://europe-west1-sep6-310611.cloudfunctions.net/comments-like`

```js
const requestBody = {
  data: {
    commentId: 3456,
  },
};
```

### `POST` Dislike comment

Dislike a comment <br>

`https://europe-west1-sep6-310611.cloudfunctions.net/comments-dislike`

```js
const requestBody = {
  data: {
    commentId: 3456,
  },
};
```

### `POST` Remove Reaction comment

Remove reaction from comment <br>

`https://europe-west1-sep6-310611.cloudfunctions.net/comments-removeReaction`

```js
const requestBody = {
  data: {
    commentId: 3456,
  },
};
```
