import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  zoom:number = 1.0;
  //pdfSrc: string = 'pdf/Modelo.pdf';
  pdfSrc: string = null;
  pdfObj = null;
  
  constructor(
    public navCtrl: NavController,
    private file: File,
    private transfer: FileTransfer,
    private platform: Platform,
    private fileOpener: FileOpener
  )
  {  }

  /*
  open(){
    let filename = 'Modelo.pdf';
    alert('aqui');
    this.file.copyFile(this.file.applicationDirectory + 'www/assets/', filename, this.file.externalCacheDirectory, filename)
    .then( _ => {
        this.fileOpener.open(this.file.externalCacheDirectory + filename, 'application/pdf')
        .then( _ => {
            alert('File opened');
        })
        .catch(e => alert("Error opening file: " + JSON.stringify(e)));
     })
     .catch( e => {
        alert("Error copying file: " + JSON.stringify(e));
     });
  }
  */

  open(){
    let filename = 'Modelo.pdf';
    alert('aqui');
    this.file.copyFile(this.file.applicationDirectory + 'www/assets/', filename, this.file.dataDirectory, filename)
    .then( _ => {
        this.pdfSrc = this.file.dataDirectory + filename;
     })
     .catch( e => {
        alert("Error copying file: " + JSON.stringify(e));
     });
  }
  
  download(){

    let path = null;

    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    }else{
      path = this.file.dataDirectory;
    }
    alert(path);

    const transfer = this.transfer.create();
    transfer.download('http://data.uea.edu.br/ssgp/area/1/dwd/4842-4.pdf',path+'mypdf.pdf').then((entry) => {
      alert('download complete');
    }, (error) => {
      alert('error');
    });
  }
  

  zoomIn(){
    this.zoom+=0.1;
    console.log(this.zoom);
  }

  zoomOut(){
    if(this.zoom!=1.0)
    this.zoom-=0.1;
    console.log(this.zoom);
  }
}
