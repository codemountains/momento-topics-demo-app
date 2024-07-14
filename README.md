# Momento Topics Demo App

This application is a demo application using Momento Topics.

## Testing

### Install npm packages

```shell
npm i
echo "VITE_MOMENTO_API_KEY=\nVITE_MOMENTO_CACHE_NAME=\nVITE_MOMENTO_TOPIC_NAME=" > .env.local
```

### Setup the API Key

1. Go to the [Momento console](https://console.gomomento.com/tokens) and follow the instructions to log in with your email address, Google account, or GitHub account.
2. In the console, select the [API Keys](https://console.gomomento.com/tokens) menu option.
3. Once on the API key page, select the information that matches where your caches live.
4. Once complete, click on the Generate button to create your API Key.

## Run

```shell
npm run vite
```
