import { load } from 'cheerio';
import type { Divisions } from '../types';

export const getDivisions = async (
  region: string,
  country: string
): Promise<Array<Divisions> | undefined> => {
  try {
    const response = await (
      await fetch(
        `https://www.accuweather.com/en/browse-locations/${region}/${country}`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; rv:124.0) Gecko/20100101 Firefox/124.0',
          },
          cache: 'no-cache',
        }
      )
    ).text();

    const $ = load(response);

    const divisions: Array<Divisions> = [];
    const c = $('.location-title').text();

    $('div.result-container > a.search-result').each((i, e) => {
      const name = $(e).text();
      const id = $(e).attr('href')?.split('/')[5];
      const url = `https://www.accuweather.com` + $(e).attr('href');

      divisions.push({ name, id: id!, url, country: c });
    });

    return divisions;
  } catch (error) {
    console.error(error);
  }
};
