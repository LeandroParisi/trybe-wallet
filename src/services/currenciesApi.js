import { response } from '../tests/mockData';

export function mockFetch () {
  return Promise.resolve(response)
}
