import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Detail} from '../detail/detail';
import { Http } from '@angular/http/';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 list = [];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http) 
  }

ionViewDidEnter(){
  this.loadDB();
}

loadDB(){
  this.http.get("http://192.168.1.162/note/load.php")
  .subscribe(data =>{
    console.log(data);
    this.list = data.json();
  }, err =>{
    console.log(err);
  })
}

  addDB(obj){
    this.http.post("http://192.168.1.162/note/store.php",obj)
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp == "success"){
        console.log("it works!");
        this.loadDB();
      }else{
        console.log("it fails!");
      }
    }, err=>{
      console.log(err);
    })
  }

  addTodo(){
    let prompt = this.alertCtrl.create({
    title:'Add TODO',
    message: "Enter a title for your todo list!",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
      },{
      name: 'description',
      placeholder:'Description'
    }
    ],
    buttons:[
      {
        text: 'Cancel',
        handler:data=>{
          console.log("cancel clicked");
        }
      },
      {
        text: 'Add',
        handler:data=>{
          //this.list.push(data);
          this.addDB(data);
        }
      }
    ]
   });
   prompt.present();
  }



  goNextPage(todo) {
    this.navCtrl.push(Detail,{
      todo: todo
    })
  }

  remove(id) {
  //  var i;
  //  for(i = 0; i < this.list.length; i++) {

//      if(this.list[i] == todo) {
//        this.list.splice(i, 1);
  this.http.post("http://192.168.1.162/note/delete.php",{id:id}).
  subscribe(data =>{
  var resp = data.text().trim();
  if(resp == "success"){
    this.loadDB();
  }else{
  //  console.log("delete failed");
  }
  }, err =>{
    console.log(err);
  })
 //     }
  //  }
  }

 }
