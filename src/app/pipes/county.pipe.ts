import { County } from 'src/app/models/county';
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'county'
})
export class CountyPipe implements PipeTransform {

  transform(value: Product[], county:County ): Product[] {
    if(county === null){
      return value;
    }
    else{
      return value.filter((p:Product) => p.countyId == county.countyId)
    }
  };

}
