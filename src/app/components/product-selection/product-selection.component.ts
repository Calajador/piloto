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

  constructor(private router:Router,
              private _location:Location,
              private productService:ProductService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  onClickContinue(){
    this.router.navigate(['/regular','policy']);
  }

  getProduct(){
    this.productService.getProducts().subscribe(
      res=>{
        this.products=res
      },
      err=>{
        console.log(err);
      }
    )
    ;
  }

  onClickBack(){
    this._location.back();
  }

}
