import { load } from 'cheerio';
import type { Query, SearchResult, SearchResults } from '../types';

export const search = async (location: Query): Promise<SearchResults> => {
  try {
    if (typeof location !== 'string')
      throw new TypeError(
        `Type of 'location' must be a 'string'. Received: ${typeof location}`
      );

    const response = await (
      await fetch(
        `https://www.accuweather.com/en/search-locations?query=${location}`,
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

    const results: Array<SearchResult> = [];

    const totalShowing = Number(
      $('.search-results-heading > strong').text().trim()
    );

    $('.locations-list.content-module a').each((i, e) => {
      const id = $(e).attr('href');
      const url = 'https://www.accuweather.com' + $(e).attr('href');
      const name = $(e).find('p.location-name').text().trim();
      const longName = $(e).find('p.location-long-name').text().trim();

      results.push({ id, url, name, longName });
    });

    return {
      totalShowing,
      results,
    };
  } catch (error) {
    throw error;
  }
};
