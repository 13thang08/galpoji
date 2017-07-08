function getTeenCode(text) {
  return getTeenCodeStyle2(getTeenCodeStyle1(text));
}

function getTeenCodeStyle1(text){
  text = text.toLowerCase();
  textArr = text.split(' ');
  for(i in textArr){
    var word = textArr[i];
    var isMatch = null;
    
    word = word.replace(/b/g, '|3');
    word = word.replace(/đ/g, '+)');
    word = word.replace(/d/g, '])');
    word = word.replace(/l/g, '|_');
    word = word.replace(/á|ắ|ấ/g, '4\'');
    word = word.replace(/à|ằ|ầ/g, '4`');
    word = word.replace(/a|ă|â/g, '4');
    word = word.replace(/ả|ẳ|ẩ/g, '4');
    word = word.replace(/ạ|ặ|ậ/g, '4');
    word = word.replace(/ã|ẵ|ẫ/g, '4');
    word = word.replace(/é|ế/g, '3\'');
    word = word.replace(/ẻ|ể/g, '3?');
    word = word.replace(/è|ề/g, '3`');
    word = word.replace(/e|ê/g, '3');
    word = word.replace(/ẽ|ễ/g, '3');
    word = word.replace(/i/g, 'j');
    word = word.replace(/ì/g, 'j`');
    word = word.replace(/í/g, 'j\'');
    word = word.replace(/ỉ/g, 'j');
    word = word.replace(/ĩ/g, 'j');
    word = word.replace(/ỏ|ổ|ở/g, '0');
    word = word.replace(/o|ô|ơ/g, '0');
    word = word.replace(/ò|ồ|ờ/g, '0`');
    word = word.replace(/ó|ố|ớ/g, '0\'');
    word = word.replace(/õ|ỗ|ỡ/g, '0');
    word = word.replace(/ọ|ộ|ợ/g, '0.');
    word = word.replace(/ú|ứ/g, 'u\'');
    word = word.replace(/ù|ừ/g, 'u`');
    word = word.replace(/ủ|ử/g, 'u');
    word = word.replace(/ũ|ữ/g, 'u');
    word = word.replace(/ụ|ự/g, 'u.');
    word = word.replace(/u|ư/g, 'u');
    word = word.replace(/y/g, 'ij');

    textArr[i] = word;

  }
  return textArr.join(' ').toLowerCase();
}

function getTeenCodeStyle2(text){
  text = text.toLowerCase();
  textArr = text.split(' ');
  for(i in textArr){
    var word = textArr[i];
    word = word.split('');
    var rand = Math.floor((Math.random() * 10) + 1);
    if(rand<=5){
      j = 0;
    }else{
      j = 1;
    }
    for(j;j<word.length;j+=2){
      word[j] = word[j].toUpperCase();
    }
    textArr[i] = word.join('');

  }
  return textArr.join(' ');
}

module.exports = {
  getTeenCode : getTeenCode
}