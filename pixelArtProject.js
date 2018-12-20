$(function () {
    var clickLeft=false,clickRight=false, tableCreated=false,row=0,col=0,pixelColored=0;
    var clr = $('#color').val();
    var prevColor;
/*********************************************************************************************/
    // function speak(message) {
    //     var msg = new SpeechSynthesisUtterance(message);
    //     var voices = window.speechSynthesis.getVoices();
    //     var voi = 1;
    //     msg.voice = voices[voi]; // Note: some voices don't support altering params
    //     msg.voiceURI = 'native';
    //     msg.volume = 1; // 0 to 1
    //     msg.rate = 1; // 0.1 to 10
    //     msg.pitch = 2; //0 to 2
    //     speechSynthesis.speak(msg);
    // }    
/*********************************************************************************************/
    function showLeftMenu() {
        $('#menu-left').css("left", "0%");
        $('#slide-left').css("transform", "translateX(124px)");
        $('#slide-img-left').css("transform", "translateX(118px) rotate(180deg)");
        $('#layer').css({
            "opacity": "0",
            "visibility": "visible"
        });
        $('.anim').css("animation-play-state", "paused");
        clickLeft = true;
    }
    function hideLeftMenu() {
        $('#menu-left').css("left", "-125.438px");
        $('#slide-left').css("transform", "translateX(0)");
        $('#slide-img-left').css("transform", "translateX(0) rotate(0)");
        if (clickRight === false) {
            $('.anim').css("animation-play-state", "running");
            $('#layer').css({
                "opacity": "0",
                "visibility": "hidden"
            });
        }
        clickLeft = false;
    }
    function showRightMenu() {
        $('#menu-right').css("right", "0%");
        $('#slide-right').css("transform", "translateX(-90px)");
        $('#slide-img-right').css("transform", "translateX(-84px) rotate(360deg)");
        $('#layer').css({
            "opacity": "0",
            "visibility": "visible"
        });
        $('.anim').css("animation-play-state", "paused");
        clickRight = true;        
    }
    function hideRightMenu() {
        $('#menu-right').css("right", "-86.163px");
        $('#slide-right').css("transform", "translateX(0)");
        $('#slide-img-right').css("transform", "translateX(0) rotate(180deg)");
        if (clickLeft === false) {
            $('.anim').css("animation-play-state", "running");
            $('#layer').css({
                "opacity": "0",
                "visibility": "hidden"
            });
        }
        clickRight = false;    
    }
    function showVinci() {
        $('#pop-up').css({
            "transform": "translate(0px,0px) scale(1,1) ",
            "opacity": "1"
        })
        $('#daVinci').css("transform","scale(1.3,1.3)");
    }
    function hideVinci() {
        $('#pop-up').css({
            "transform": "translate(80px,60px) scale(0,0) ",
            "opacity": "0"
        })
        $('#daVinci').css("transform", "scale(1,1)");
    }
    function vinciSays(wiseWords) {
        $('#pop-text').html(wiseWords);
        // speak(wiseWords);
    }
    function createTable(row,col) {
        $('#canvas').html("");
        for (var r = 0; r < row; r++) {
            $('#canvas').append("<tr id=" + r + "></tr>")
            for (var c = 0; c < col; c++) {
                $('#' + r).append("<td> </td>");
            }
        }
        // $('.main').toggleClass("show");
        $('table').css({
            "transform": "translateY(0px)",
            "opacity": "1"
        }); 
        $('.anim-cont').css({
            "visibility": "hidden",
            "transform": "scale(0,0)"
        });
        tableCreated = true;
    }
    function confirmCreation(rows,columns) {
        if (tableCreated === true) {
            showVinci();
            vinciSays("Proceeding without sketching? Gonna lose the current progress. Proceed anyway? <button class='pop-buttons' id='daVinciYes'>Yes</button> <button class='pop-buttons' id='daVinciNo'>No</button> ")
            $('#daVinciYes').on("click", function () {
                createTable(rows,columns );
                hideVinci();
            })
            $('#daVinciNo').on("click", function () {
                hideVinci();
            })
        } else {
            createTable(rows,columns );
        }        
    }
    $('#daVinci').on("mouseenter",function () {
        $(this).css("transform","scale(1.3,1.3)");
    }).on("mouseleave",function () {
        $(this).css("transform","scale(1,1)");
    })
    //welcome message by the smart assistant
    setTimeout(function () {
        showVinci();
        vinciSays("Hello! I'm <span class='smart-assistant-fs font-effect-destruction'>da-Vinci</span>! Your smart assistant!");
        setTimeout(function () {
            vinciSays("I'll be helping you around here with the usual and non-usual stuff!!");
            setTimeout(function () {
                vinciSays("Reach out when you need any assistance! Just say <span class='smart-assistant-fs font-effect-destruction'><br>Hey da-Vinci!</span>");
                setTimeout(function () {
                    vinciSays("Just start by clicking the arrow on the left edge of the screen!");
                    setTimeout(function () {
                        vinciSays("Happy Sketching!");
                        setTimeout(function () {
                            hideVinci();
                            $(this).text("");
                        }, 2000)
                    }, 3500)
                }, 3500);
            }, 3500);
        }, 3500);
    }, 2000);
    //configuring the left side menu now
    $('#slide-left, #slide-img-left').on(
        "click",function () {
        if(clickLeft===false){
            showLeftMenu();
        }else{
            hideLeftMenu();
        }
    })
    $('#slide-right, #slide-img-right').on("click",function () {
        if(clickRight===false){
            showRightMenu();
        }else{
            hideRightMenu();
        }           
    })
    $('#new').on("click",function () {
        $('.main').toggleClass("show");
        hideLeftMenu();
    })
    $('#pot').on("click", function () {
        $('.main').toggleClass("show");        
        confirmCreation(50,50);
    })
    $('#lands').on("click", function () {
        $('.main').toggleClass("show");
        confirmCreation(50,120);
    })
    $('#cust').on("click",function () {
        $('#main-new,#main-cust').css("transform","translateX(-206px)");
    })
    var custRow=0,custCol=0;
    $('#height').on("change",function () {
        custRow=$(this).val();
    }).on("click",function () {
        $(this).attr("placeholder","");
    })
    $('#width').on("change",function () {
        custCol=$(this).val();
    }).on("click", function () {
        $(this).attr("placeholder", "");
    })
    $('#create').on("click",function () {
        if(custRow===0&&custCol===0){
            $('#width').val("").attr("placeholder","Can't be 0");
            $('#height').val("").attr("placeholder","Can't be 0");
        }else if(custRow <= 50 && custCol <= 120) {
            $('.main').toggleClass("show");
            confirmCreation(custRow,custCol);
            $('#main-new,#main-cust').css("transform", "translateX(0px)");
        }else if(custRow<=50&&custCol>120){
            $('#width').val("").attr("placeholder","Can't be >120");
        }else if(custRow>50&&custCol<=120){
            $('#height').val("").attr("placeholder","Can't be >50");
        }else{
            $('#width').val("").attr("placeholder","Can't be >120");
            $('#height').val("").attr("placeholder","Can't be >50");
        }
    })
    $('#color').on("change",function () {
        clr=$(this).val();
    })
    $('table').on("click","td",function () {
        $(this).css("background-color",clr);
        pixelColored++;
        if(pixelColored===20){
            showVinci();
            vinciSays("Sketching like a pro ha? <button class='pop-buttons' id='daVinciProd'>Produce</button>");
            $('#daVinciProd').on("click",function () {
                showLeftMenu();
                hideVinci();
            })
            setTimeout(function () {
                hideVinci();
            }, 4000);
        }
    })
    var anim = ["SMUDGE", "BRUSH", "SHARPEN", "HEALING", "BLUR", "BURN", "GRADIENT", "CURVES", "ROTATE", "STROKE", "CHANNELS", "ART","TONE","TRIM"];
    var intid=setInterval(function () {
        var i1=Math.floor(Math.random()*14);
        var i2=Math.floor(Math.random()*14);
        var i3=Math.floor(Math.random()*14);
        var i4=Math.floor(Math.random()*14);
        var i5=Math.floor(Math.random()*14);
        if(i1!==i2&&i2!==i3&&i3!==i4&&i4!==i5){
            $('#I1').text(anim[i1]);
            $('#I2').text(anim[i2]);
            $('#I3').text(anim[i3]);
            $('#I4').text(anim[i4]);
            $('#I5').text(anim[i5]);
        }
    },2500);
    $('#prod').on("click",function () {
        $('td').css({
            "border":"none",
            "cursor":"default"
        });
        $('table').off("click");
        hideLeftMenu();
        if(tableCreated===true){
            setTimeout(function () {
                showVinci();
                vinciSays("Damn! That piece is lit! Wanna <button class='pop-buttons' id='daVinciDwnld'>Download</button>");
                $('#daVinciDwnld').on("click", function () {
                    showLeftMenu();
                    hideVinci();
                })
            }, 2000)
            setTimeout(function() {
                hideVinci();
            }, 4000);;
        }else{
            showVinci();
            vinciSays("Nothing To Produce Here!");
            setTimeout(function () {
                hideVinci();
            }, 2000);
        }
    })
    $('#download').on("click",function () {
        hideLeftMenu();
        html2canvas($('#canvas')[0],{
            allowTaint:true
        }).then(function (canvas) {
            var getCanvas=canvas;
            var imgageData = getCanvas.toDataURL("image/png");
            var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");

            $(this).attr("download", "your_pic_name.png").attr("href", newData);
            $(canvas).css("transform","scale(1.1,1.1)");
            $('#snapshot').append(canvas).css({
                "visibility":"visible",
                "opacity":"1"
            });
        })
        $('#canvas').css("visibility","hidden");
    })
    //configuring the right side menu now
    var eraseClick=false;
    $('#erase').on("click",function () {
        prevColor=clr;
        if(eraseClick===false){
            hideRightMenu();
            clr="white";
            eraseClick=true;
        }else{
            hideRightMenu();
            clr=prevColor;
            eraseClick=false;

        }
    })
    //configuring the smart assistant using the GOOGLE web speech recognition API nad speech synthesis API
    //speech recognition

})