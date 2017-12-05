// var iconImg = ["../img/index/home.png", "../img/index/data.png", "../img/index/config.png", "../img/index/terminal.png"];
// var iconText = ["首页", "数据", "配置", "终端"];

// function cretaBox(classBox, iconImg, iconText) {
//     console.log(iconImg);
//     var headerHtml = '';
//     for (var i = 0; i < iconImg.lenght; i++) {
//         headerHtml += `
//         <div class="box">
//         <div class= "box_icon"><img src =""></div>
//              <div class="box_text">
//                 <span>${iconText[i]}</span>
//              </div>
//         </div>
//         `;
//         // var box = document.createElement("div");
//         // classBox.appendChild(box);
//         // var boxIcon = document.createElement("div");
//         // var boxText = document.createElement("div");
//         // box.appendChild(boxIcon);
//         // box.appendChild(boxText);
//         // box.className = "box";
//         // boxIcon.className = "box_icon";

//         // boxIcon.style.background = iconImg[i];
//         // boxText.innerText = iconText[i];
//         // boxText.innerHTML = "sss";
//         console.log(headerHtml);
//         classBox.appendChild(headerHtml);

//     }
// }
// var header_content = document.querySelector(".header_content");
// console.log(header_content);
// cretaBox(header_content, iconImg, iconText);