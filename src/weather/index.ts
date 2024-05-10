import { search } from '.';
import { getWeather } from '.';

export { getCountries } from './countries';
export { getDivisions } from './divisions';
export { getSubDivisions } from './subDivisions';
export { getRegions } from './regions';
export { search } from './search';
export { getWeather } from './weather';

export const findAndGetWeather = async (area: string) => {
  const res = await search(area);
  return await getWeather(res.results[0].id!);
};
