  // 进度条绘制
  $.ajax({
      url: "../json//datatable.json",
      type: "get",
      success: function(res) {
          console.log(res);
          var htmlpro = '';
          for (var i = 0; i < res.length; i++) {
              if (res[i].id > 10) {
                  htmlpro += `
                               <div class="progress_box progress_box${i}">
                               <div class="progress_menu clearfix">
                                    <span class="big_btn">放大</span>
                                    <span class="little_btn">缩小</span>
                                    <span class="remove_btn glyphicon glyphicon-remove"></span>
                                </div>
                                <div class="progress_con">
                                <div class="progress_top pro_com">
                                    <span>${res[i].id}</span>
                                    <span>${res[i].price}</span>
                                </div>
                                <div class="progress progress-striped active">
                                    <div id="prog" class="progress-bar" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width:${res[i].id }%;">
                                        <span id="proglabel">正在启动，请稍后......</span>
                                    </div>
                                </div>
                                <div class="progress_bottom pro_com">
                                    <span>${res[i].id}</span>
                                    <span>${res[i].id}</span>
                                </div>
                                </div>                                
                                </div>
                                    `;
              } else {
                  htmlpro += `
                                <div class="progress_box progress_box${i}">
                                <div class="progress_menu clearfix">
                                    <span class="big_btn">放大</span>
                                    <span class="little_btn">缩小</span>
                                    <span class="remove_btn glyphicon glyphicon-remove"></span>
                                </div>
                                <div class="progress_con">                                
                                <div class="progress_top pro_com">
                                    <span>DTC-CNT</span>
                                    <span>${res[i].price}</span>
                                </div>
                                <div class="progress progress-striped active">
                                    <div id="prog" class="progress-bar progress-bar-green" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width:${res[i].id }%;">
                                        <span id="proglabel">正在启动，请稍后......</span>
                                    </div>
                                </div>
                                <div class="progress_bottom pro_com">
                                    <span>${res[i].id}</span>
                                    <span>${res[i].id}</span>
                                </div>
                                </div>
                                </div>
                                    `;

              }
          }
          // console.log($(".progress-bar").prop("width"));
          // console.log(htmlpro);
          $(".tab-pane-bottom").html(htmlpro);
          var oDiv = document.getElementsByClassName("tab-pane-bottom")[0];
          var oP = document.getElementsByClassName("progress_box");
          var bigBtn = document.getElementsByClassName("big_btn");
          var littleBtn = document.getElementsByClassName("little_btn");
          var removeBtn = document.getElementsByClassName("remove_btn");
          var tabPanBottom = document.getElementsByClassName("tab-pane-bottom")[0];

          var jsonProgressArr = [];

          // console.log(sessionStorage.getItem("progress_boxs"));
          // console.log(JSON.parse(sessionStorage.getItem("progress_boxs")));
          var j = 0;
          for (var i = 0; i < oP.length; i++) {
              (
                  function(i) {
                      // 进度条点击事件
                      // 放大

                      bigBtn[i].onclick = function() {
                          j += 10;
                          if (j >= 80) {
                              j = 80;
                          }
                          console.log(this);
                          console.log(this.parentNode.parentNode);
                          var obj = this.parentNode.parentNode;
                          obj.style.width = 250 + j + "px";
                          obj.style.height = 2 + j + "px";
                          // removeByValue(jsonProgressArr, i);
                          // jsonProgressArr.splice(i - 1, i);
                          // this.
                      };
                      // 缩小
                      littleBtn[i].onclick = function() {
                          j -= 10;
                          if (j <= -10) {
                              j = -10;
                          }
                          console.log(this);
                          console.log(this.parentNode.parentNode);
                          var obj = this.parentNode.parentNode;
                          obj.style.width = 250 + j + "px";
                          obj.style.height = 2 + j + "px";
                          // removeByValue(jsonProgressArr, i);
                          // jsonProgressArr.splice(i - 1, i);
                          // this.
                      };
                      // 移除

                      removeBtn[i].onclick = function() {
                          console.log(this);
                          console.log(this.parentNode.parentNode);
                          this.parentNode.parentNode.style.display = "none";
                          // tabPanBottom.removeChild(this.parentNode.parentNode);

                          // removeByValue(jsonProgressArr, i);
                          // jsonProgressArr.splice(i - 1, i);
                          // this.
                      };
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
                          e = e || window.event;
                          console.log(i);
                          //增量，这个是当前鼠标的视口位置-p标签相对于父亲的位置
                          //所以减出来的结果，就是把oDiv的相对视口位置给的出来了
                          // console.log(oP[i]);
                          // console.log(oP[i].offsetLeft);
                          var disX = e.clientX - oP[i].offsetLeft;
                          var disY = e.clientY - oP[i].offsetTop;
                          console.log(disX);
                          oDiv.onmousemove = function(e) {
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
                          oDiv.onmouseup = function() {
                              oDiv.onmousemove = null;

                          }
                      }

                      // removeBtn[i].click(function() {
                      //     console.log(this);
                      // })

                  }
              )(i)
          }

          // 进度条拖拽

      }
  })