import { Image } from './../models/image';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductimageService {

    constructor(private httpClient: HttpClient) {}
    apiUrl = 'https://localhost:5246/api/';
  
    getAll():Observable<ListResponseModel<Image>>{
      return this.httpClient.get<ListResponseModel<Image>>(this.apiUrl+'productimages/getall')
    }
  
    deleteImage(productImage:Image):Observable<ResponseModel>{
      let newPath = this.apiUrl + "ProductImages/delete";
      return this.httpClient.post<ResponseModel>(newPath,productImage)
    }
  
    upload(productImage:Image): Observable<ResponseModel> {
      let newPath = this.apiUrl + "productimages/add";
      return this.httpClient.post<ResponseModel>(newPath,productImage);
    }
  
    updated(productImage:Image): Observable<ResponseModel> {
      let newPath = this.apiUrl + "productimages/update";
      return this.httpClient.post<ResponseModel>(newPath,productImage);
    }
  }

