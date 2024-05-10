# discord-weather
 A publicly available weather fetcher, especially created for Discord Bots but can be used everywhere

## Features
- Fast
- Free and no API key required
- Unlimited usage
- Easy to use

## Usage

Get current weather

```ts
const { getWeather } = require('discord-weather');

(async() => {
    console.log(await getWeather('Id'));
})()
```

If you wish to search and get weather

```ts
const { findAndGetWeather } = require('discord-weather');

(async() => {
    console.log(await findAndGetWeather('Ohio'));
})();
```

All functions are exported including utils and types. So use your creativity and create something really awesome!