
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit, OnDestroy {

  stanzas = [];
  stanz = '';
  count: number;
  countListenerSub: Subscription;
  initCountSub: Subscription;
  isLoading = false;

  optionList =  ['Entrance', 'Kyrie', `Gloria`, `Responsorial`, 'Gospel Procession', 'Allelluia', `Creed`,
  'Offertory', 'Offertory Procession', 'Sanctus', 'Mystery of Faith', 'Amen' , 'Peace',
 `Sign of Peace`, `Agnus Dei`, ` Communion`, `Exit`, `Holy Week`, `Lent`, `Easter`, `Ascension`,
 `Pentecost`, `Advent`, `Christmas`, `Marian`, `Holy Trinity`, `Christ the King`, ` Baptism`, `Saints`,
 `Forgiveness`, `Marriage`, `Discipleship`, `Sacred Heart`, `Funerals`, `General`, `Addendum`, `Prayers`, `Other`, ];

  constructor( public auth: AuthService) {

   }

  ngOnInit() {
    this.stanzas = [''];
    this.stanz = '';
    this.isLoading = true;
    this.auth.getCounter();
    this.initCountSub = this.auth.initCountListener.asObservable().subscribe((res: number) => { this.count = res; });
    this.countListenerSub = this.auth.getCounterListener()
    .subscribe(res => {
      this.isLoading = false;
      this.count += res;
      console.log(res);
    });
    this.count = this.auth.hymnCount;
    console.log(this.count);
  }

  ngOnDestroy() {
    this.countListenerSub.unsubscribe();
  }

  addStanza() {
    this.stanzas.push('');
  }

  onCreateSong(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        title: 'Sorry!',
        text: 'The hymn is invalid. i.e missing fields',
        icon: 'error',
        confirmButtonText: 'ok'
      });
      return;
    }
    const hymn = {
          title :  form.value.title,
          category: form.value.category,
          chorus : form.value.chorus,
          stanzas: this.stanzas,
          creator: '5e734448f604066e5e55ac6f',
    };

    this.auth.addHymn(hymn);

  }

}
