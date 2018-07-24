var Modal = function(option) {
  this.option = {
    eleId: option.eleId,
    title: option.title,
    content: option.content,
    callback: option.success,
  };
  this.ele = document.getElementById(this.option.eleId);
  this.ele.innerHTML = "<div class='tltle'><span>提示</span></div><div class='content'><span>内容为空</span></div><div class='bottom'><div class='cancel'>取消</div><div class='confirm'>确定</div></div>"
  this.title = this.ele.getElementsByTagName("div")[0];
  this.content = this.ele.getElementsByClassName("content")[0];
  this.bottom = this.ele.getElementsByClassName("bottom")[0];
  this.cancel = this.ele.getElementsByClassName("cancel")[0];
  this.confirm = this.ele.getElementsByClassName("confirm")[0];
  this.ele.style.cssText = 'position: fixed;width: 60%;height: auto;left: 50%;top: 30%;margin-left: -30%;background: #fff;border-radius: 10px;overflow: hidden;border: 2px solid #eee;'
  this.title.style.cssText = 'width: 100%;height: 40px;line-height: 40px;color: #333;font-size: 24px;text-align: center;'
  this.content.style.cssText = 'width: 100%;height: auto;padding: 10px;line-height: 24px;font-size: 18px;color: #666;background: #fff;'
  this.bottom.style.cssText = 'width: 100%;height: 36px;border-top: 1px solid #eee;line-height: 34px;font-size: 16px;text-align:center;'
  this.cancel.style.cssText = 'float: left;width: 50%;height: 36px;color: #333;box-sizing: border-box;border-right:1px solid #eee;'
  this.confirm.style.cssText = 'float: left;width: 50%;height: 36px;color: #008000;'
  this.title.innerHTML = this.option.title || "";
  this.content.innerHTML = this.option.content || "";
  var callBack = this.option.callback;
  var thatEle = this.ele;
  var thatShadow = this.shadow;
  this.cancel.onclick = function() {
    thatEle.style.display = "none"
    thatShadow.style.display = 'none'
  };
  this.confirm.onclick = function(){
  	callBack();
    thatEle.style.display = "none";
    thatShadow.style.display = 'none';
  };
  
}