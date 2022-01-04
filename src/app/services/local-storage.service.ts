import { Injectable } from '@angular/core';
import { County } from '../models/county';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getItem(key: string) {
    return localStorage.getItem(key);
  }

  add(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
