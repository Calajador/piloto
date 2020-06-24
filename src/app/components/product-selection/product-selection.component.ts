import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/Product';
import {Location} from '@angular/common';
@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent implements OnInit {

  products:Product[];
  idProduct:number;

  constructor(private router:Router,
              private _location:Location,
              private productService:ProductService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  onClickContinue(){
    localStorage.setItem("idProduct",this.idProduct.toString());
    this.router.navigate(['/regular','policy']);
  }

  getProduct(){
    this.productService.getProducts().subscribe(
      res=>{
        this.products=res
        this.idProduct=this.products[0].id;
        
      },
      err=>{
        
       
      }
    )
    ;
  }

  onChangeProduct(event){
    this.idProduct=+event.target.value
  }

  onClickBack(){
    this._location.back();
  }

}
