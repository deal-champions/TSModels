These are models that include (de)serialization of each class and complex logic
for the ability to save all the terms, possible values, etc of the scenarios in the backend.

These models could be used in the future, when we may have more than one front-end client and
when the scenarios live in the Backend and all the logic is happening in the backend, and the
front-end is just a way to present the game state.

This approach would be safer, as hacker cannot really hack the backend - let's say if someone
submits an incorrect value for a term or incorrect terms, etc.

However, while still building the MVPs, this is probably unnecessary as it requires a lot more
engineering and hence a lot more time.
