import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageUploaderService } from '../services/image-uploader.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  constructor(public uploadProvider: ImageUploaderService) { }

  locationEnabled = false;

  @ViewChild('myPond') myPond: any;

  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png, image/jpg',
    allowImagePreview: false

  }

  pondFiles = [
    'index.html'
  ]

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  ngOnInit() { 
    navigator.geolocation.getCurrentPosition(resp => {
      if(resp) {
        this.locationEnabled = true;
      }
      console.log({lng: resp.coords.longitude, lat: resp.coords.latitude});
    },
    err => {
      console.log(err);
      this.locationEnabled =false;
    });
  }

}
