import { load } from 'cheerio';
import type { WeatherData } from '../types';

export const getWeather = async (
  id: string
): Promise<WeatherData | undefined> => {
  try {
    const response = await (
      await fetch(`https://accuweather.com${id}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; rv:124.0) Gecko/20100101 Firefox/124.0',
        },
        cache: 'no-cache',
      })
    ).text();

    const $ = load(response);

    const date = $('.card-header.spaced-content p').text().trim();
    const daylightIcon = $('div.body-item:nth-child(1) img').attr('src');
    const nightIcon = $('div.body-item:nth-child(2) img').attr('src');

    const averageHi = $('div.body-item:nth-child(1) p > b')
      .text()
      .trim()
      .split(':')[1]
      .trim();
    const summeryTextHi = $(`div.body-item:nth-child(1) p`)
      .text()
      .trim()
      .split(/<b>/)[0]
      .trim()
      .split(/\n/)[0]
      .trim();

    const averageLo = $('div.body-item:nth-child(2) p > b')
      .text()
      .trim()
      .split(':')[1]
      .trim();

    const summeryTextLo = $('div.body-item:nth-child(2) p')
      .text()
      .trim()
      .split(/<b>/g)[0]
      .trim()
      .split(/\n/)[0]
      .trim();

    const currentTime = $('.cur-con-weather-card__subtitle').text().trim();
    const currentWeatherIcon =
      'https://www.accuweather.com' +
      $('.forecast-container svg').attr('data-src');
    const currentTemperatureCelsius = Number(
      $('.forecast-container .temp')
        .text()
        .trim()
        .match(/-?\d+(\.\d+)?/)?.[0]
    );
    const currentTemperatureFahrenheit =
      (currentTemperatureCelsius * 9) / 5 + 32;
    const averageFahrenheit = Math.ceil(
      (currentTemperatureCelsius * 9) / 5 + 32
    );

    const currentTemperatureFullCelsius = $('.forecast-container .temp')
      .text()
      .trim();
    const currentTemperatureFullFahrenheit = `${
      (currentTemperatureCelsius * 9) / 5 + 32
    }°F`;
    const averageFullFahrenheit = `${Math.ceil(
      (currentTemperatureCelsius * 9) / 5 + 32
    )}°F`;

    const feelsLikeCelsius = Number(
      $('.spaced-content.detail:nth-child(1)')
        .text()
        .trim()
        .match(/-?\d+(\.\d+)?/)?.[0]
    );

    const feelsLikeCelsiusFull = `${
      $('.spaced-content.detail:nth-child(1)')
        .text()
        .trim()
        .match(/-?\d+(\.\d+)?/)?.[0]
    }°C`;

    const currentWeather = {
      currentTime,
      currentWeatherIcon,
      currentTemperature: {
        currentTemperatureCelsius,
        currentTemperatureFahrenheit,
        averageFahrenheit,
      },
      currentTemperatureFull: {
        currentTemperatureFullCelsius,
        currentTemperatureFullFahrenheit,
        averageFullFahrenheit,
      },
      feelsLike: {
        feelsLikeCelsius,
        feelsLikeCelsiusFull,
      },
    };

    return {
      averageHi,
      averageLo,
      date,
      daylightIcon,
      nightIcon,
      summeryTextHi,
      summeryTextLo,
      currentWeather,
    };
  } catch (error) {
    throw error;
  }
};
