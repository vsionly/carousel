(function () {
    window.onload = function () {
        var banner = document.querySelector("#banner-wrap");
        var list = document.querySelector("#banner-list");
        var rootWidth = -document.documentElement.clientWidth;
        var startX = 0;//开始滑动的起始坐标x
        var startY = 0;//开始滑动的起始坐标y
        var index = 0;
        var translateX = 0;
        var tid = null;
        var lis = null;
        var points = null;
        var initWidth = 0;
        init();
        // autoPlay();

        //手指按下
        banner.addEventListener('touchstart', function (ev) {
            //禁止浏览器默认滑动事件
            ev.preventDefault();
            console.log(6)
            startX = ev.changedTouches[0].clientX;
            startY = ev.changedTouches[0].clientY;

            //关闭过渡效果
            list.style.transition = "0s";
            //关闭自动轮播
            clearInterval(tid);

            //无缝滑屏 改变index
            console.log(list.style.transform,'样式');
            changeIndex();
        });

        //手指滑动
        banner.addEventListener('touchmove', function (ev) {
            //滑动差值
            var dis = ev.changedTouches[0].clientX - startX;
            startX = ev.changedTouches[0].clientX;
            var disY = ev.changedTouches[0].clientY - startY;
            startY = ev.changedTouches[0].clientY;

            if(Math.abs(dis)>Math.abs(disY)){
                console.log('左右');
                // ev.preventDefault();
                //当前list总平移长度
                // alert(33)
                translateX = rootWidth * index + dis + initWidth;
                initWidth += dis;
                list.style.transform = "translateX(" + translateX + "px)";
                console.log(startX,'startX',ev.changedTouches[0].clientX,dis,startY,ev.changedTouches[0].clientY,disY  );
                //响应list滑动平移
                //changePage(0, translateX);
            }else{
                console.log('上下');
            }

        });

        //手指抬起
        banner.addEventListener('touchend', function () {
            //根据滑动长度求索引
            index = Math.round(translateX / rootWidth);
            console.log(index ,translateX);
            initWidth = 0;
            //越界判断
            if (index < 0) {
                index = 0;

            } else if (index > lis.length - 1) {
                index = lis.length - 1;
            }
            console.log( index,list.style.transform,'结束',rootWidth * index);
            changePage(.3, rootWidth * index);
            changePoint();
            changeIndex();

            //autoPlay();
        });

        //自动轮播
        function autoPlay() {

            tid = setInterval(function () {
                changeIndex();
                changePage(0, rootWidth * index);

                //延时执行，为了让页面切换完毕
                setTimeout(function () {
                    index++;
                    changePage(0.3, rootWidth * index);
                    changePoint();
                }, 500);

            }, 3000);
        }

        //更改索引 实现无缝滑屏
        function changeIndex() {

            if (index == 0) {
                //当显示第一张图片 切换到下一组的第一张
                index = points.length;
            } else if (index == lis.length - 1) {
                //当显示最后一张 切换到上一组的最后一张
                index = points.length - 1;
            }

        }

        //设置小圆点
        function changePoint() {
            for (var i = 0; i < points.length; i++) {
                points[i].classList.remove('active');
            }
            points[index % (points.length)].classList.add('active');
        }

        //滑动页面 平移list
        function changePage(duration, translateVal) {
            list.style.transition = duration + "s";
            list.style.transform = "translateX(" + translateVal + "px)";
        }

        //初始化list和point
        function init() {

            //添加一组
            list.innerHTML += list.innerHTML;

            //设置list宽度
            lis = document.querySelectorAll("#banner-list li");

            list.style.width = lis.length + "00%";

            //设置li宽度
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.width = 100 / lis.length + "%";
            }

            //创建point div
            var pointDiv = document.createElement("div");
            pointDiv.setAttribute("id", "point");
            for (var i = 0; i < lis.length / 2; i++) {
                var span = document.createElement("span");
                if (i == 0) {
                    span.classList.add('active');
                }
                pointDiv.appendChild(span);
            }

            banner.appendChild(pointDiv);
            points = document.querySelectorAll("#point span");
        }
    };
})();