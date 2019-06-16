$(function () {
    let poke=[];
    let colorArr=["s","h","d","c"];
    let flag={};
    let box=$(".main")
    for(let i=0;i<52;i++){
        let index=Math.floor(Math.random()*colorArr.length)
        let color=colorArr[index];
        let number=Math.round(Math.random()*12+1);

        while(flag[color+"_"+number]){
            index=Math.floor(Math.random()*colorArr.length)
             color=colorArr[index];
            number=Math.round(Math.random()*12+1);
        }
        poke.push({color,number});
        flag[color+"_"+number]=true;
    }
    /* 发牌
    * （i,j） left=350-50*i+100*j    top=100*j     */
    let index=-1;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            index++;
            let lefts=350-50*i+100*j , tops=50*i;
            $("<div>").css({backgroundImage:`url(./imgs/${poke[index].number}${poke[index].color}.jpg)`})
                    .addClass("poke")
                    .appendTo(".main")
                    .delay(index*100)
                    .attr("id",i+"_"+j)
                    .data("number",poke[index].number)
                    .animate({left:lefts,top:tops,opacity:1})
        }
    }

    for(;index<52;index++){
        $("<div>").css({backgroundImage:`url(./imgs/${poke[index].number}${poke[index].color}.jpg)`})
            .addClass("poke")
            .addClass("left")
            .appendTo(".main")
            .delay(index*100)
            .attr("id","-2_-2")
            .data("number",poke[index].number)
            .animate({left:0,top:476,opacity:1})
    }

    /*
    * 判断是否被压住
    * (i,j) ---> (i+1,j)(i+1,j+1)
    * */
    let first=null;
    box.on("click",".poke",function () {
        let _this=$(this);
        let [i,j]=_this.attr("id").split("_");
        let id1=i*1+1+"_"+j ,id2=i*1+1+"_"+(j*1+1)
        if($("#"+id1).length||$("#"+id2).length){
            return;
        }
        if(_this.hasClass("active")){
            $(_this).removeClass("active").animate({top:'+=30px'})
        }
        else{
            $(_this).addClass("active").animate({top:'-=30px'})
        }
        /*判断*/
        if(!first){
            first=_this;
        } else{
            let number1=first.data("number") ,number2=_this.data("number");
            console.log(first);
            console.log(_this);
            if(number1+number2===14){
                $(".active").animate({top:0,left:700,opacity:0},function () {
                    $(this).remove();
                })
            }
            else{
                $(".active").animate({top:"+=30px"},function () {
                    $(this).removeClass("active");
                })
            }
            first=null;
        }

    })
    let n=0;
    $(".rightBtn").on("click",function () {
        $(".left").last().css("zIndex",n++).animate({left:705},function () {
            $(this).removeClass("left").addClass("right")
        });

    })
    $(".leftBtn").on("click",function () {
        $(".right").first().css("zIndex",n++).animate({left:-2},function () {
            $(this).removeClass("right").addClass("left")
        });

    })
})