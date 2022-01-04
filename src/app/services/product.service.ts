import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "http://localhost:5246/api/"

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductsByCategory(categoryId:number):Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getbycategory?categoryId="+categoryId
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  add(product:Product):Observable<ResponseModel>{
    let newPath = this.apiUrl+"products/add"
    return this.httpClient.post<ResponseModel>(newPath,product);
  }
  update(product:Product):Observable<ResponseModel>{
    let newPath = this.apiUrl+"products/update"
    return this.httpClient.post<ResponseModel>(newPath,product);
  }
  delete(product:Product):Observable<ResponseModel>{
    let newPath = this.apiUrl+"products/delete"
    return this.httpClient.post<ResponseModel>(newPath,product);
  }
  
}
