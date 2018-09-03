import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators'

import { apiUrl } from '../consts/apiUrl';

function newError(errors) {
  console.log(errors);
  return errors
}

export function sendRequestObservable(method: string, url: string, data?: any) {
  return ajax({
    url: apiUrl + url,
    body: data,
    method,
  }).pipe(
    map((e) => e.response),
    catchError((error) => newError(error.message)),
  )
}
