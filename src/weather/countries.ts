import { load } from 'cheerio';
import type { Countries } from '../types';

export const getCountries = async (
  region: string
): Promise<Array<Countries> | undefined> => {
  try {
    const response = await (
      await fetch(`https://www.accuweather.com/en/browse-locations/${region}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; rv:124.0) Gecko/20100101 Firefox/124.0',
        },
        cache: 'no-cache',
      })
    ).text();

    const $ = load(response);

    const countries: Array<Countries> = [];
    const r = $('.location-title').text();

    $('div.result-container > a.search-result').each((i, e) => {
      const name = $(e).text();
      const id = $(e).attr('href')?.split('/')[4];
      const url = `https://www.accuweather.com` + $(e).attr('href');

      countries.push({ name, id: id!, url, region: r });
    });

    return countries;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
