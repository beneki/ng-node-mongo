import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointConfig } from './constants/EndpointConfig';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private getEndPoint;

  constructor(private http: HttpClient) {
    this.getEndPoint = EndpointConfig.getEndpointAddress;
  }

  // giveMeUrl(method, queryString: string) {
  //   return `http://${this.server.port}:${this.server.port}/${this.server.api}/${method}${queryString ? ('?' + queryString) : '' }`;
  // }

  getEvents() {
    return this.http.get<any>(this.getEndPoint('events'));
  }

  getSpecialEvents() {
    return this.http.get<any>(this.getEndPoint('specials'));
  }

  getCompanies(config) {
    return this.http.post<any>(this.getEndPoint('companies'), config);
  }

  insertCompany(comp) {
    return this.http.post<any>(this.getEndPoint('companies'), comp);
  }

  updateCompany(comp) {
    return this.http.put<any>(this.getEndPoint('companies'), comp);
  }

  deleteCompany(comp) {
    return this.http.delete<any>(this.getEndPoint('companies'), comp);
  }

}
