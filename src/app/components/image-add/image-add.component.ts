import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductimageService } from 'src/app/services/productimage.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {
  imageAddForm:FormGroup;
  products:Product[]=[];
  selectedFile : File = null

  constructor(private productService:ProductService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private productImageService:ProductimageService) { }

  ngOnInit(): void {
    this.load();
  }
  load(){
    this.getCarList();
    this.createImageAddForm();
  }

  createImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      productId: ['',Validators.required],
      file: [null],
    });
  }

  getCarList(){
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data
    })
  }

  uploadFile(event:any) {
    const carImage = (event.target as HTMLInputElement).files[0];
    this.imageAddForm.patchValue({
      file: carImage
    });
    this.imageAddForm.get('file').updateValueAndValidity()
  }


  submitForm() {
    if(this.imageAddForm.valid){
      var formData: any = new FormData();
      formData.append("file", this.imageAddForm.get('file').value);
      formData.append("ProductId", this.imageAddForm.get('productId').value.toString());
      this.productImageService.upload(formData).subscribe(response=>{
        this.toastrService.success(response.message);
      })

    }else{
      this.toastrService.error('Form Bilgileriniz Eksik');
    }

  }

}
