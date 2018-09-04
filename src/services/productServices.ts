import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators'

import { apiUrl } from '../consts/apiUrl';

export function getProducts() {
  return ajax({
    url: apiUrl + '/api/products/155',
    method: 'get',
  }).pipe(
    map((res) => res),
  )
}
