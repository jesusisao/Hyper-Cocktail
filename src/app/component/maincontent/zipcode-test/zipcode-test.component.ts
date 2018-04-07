import { Component } from '@angular/core';
import { keymap } from '../../../class/keymap';
import { ZipcodeService } from '../../../service/zipcode.service';

@Component({
  selector: 'app-zipcode-test',
  templateUrl: './zipcode-test.component.html',
  styleUrls: ['./zipcode-test.component.scss']
})

export class ZipcodeTestComponent {

  data = {
    zip: '004-0021',
    address1: '',
    address2: '',
    address3: '',
  };

  constructor(private zipcodeservice: ZipcodeService) { }

  zipInputed(key, zipcode) {

    if (key !== keymap.enterKey && key !== keymap.tabKey) {
      return;
    }

    this.zipcodeservice.requestAddress(zipcode)
      .subscribe(
        data => {
          const isZipcodeNotFound: boolean = (data.results === null);
          if (isZipcodeNotFound) {
            console.log('郵便番号が見つかりません');
            return;
          }
          this.data.address1 = data.results[0].address1;
          this.data.address2 = data.results[0].address2;
          this.data.address3 = data.results[0].address3;
        },
      error => {
        console.log('アクセス失敗！');
      }
      );

  }

}
