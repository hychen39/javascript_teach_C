
/**
 * 如果類別裡根本沒有 get vin() 也沒有 set vin()，只有私有欄位 #vin，那麼外部寫 myFiat.vin = '...' 就真的會額外新增一個 public field vin，而且它和 #vin 是完全不同的兩件事。
 */

class Fiat500 {
    #vin;
  constructor(vin) {
    this.#vin = vin;
  }
}

const myFiat = new Fiat500('123456789');

// 沒有 getter 和 setter 的話，外部寫 myFiat.vin = '...' 就會自動新增一個 public field vin
myFiat.vin = '987654321';

// 沒有公開的 vin 欄位，JS 會自動幫我們新增一個 public field vin，和私有欄位 #vin 是完全不同的兩件事。
console.log(myFiat.vin); // 987654321; 

/**
 * 只有 getter 沒有 setter 的話，外部寫 myFiat.vin = '...' 就會觸犯 getter 的 read-only 屬性，會丟出 TypeError。
 */

class Fiat500R {
    #vin;
  constructor(vin) {
    this.#vin = vin;
  }

  get vin() {
    return this.#vin;
  }
}

const myFiatR = new Fiat500R('123456789');
console.log(myFiatR.vin); // 123456789; 使用 getter 讀取私有欄位 #vin 的值

// 因為有 getter, 所以外部寫 myFiatR.vin = '...' 就會自動呼叫 setter，但因為沒有 setter，所以會觸犯 getter 的 read-only 屬性，會丟出 TypeError。
myFiatR.vin = '987654321'; // TypeError: Cannot set property vin of #<Fiat500R> which has only a getter