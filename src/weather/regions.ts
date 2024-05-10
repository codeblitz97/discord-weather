import { load } from 'cheerio';
import type { Regions } from '../types';

export const getRegions = async (): Promise<Array<Regions> | undefined> => {
  try {
    const response = await (
      await fetch('https://www.accuweather.com/en/browse-locations', {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; rv:124.0) Gecko/20100101 Firefox/124.0',
        },
        cache: 'no-cache',
      })
    ).text();

    const $ = load(response);

    const regions: Array<Regions> = [];

    $('div.result-container > a.search-result').each((i, e) => {
      const name = $(e).text();
      const id = $(e).attr('href')?.split('/')[3];
      const url = `https://www.accuweather.com` + $(e).attr('href');

      regions.push({ name, id: id!, url });
    });

    return regions;
  } catch (error) {
    console.error(error);
  }
};
