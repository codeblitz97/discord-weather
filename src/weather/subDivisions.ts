import { load } from 'cheerio';
import type { SubDivisions } from '../types';

export const getSubDivisions = async (
  region: string,
  country: string,
  division: string
): Promise<Array<SubDivisions> | undefined> => {
  try {
    const response = await (
      await fetch(
        `https://www.accuweather.com/en/browse-locations/${region}/${country}/${division}`,
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

    const subDivisions: {
      id: string;
      name: string;
      url: string;
      key: string;
      division: string;
    }[] = [];
    const d = $('.location-title').text();

    $('div.result-container > a.search-result').each((i, e) => {
      const name = $(e).text();
      const id = $(e).attr('href')?.slice(1);
      const key = $(e).attr('href')?.split('?key=')[1].split('&').shift();
      const url = `https://www.accuweather.com` + $(e).attr('href');

      subDivisions.push({ name, id: id!, url, division: d, key: key! });
    });

    return subDivisions;
  } catch (error) {
    console.error(error);
  }
};
