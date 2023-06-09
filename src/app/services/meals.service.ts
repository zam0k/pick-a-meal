import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal, Meals, MealsByCategory } from '../interfaces/Meal';
import { Observable } from 'rxjs';
import { Categories } from '../interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  baseUrl: string = 'https://www.themealdb.com/api/json/v1/1/';
  constructor(private http: HttpClient) {}

  getRandomMeals(): Observable<Meals> {
    // not so random since I dont have the api key ehehhe
    return this.http.get<Meals>(this.baseUrl + 'search.php?f=p');
  }

  getMealById(id: string | null): Observable<Meal> {
    return this.http.get<Meal>(this.baseUrl + 'lookup.php?i=' + id);
  }

  getMealByFirstLetter(first: string | null): Observable<Meals> {
    return this.http.get<Meals>(this.baseUrl + 'search.php?f=' + first);
  }

  getMealByName(name: string | null): Observable<Meals> {
    return this.http.get<Meals>(this.baseUrl + 'search.php?s=' + name);
  }

  getMealsOnSearch(name: string | null): Observable<Meals> {
    if (!name) {
      return this.getRandomMeals();
    }

    if (name.length === 1) {
      return this.getMealByFirstLetter(name);
    }

    return this.getMealByName(name);
  }

  getMealCategories(): Observable<Categories> {
    return this.http.get<Categories>(this.baseUrl + 'categories.php');
  }

  getMealByCategoryName(name: string | null): Observable<MealsByCategory> {
    return this.http.get<MealsByCategory>(
      this.baseUrl + 'filter.php?c=' + name
    );
  }
}
