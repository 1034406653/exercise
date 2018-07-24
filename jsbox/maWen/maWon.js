'use strict';

var mText = {
    //获取类名
    getClass: function (elem) {
        return elem.getAttribute && elem.getAttribute('class') || '';
    },
    //判断类名，返回boolean
    hasClass: function (elem, cls) {
        var className = this.getClass(elem).split(' '), i = 0, len = className.length;
        for (; i < len; i++) {
            if (className[i] === cls) {
                return true;
            }
        }
        return false;
    },
    //移除指定类名
    removeClass: function (elem, cls) {
        var className = this.getClass(elem).split(' '),
            i = 0, len = className.length;
        elem.removeAttribute('class');
        while (i < len) {
            if (className[i] !== cls) {
                elem.setAttribute('class', className[i]);
            }
            i++;
        }
    },
    //添加指定类名
    addClass: function (elem, cls) {
        var className = this.getClass(elem).split(' ');
        className.push(cls);
        elem.removeAttribute('class');
        elem.setAttribute('class', className.join(' '));
    },
    //事件监听
    addEvent: function (ele, type, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
        } else {
            ele.attachEvent(on + 'type', fn);
        }
    },
    getEvent: function (e) {
        return e || window.e;
    },
    getTarget: function (e) {
        return e.target || e.srcElement;
    }
};

// ele:盒子dom  nowPage:当前页码  totalPage:总页数  callback:返回当前页码的回调函数
function MPaging(option) {
	 this.option = {
        ele: option.el,
        hoverBackground: option.hoverBackground || '#0073A9',
        curBackground: option.curBackground || '#2f51b2',
    };
}

