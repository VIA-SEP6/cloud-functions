# Cloud Functions comments

***

### `POST` Add comment

Adds a new comment <br>

`comments-add`

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

### `POST` Like comment

Like a comment <br>

`comments-like`

```js
const requestBody = {
    data: {
        commentId: "as5d4as",
    },
};
```

***

### `POST` Dislike comment

Dislike a comment <br>

`comments-dislike`

```js
const requestBody = {
    data: {
        commentId: "as5d4as",
    },
};
```

***

### `POST` Remove Reaction comment

Remove reaction from comment <br>

`comments-removeReaction`

```js
const requestBody = {
    data: {
        commentId: "as5d4as",
    },
};
```
