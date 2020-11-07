import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteDataService {
  public getItems<T>(route: ActivatedRoute): T[] {
    return this.get<T[]>('items', route);
  }

  public getItem<T>(route: ActivatedRoute): T {
    return this.get<T>('item', route);
  }

  public get<T>(propertyName: string, route: ActivatedRoute): T {
    return route.snapshot.data[propertyName] as T;
  }
}
