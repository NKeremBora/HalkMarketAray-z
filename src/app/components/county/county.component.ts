import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { County } from 'src/app/models/county';
import { CountyService } from 'src/app/services/county.service';


@Component({
  selector: 'app-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.css']
})
export class CountyComponent implements OnInit {
  currentCounty:County;
  counties:County[] = [];
  constructor(private countyService:CountyService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getCaunties();
    this.currentCounty = this.getCurrentCounty();

  }
  getCaunties(){
    this.countyService.getCaunties().subscribe(response => {
      this.counties = response.data;
    })
  }
  setCurrentCounty(county:County){
    this.currentCounty = county;
    this.localStorageService.add("county",JSON.stringify(this.currentCounty));
  }
  getCurrentCounty(){
    let county:string = this.localStorageService.getItem("county");
    return JSON.parse(county);
  }
  Value(){
    let county:County = this.getCurrentCounty();
    return county;
  }
  reloadCurrentPage(){
    window.location.reload();
  }
}
