# assignment-viz

A very simplified app visualizing assignment responses.
Quick and dirty, doesn't handle any corner cases.

## Finding the right response file

Not sure if there's any logic to it, but even if you have a `request.json` object, it's not
that easy to find the right `response.json` object. You can find the right bucket, but finding the exact
file would require either parsing timestamps encoded in file names or listing all objects in a bucket.
It would be far easier to just make both request and response objects use the exact same file name.

## Running locally

### Frontend

```sh
pnpm install
pnpm start
```

Or, if you prefer `npm`:

```sh
npm install
npm run start
```

### Backend

```sh
poetry install
poetry run uvicorn main:app --reload
```
