function KeyBoard(option) {
  this.option = {
    eleId: option.eleId,
    textEleId: option.textEleId,
    type: option.type,
    maxNum: option.maxNum || 100000000,
  }
  this.init();
}
KeyBoard.prototype = {
  init: function() {
    this.creatKeyBoard();
    this.KeyBoardStyle();
    this.clickNum();
    this.clickDel();
    this.clickClear();
    this.keyBoardShow();
    this.keyBoardHide();
  },
  //生成键盘
  creatKeyBoard: function() {
    this.ele = document.getElementById(this.option.eleId);
    this.textEle = document.getElementById(this.option.textEleId);
    this.ele.innerHTML = "<div class='colseKeyBoard'><div class='closeBtn'>完成</div></div><ul><li><div>7</div><div>8</div><div>9</div><p class='clear'>c</p></li><li><div>4</div><div>5</div><div>6</div><p class='del'>x</p></li><li><div>1</div><div>2</div><div>3</div><div>0</div></li></ul>"
    this.colseBtn = this.ele.getElementsByClassName("closeBtn")[0];
    this.numEleList = this.ele.getElementsByTagName("ul")[0].getElementsByTagName("div");
    this.pEleList=this.ele.getElementsByTagName("ul")[0].getElementsByTagName("p")
  },
  //键盘样式
  KeyBoardStyle: function() {
    this.ele.style.cssText = 'width: 100%;height: auto;overflow: hidden;position: fixed;left: 0;bottom: 0;text-align: center;background: #d9dce0;display: none;';
    this.ele.getElementsByClassName("colseKeyBoard")[0].style.cssText = 'width: 100%;height: 36px;background: #ececec;overflow: hidden;';
    this.colseBtn.style.cssText = 'width: 60px;height: 28px;float: right;color: #007AFF;margin: 4px 10px;line-height: 28px;font-size: 20px;';
    this.ele.getElementsByTagName("ul")[0].style.cssText = 'width: 100%;height: 166px;line-height: 40px;font-size: 24px;color: #888;padding: 8px 0;';
    var liEle = this.ele.getElementsByTagName("li");
    for(let i = 0; i < liEle.length; i++) {
      liEle[i].style.cssText = 'width: 100%;height: 50px;padding: 5px 10px;'
    }
    for(let j= 0; j < this.numEleList.length; j++){
    	this.numEleList[j].style.cssText = 'float: left;width: 20%;height: 40px;margin: 0 2.5%;background: #fff;border-radius: 8px;'
    }
    for(let k= 0; k < this.pEleList.length; k++){
    	this.pEleList[k].style.cssText = 'float: left;width: 20%;height: 40px;margin: 0 2.5%;background: #fff;border-radius: 8px;'
    }
  },
  //键盘显示
  keyBoardShow: function() {
    var keyBoardEle = this.ele;
    var AllKeyBoard = document.getElementsByClassName("keyBoard");
    this.textEle.onclick = function() {
      for(let i = 0; i < AllKeyBoard.length; i++) {
        AllKeyBoard[i].style.display = "none"
      }
      keyBoardEle.style.display = "block"
    }
  },
  //点击数字
  clickNum: function() {
    var numEleList = this.numEleList;
    var textNum = this.textEle;
    var maxNum = this.option.maxNum;
    for(var i = 0; i < numEleList.length; i++) {
      numEleList[i].onclick = function() {
        if(textNum.innerText.length == 0 && this.innerText == "0") {
          textNum.innerText = ""
        } else {
          if(parseInt(textNum.innerText + this.innerText) > maxNum) {
            textNum.innerText = maxNum
          } else {
            textNum.innerText = textNum.innerText + this.innerText
          }
        }
      }
    }
  },
  //点击删除
  clickDel: function() {
    var delEle = this.ele.getElementsByClassName("del")[0];
    var textNum = this.textEle;
    delEle.onclick = function() {
      textNum.innerText = textNum.innerText.substring(0, textNum.innerText.length - 1);
    }
  },
  //点击清除
  clickClear: function() {
    var delEle = this.ele.getElementsByClassName("clear")[0];
    var textNum = this.textEle;
    delEle.onclick = function() {
      textNum.innerText = "";
    }
  },
  //键盘消失
  keyBoardHide: function() {
    var keyBoardEle = this.ele;
    this.colseBtn.onclick = function() {
      keyBoardEle.style.display = "none"
    }
  },
}