MPaging.prototype.constructor = MPaging;
MPaging.prototype.init = function (option) {
	 this.option.nowPage = option.total || 0;
	 this.option.totalPage = option.total || 0; 
	 this.option.callback = option.callback;
	 this.option.jumpBlock= option.jump === 'block' || option.jump === 'inline-block' ? 'inline-block' : 'none';
	 this.staticHtml();
	 this.createHtml();
	 this.event();
	 this.opera();
};
//静态结构
MPaging.prototype.staticHtml = function () {
    var ele = this.option.ele,
        step = '';
    step += '<span id="mFirst">首页</span><span id="mPrev">上一页</span>' +
        '<div class="mPageBox"></div><span id="mNext">下一页</span>' +
        '<span id="mLast">尾页</span><input type="number" class="jumpPage"><span id="jumpPage">跳转</span>';
    ele.innerHTML = step;
    this.cssHtml();
};
//更新分页结构
MPaging.prototype.createHtml = function () {
    var option = this.option,
        box = this.box,
        nowPage = Number(option.nowPage),
        totalPage = option.totalPage,
        seat = {
            arr: [],
            start: nowPage - 2,
            end: nowPage + 2
        },
        step = '', i;
    step += '<span class="mStartPoint">...</span>';
    if (totalPage < 6) {
        for (i = 1; i <= totalPage; i++) {
            seat.arr.push(i);
        }
    } else {
        if (seat.start < 1) {
            seat.end = seat.end + (1 - seat.start);
            seat.start = 1;
        }
        if (seat.end > totalPage) {
            seat.start = seat.start - (seat.end - totalPage);
            seat.end = totalPage;
        }
        for (i = seat.start; i <= seat.end; i++) {
            seat.arr.push(i);
        }
    }
    for (i = 0; i < seat.arr.length; i++) {
        if (seat.arr[i] === nowPage) {
            step += '<span class="nowPage mPage">' + seat.arr[i] + '</span>';
        } else {
            step += '<span class="mPage">' + seat.arr[i] + '</span>';
        }
    }
    step += '<span class="mEndPoint">...</span>';
    box.innerHTML = step;
    this.pageHtml();
    this.hover();
    this.event();
    this.point();
};
//控制基本样式
MPaging.prototype.cssHtml = function () {
    var option = this.option,
        parent = option.ele,
        box = parent.getElementsByClassName("mPageBox")[0],
        ipt = parent.getElementsByClassName("jumpPage")[0];
    this.box = box;
    this.input = ipt;
    parent.style.cssText = "margin:0;padding:0;height:40px;line-height:40px;font-size:12px;" +
        "text-align:center;margin-top:10px;";
    box.style.display = "inline-block";
    var child = parent.getElementsByTagName("span"), i = 0, len = child.length;
    for (; i < len; i++) {
        child[i].style.cssText = "display:inline-block;height:24px;line-height:24px;" +
            "padding:0 8px;margin:0 2px;border:1px solid #0073A9;background-color:#fff;cursor:pointer;";
    }
    ipt.style.cssText = "width:50px;margin-left:20px;display:" + option.jumpBlock + ";";
    ipt.nextSibling.style.cssText = 'height:24px;line-height:24px;padding:0 8px;margin:0 2px;border:' +
        '1px solid #0073A9;background-color:#fff;cursor:pointer;display:' + option.jumpBlock + ';';
};
//页码样式控制
MPaging.prototype.pageHtml = function () {
    var page = this.box,
        span = page.childNodes,
        i = 0, len = span.length;
    for (; i < len; i++) {
        span[i].style.cssText = "display:inline-block;height:24px;line-height:24px;" +
            "padding:0 8px;margin:0 2px;border:1px solid #0073A9;background-color:#fff;cursor:pointer;";
        this.curPageCss();
    }
};
//控制当前页码样式
MPaging.prototype.curPageCss = function () {
    var option = this.option,
    now = option.ele.getElementsByClassName("nowPage")[0];
    now.style.backgroundColor = option.curBackground;
    now.style.color = "#fff";
};
//控制hover状态下样式
MPaging.prototype.hover = function () {
    var option = this.option,
        span = option.ele.getElementsByTagName("span"),
        i = 0, len = span.length;
    for (; i < len; i++) {
        span[i].onmouseover = function () {
            if (!mText.hasClass(this, "nowPage")) {
                this.style.backgroundColor = option.hoverBackground;
                this.style.color = "#fff";
            }
        };
        span[i].onmouseout = function () {
            if (!mText.hasClass(this, "nowPage")) {
                this.style.backgroundColor = "#fff";
                this.style.color = "#000";
            }
        }
    }
};
//当前页码事件监听
MPaging.prototype.event = function () {
    var curPage = this.option.ele.getElementsByClassName("mPage"),
        i = 0, len = curPage.length;
    var self = this;
    for (; i < len; i++) {
        curPage[i].index = i;
        curPage[i].onclick = function () {
            self.option.nowPage = this.innerHTML;
            self.option.callback(this.innerHTML);
            for (var j = 0; j < len; j++) {    //清空所有样式
                if (this.index !== j) {
                    mText.removeClass(curPage[j], 'nowPage');
                    curPage[j].style.backgroundColor = "#fff";
                    curPage[j].style.color = "#000";
                }
            }
            self.createHtml();
        }
    }

};
// 控制省略号显示与消失
MPaging.prototype.point = function () {
    var option = this.option,
        nowPage = option.nowPage,
        total = option.totalPage,
        elem = option.ele,
        sPoint = elem.getElementsByClassName("mStartPoint")[0],
        ePoint = elem.getElementsByClassName("mEndPoint")[0];
    sPoint.style.display = 'none';
    ePoint.style.display = 'none';
    if (total > 5) {
        if (nowPage > 3) {
            sPoint.style.display = 'inline-block';
        }
        if (nowPage < (total - 2)) {
            ePoint.style.display = 'inline-block';
        }
    }
};
//页面捕捉,如首页，上一页等事件
MPaging.prototype.opera = function () {
    var self = this;
    mText.addEvent(document, 'click', function (ev) {
        var e = mText.getEvent(ev),
            target = mText.getTarget(e),
            id = target.id,
            option = self.option,
            now = Number(option.nowPage),
            total = option.totalPage;
        switch (id) {
            case 'mFirst':
                option.nowPage = 1;
                break;
            case 'mPrev':
                option.nowPage = now <= 1 ? 1 : now - 1;
                break;
            case 'mNext':
                option.nowPage = now >= total ? total : now + 1;
                break;
            case 'mLast':
                option.nowPage = total;
                break;
            case 'jumpPage':
                var n = Math.round(self.input.value);
                option.nowPage = n > 0 && n <= total ? n : now;
                break;
            default:
                break;
        }
        if (Number(option.nowPage) !== now) {
            option.callback(option.nowPage);
            self.createHtml();
        }
    });
};


