import { Component } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-zipcode-test',
  templateUrl: './zipcode-test.component.html',
  styleUrls: ['./zipcode-test.component.scss']
})

export class ZipcodeTestComponent {

  data = {
    zip: '783-0060',
    address1: '',
    address2: '',
    address3: '',
  };

  constructor(private jsonp: Jsonp) { }

  zipInputed(key, zipcode) {
    const params = new URLSearchParams();
    params.set('zipcode', zipcode);
    params.set('callback', 'JSONP_CALLBACK'); // JSONP_CALLBACKは固定
    console.log(zipcode);

    const tabKey = 9;
    const enterKey = 13;

    if (key !== enterKey && key !== tabKey) {
      return;
    }

    this.jsonp.get('http://zipcloud.ibsnet.co.jp/api/search', { search: params })
      .subscribe(
      response => {

        const jsonData = response.json() || {};
        const isZipcodeNotFound = jsonData.results === null;

        if (isZipcodeNotFound) {
          console.log('郵便番号が見つかりません');
          return;
        }

        this.data.address1 = jsonData.results[0].address1;
        this.data.address2 = jsonData.results[0].address2;
        this.data.address3 = jsonData.results[0].address3;
      },
      error => {
        console.log('アクセス失敗！ なんてこった！');
      });
  }
}
