  function changeZindex(obj, name) {
      var divs = document.getElementsByClassName(name);
      var maxNum = 0;
      for (var i = 0; i < divs.length; i++) {
          var tempNum = divs[i].style.zIndex;
          tempNum = (tempNum) ? parseInt(tempNum) : 0;
          if (tempNum > maxNum) maxNum = tempNum;
      }
      obj.style.zIndex = maxNum + 1;
  }
  // 进度条绘制
  $.ajax({
      url: "../json/datatable.json",
      type: "get",
      success: function(res) {
          console.log(res);
          var htmlpro = '';
          for (var i = 0; i < res.length; i++) {
              if (res[i].id > 15) {
                  htmlpro += '<div class="progress_box progress_box' + i + ' clear_float">' +
                      '<div class="progress_con"><div class = "progress_top pro_com"><span> DTC - CNT </span> <span > ' + res[i].price +
                      ' </span >' +
                      '</div> <div class = "progress progress-striped active" >' +
                      '<div id = "prog" class = "progress-bar" role = "progressbar"  aria-valuemin = "0" aria - valuemax = "100" style = "width:' + res[i].id + '%;" >' +
                      '<span id="proglabel">' + res[i].id + '%</span> </div> </div> <div class = "progress_bottom pro_com">' +
                      '<span> 0 </span> <span> 100 </span> </div> </div></div>';
              } else {
                  htmlpro += '<div class="progress_box progress_box' + i + ' clear_float">' +
                      '<div class="progress_con"><div class = "progress_top pro_com"><span> DTC - CNT </span> <span > ' + res[i].price +
                      ' </span >' +
                      '</div> <div class = "progress progress-striped active" >' +
                      '<div id = "prog" class = "progress-bar progress-bar-green" role = "progressbar"  aria-valuemin = "0" aria - valuemax = "100" style = "width:' + res[i].id + '%;" >' +
                      '<span id="proglabel">' + res[i].id + '%</span> </div> </div> <div class = "progress_bottom pro_com">' +
                      '<span> 0 </span> <span> 100 </span> </div> </div></div>';
              }
          }
          // console.log(htmlpro);
          $(".content_center").html(htmlpro);
          var oDiv = document.getElementsByClassName("content_center")[0];
          var oP = document.getElementsByClassName("progress_box");
          var bigBtn = document.getElementsByClassName("big_btn");
          var littleBtn = document.getElementsByClassName("little_btn");
          var removeBtn = document.getElementsByClassName("remove_btn");
          var tabPanBottom = document.getElementsByClassName("content_center")[0];

          var jsonProgressArr = [];

          // console.log(sessionStorage.getItem("progress_boxs"));
          // console.log(JSON.parse(sessionStorage.getItem("progress_boxs")));
          var j = 0;
          for (var i = 0; i < oP.length; i++) {
              (
                  function(i) {
                      // 进度条点击事件
                      // 放大

                      //   bigBtn[i].onclick = function() {
                      //       j += 10;
                      //       if (j >= 120) {
                      //           j = 120;
                      //       }
                      //       console.log(this);
                      //       console.log(this.parentNode.parentNode);
                      //       var obj = this.parentNode.parentNode;
                      //       obj.style.width = 250 + j + "px";
                      //       obj.style.height = 25 + j + "px";
                      //       // removeByValue(jsonProgressArr, i);
                      //       // jsonProgressArr.splice(i - 1, i);
                      //       // this.
                      //   };
                      //   // 缩小
                      //   littleBtn[i].onclick = function() {
                      //       j -= 10;
                      //       if (j <= -10) {
                      //           j = -10;
                      //       }
                      //       console.log(this);
                      //       console.log(this.parentNode.parentNode);
                      //       var obj = this.parentNode.parentNode;
                      //       obj.style.width = 250 + j + "px";
                      //       obj.style.height = 25 + j + "px";
                      //       // removeByValue(jsonProgressArr, i);
                      //       // jsonProgressArr.splice(i - 1, i);
                      //       // this.
                      //   };
                      //   // 移除

                      //   removeBtn[i].onclick = function() {
                      //       console.log(this);
                      //       console.log(this.parentNode.parentNode);
                      //       this.parentNode.parentNode.style.display = "none";
                      //       // tabPanBottom.removeChild(this.parentNode.parentNode);

                      //       // removeByValue(jsonProgressArr, i);
                      //       // jsonProgressArr.splice(i - 1, i);
                      //       // this.
                      //   };
                      // 初始化进度条的位置
                      // 相对值从数据库请求或者存储在浏览器端，如果有值则用这个设置的值，如果没有则初始化排版
                      // oP[i].style.
                      var jsonop = JSON.parse(sessionStorage.getItem("progress_boxs"));
                      // console.log(jsonop[i].JSON.parse);
                      var jsonProgressorigin = {
                          "className": "progress_box" + i,
                          "x": 0,
                          "y": 0
                      };
                      // console.log(jsonProgressArr[i]);
                      // console.log(jsonop);
                      // console.log(oP[i].className.split(" ")[1]);
                      var oleft;
                      var otop;
                      oleft = (i % 3) * 410;
                      otop = (i / 3) * 69;

                      if (i % 3 == 1) {
                          oleft = (i % 3) * 410;
                          otop = (i / 3) * 69 - 23;
                      }
                      if (i % 3 == 2) {
                          oleft = (i % 3) * 410;
                          otop = (i / 3) * 69 - 45;
                      }
                      console.log(oleft, otop);
                      oP[i].style.left = oleft + "px";
                      oP[i].style.top = otop + "px";
                      if (jsonop) {
                          if (jsonop[i].className == oP[i].className.split(" ")[1]) {
                              oP[i].style.left = jsonop[i].x + "px";
                              oP[i].style.top = jsonop[i].y + "px";
                              jsonProgressorigin = {
                                  "className": "progress_box" + i,
                                  "x": jsonop[i].x,
                                  "y": jsonop[i].y
                              };
                          }
                      }
                      jsonProgressArr[i] = jsonProgressorigin;
                      oP[i].onmousedown = function(e) {
                          changeZindex(this, "progress_box");
                          // $(this).css("zIndex", "9999").siblings().css("zIndex", "1000");
                          e = e || window.event;
                          //   console.log(i);
                          //增量，这个是当前鼠标的视口位置-p标签相对于父亲的位置
                          //所以减出来的结果，就是把oDiv的相对视口位置给的出来了
                          // console.log(oP[i]);
                          // console.log(oP[i].offsetLeft);
                          var disX = e.clientX - oP[i].offsetLeft;
                          var disY = e.clientY - oP[i].offsetTop;
                          console.log(disX);
                          oP[i].onmousemove = function(e) {
                              e = e || window.event;
                              var x = e.clientX - disX;
                              var y = e.clientY - disY;
                              console.log("x=" + x);

                              //在大盒子中拖拽，范围设置
                              if (x < 0) x = 0;
                              if (y < 0) y = 0;

                              if (x > oDiv.clientWidth - oP[i].clientWidth) {
                                  x = oDiv.clientWidth - oP[i].clientWidth;
                              }
                              if (y > oDiv.clientHeight - oP[i].clientHeight) {
                                  y = oDiv.clientHeight - oP[i].clientHeight;
                              }
                              oP[i].style.left = x + "px";
                              oP[i].style.top = y + "px";
                              // var jsonProgress = "jsonProgress" + i;
                              jsonProgressi = {
                                  "className": "progress_box" + i,
                                  "x": x,
                                  "y": y
                              };

                              jsonProgressArr[i] = jsonProgressi;
                              // jsonProgressArr.push(jsonProgress);
                              console.log(jsonProgressArr);
                              // window.sessionStorage.setItem("progress_boxs", JSON.stringify(jsonProgressi))
                              window.sessionStorage.setItem("progress_boxs", JSON.stringify(jsonProgressArr));
                          }
                          document.onmouseup = function() {
                              oP[i].onmousemove = null;
                              changeZindex(this, "progress_box");
                          }
                      }

                  }
              )(i)
          }
          // 进度条拖拽
      }
  })