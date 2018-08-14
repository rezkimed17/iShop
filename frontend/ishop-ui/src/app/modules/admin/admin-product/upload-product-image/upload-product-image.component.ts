import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-upload-product-image',
  templateUrl: './upload-product-image.component.html',
  styleUrls: ['./upload-product-image.component.css']
})
export class UploadProductImageComponent implements OnInit {
  fileToUpload: File = null;
  productId: Number;
  sub;

  submitted: boolean = false;
  success: boolean = false;
  failed: boolean = false;
  message: string = "";


  constructor(private adminService: AdminService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.url.subscribe(params => {
      if (params[1].path == 'image-upload') {
        this.productId = Number.parseInt(params[2].path);
      }

    })
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    this.adminService.postFile(this.fileToUpload, this.productId).subscribe(
      (data) => {
      // do something, if upload success
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
