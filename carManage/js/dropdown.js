    $(document).ready(function() {
        // var 
        // var btnDrop = document.getElementsByClassName("btndrop");
        // var dropDown = document.getElementsByClassName("dropdown");
        // console.log(btnDrop);
        // console.log(dropDown);
        // 循环遍历每一个btndrop标签让相应的 dropdown出现和隐藏
        $(".btndrop").each(function() {}).on("click", function() {
            console.log(this.parentNode.children[1])
            var $dropdown = $(this.parentNode.children[1]);
            $dropdown.slideToggle();
        });
        $(".ul_box li").click(function() {
            $(this).addClass("menu_active").siblings().removeClass("menu_active");
        })
        $(".dropdown p").click(function() {
            $(this).addClass("drop_active").siblings().removeClass("drop_active");
            // $(this).parent().parent().removeClass("drop_active");
            console.log($(this).parent().parent().siblings().children(".dropdown").children("p").removeClass("drop_active"));
        })

    });