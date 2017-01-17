import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import {Camera, Transfer} from 'ionic-native';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class Detail {
    todo:any;
    image:any="http://192.168.1.162/note/Todo-Cloud-Logo-200.png"
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.todo = this.navParams.get("todo");
    }

  pop(){
    this.navCtrl.pop();
  }

  upload(image){
  var options:any;

  options = {
    params : {
      id: this.todo.id
    }

  }
  const fileTransfer = new Transfer();
  fileTransfer.upload(image, "http://192.168.1.162/note/image.php", options)
  .then((data) => {
    console.log(JSON.stringify(data)); 
    (err) => {
      console.log(err);
    }
  })
}

  takePhoto() {
    var options = {
      quality:75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit:true,
      encodingType: Camera.EncodingType.JPEG
    };

    Camera.getPicture(options).then((image)=>{
      this.image = image;
      this.upload(this.image);
    }, (err)=>{

    });
  }

  takeLibrary(){
      var options = {
      quality:75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true,
      encodingType: Camera.EncodingType.JPEG
    };

    Camera.getPicture(options).then((image)=>{
this.image = image;
    }, (err)=>{

    });
  }

  chooseMedia(){
    let actionsheet = this.actionSheetCtrl.create({
      title:'Upload Todo image',
      buttons:[
        {
          text: 'Take Photo',
          icon: 'camera',
          handler:()=>{
            let resp = actionsheet.dismiss();
            resp.then(()=>{
              this.takePhoto();
            })
          }
        },{
          text: 'Take Library',
          icon: 'images',
          handler: ()=>{
            let resp = actionsheet.dismiss();
            resp.then(()=>{
              this.takeLibrary();
            })
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler:()=>{
            console.log('cancel clicked');
          }
        }
      ]
    });
    actionsheet.present();
  }
}
