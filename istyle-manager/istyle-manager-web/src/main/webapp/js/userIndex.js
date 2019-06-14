//用promise封装ajax
function ajax(method, url, data){
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject("Microsoft XMLHTTP");
    }

    return new Promise(function(resolve, reject){
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status>=200 && xhr.status<300 || xhr.status===304){
                    resolve(xhr.responseText);
                }else{
                    reject(xhr.status);
                }
            }
        };
        //判断GET和POST方法
        if(method.toUpperCase()==="GET"){
            xhr.open("GET", url, true);
            xhr.send(null);
        }else if(method.toUpperCase()==="POST"){
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xhr.send(data);

        }
    });
}


//我的信息start
//我的信息编辑隐藏弹出start
function editor() {
    let hidden=document.getElementById('showInformation');
    hidden.style.display="none";

    let obj=document.getElementById('form');
    obj.style.display="block";

    //渲染用户信息
    let xhr=new XMLHttpRequest();

    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){

                var info = JSON.parse(xhr.responseText);

                if (info.errCode === 0) {

                    let showInform = "";
                    alert("成功渲染");
                    showInform += "<p><label for='nickname'>昵称：</label><input type='text' class='input' id='nickname' name='userName' value='"+info.result.userName+"'/></p>" +
                        "<p><label for='personalizedSignature'>我的签名：</label><input type='text' class='input' id='personalizedSignature' name='userWord' value='"+info.result.userWord+"'/></p>" +
                        "<p><label for='userage'>我的年龄：</label><input type='text' class='input' id='userage' name='userage' value='"+info.result.userAge+"' /></p>" +
                        "<p>" +
                        "<span class=\"sex\">性别</span>"+
                        "<label for=\"man\">男</label><input  name=\"sex\" type=\"radio\"  id=\"man\" checked=\"checked\" value=\"男\"/>"+
                        "<label for=\"woman\">女</label><input type=\"radio\"  id=\"woman\" name=\"sex\" value=\"女\"/>"+
                        "<label for=\"secret\">保密</label><input type=\"radio\"  id=\"secret\" name=\"sex\" value=\"保密\"/>"+
                        "</p>";


                    /*alert("成功2"+showInform);*/

                    document.getElementsByClassName('updateContent')[0].innerHTML = showInform;
                    /*alert("成功");*/
                }else{
                    alert("用户没有登录");
                }
            }else {
                alert("发生错误"+xhr.status);
            }
        }
    }
    xhr.open('post','/userHome/updatePage');
    xhr.setRequestHeader("Content-Type","application/json");
    let data=getCookie('stoken');
    console.log(data);
    let obj1={"stoken":data};
    xhr.send(JSON.stringify(obj1));



}
function success(){
    let hidden=document.getElementById('form');
    hidden.style.display="none";
    showInformation();
    let obj=document.getElementById('showInformation');
    obj.style.display="block";
}
//我的信息编辑隐藏弹出end
//我的信息展示
function showInformation(){
        let xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if (xhr.readyState===4){
                if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                    var info = JSON.parse(xhr.responseText);
                    if (info.errCode === 0) {
                        let showInform = "";
                        console.log("成功展示");
                        showInform += "<p><img src='" + info.result.userPhoto + "'></p><div class=\"clear\"></div>" +
                            "<p><span class=\"nickname\">昵称：" + info.result.userName + "</span></p><div class=\"clear\"></div>" +
                            "<p><span class=\"personalizedSignature\">我的签名：" + info.result.userWord + "</span></p><div class=\"clear\"></div>" +
                            "<p><span class=\"userage\">年龄：" + info.result.userAge + "</span></p><div class=\"clear\"></div>" +
                            "<p><span class=\"sex\">性别:" + info.result.userSex + "</span></p><div class=\"clear\"></div>";

                        document.getElementsByClassName('addContent')[0].innerHTML = showInform;
                    }else{
                        alert("用户没有登录");
                    }
                }else {
                    alert("发生错误"+xhr.status);
                }
            }
        }
        console.log("2");
        xhr.open('post','/userHome/index');
        xhr.setRequestHeader("Content-Type","application/json");
        let obj={"stoken":getCookie('stoken')};
        xhr.send(JSON.stringify(obj));
}
//我的信息编辑
function information(){
/*    let fm=document.getElementById('form');
    let fd=new FormData(fm);*/
    console.log("1");
    /*let inputs=document.getElementsByClassName("updateInfo")[0].getElementsByTagName("input");*/
    let username=document.getElementById('nickname').value;
    let userword=document.getElementById('personalizedSignature').value;
    let userage=document.getElementById('userage').value;
    let sex=document.getElementsByName('sex');
    let userSex=null;
    for(let i=0;i<sex.length;i++){
        if(sex[i].checked){
            userSex=sex[i].value;
            break;
        }
    }
    console.log("3");
    let xhr=new XMLHttpRequest();
    console.log("4");
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                console.log("5");
                 var info = JSON.parse(xhr.responseText);
                // var info = xhr.responseText;
                if (info.errCode === 0){
                console.log("保存成功"+xhr.status);
                showInformation();
                }else{
                    console.log("保存失败");
                }
                /*eval("var info="+xhr.responseText);*/
                console.log("6")
            }else{
                console.log("发生错误"+xhr.status);
            }
        }
    }
    console.log("7");
    xhr.open('post','/userHome/updateMessage');
    xhr.setRequestHeader("Content-Type","application/json");
    console.log("8");
    /*for(var i=0; i<inputs.length-1; i++) {*/
    /*}*/
    let obj={"stoken":getCookie('stoken'),"userName":username,"userWord":userword,"userSex":userSex,"userAge":userage};
    xhr.send(JSON.stringify(obj));
    console.log("9");
    console.log(JSON.stringify(obj));
}

//我的收藏start
function collect(){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                let info=JSON.parse(xhr.responseText);
                if (info.errCode === 0) {

//造型师、造型屋、测评的收藏数
                    /*console.log("1");*/
                    let numDesigner="";
                    numDesigner+="<span class='stylingDesignerSpan'>造型师（"+info.result.styCount+")</span>";
                    /*console.log("2");
                    console.log(info.styCount);
                    console.log(info);*/

                    let numSalon="";
                    numSalon+="<span class='hairSalonSpan'>造型屋（"+info.result.styHouseCount+")</span>";
                    /*console.log("3");*/
                    let numEvaluate="";
                    numEvaluate+="<span class='evaluationCollection'>测评（"+info.result.evalCount+")</span>";
                    /*console.log(info.styHouseCount);
                    console.log(info.evalCount);*/

                    //造型师、造型屋、测评的添加内容
                    /*console.log("4");
                    console.log(info.stylist);*/
                    let designerBox="";
                    for (let i=0;i<info.result.stylist.length;i++){
                        designerBox += "<div class='box'><!--<a href='+/*info.stylist[i].designerUrl--><img src='"+info.result.stylist[i].stylistPhoto+"'/><span>"+info.result.stylist[i].stylistName+"造型师</span><!--</a>--></div>";
                    }
                    /*console.log("5");*/
                    let salonBox="";
                    for (let j=0;j<info.result.styHouse.length;j++){
                        salonBox += "<div class='box'><!--<a href='+info.styHouse[j].salonUrl+'>--><img src='"+info.result.styHouse[j].styHousePhoto+"'/><span>"+info.result.styHouse[j].styHouseName+"造型屋</span><!--</a>--></div>";
                    }
                    /* console.log("6");
                     console.log(info.styHouse);*/
                    let evaluateBox="";
                    for (let i=0;i<info.result.evaluation.length;i++){
                        evaluateBox += "<div class='clear'></div>" +
                            "<div class='box1'><!--<a href='+info.evaluation[i].evaluateUrl+'>-->"    +
                            "<img src='"+info.result.evaluation[i].evalPhoto+"'/>"  +
                            "<div class='box1_1'>"   +
                            "<span>"+info.result.evaluation[i].evalName+"</span><br>"  +
                            "<span>简介："+info.result.evaluation[i].evalWord+"</span><br>"  +
                            "<i class='iconfont icon-fenxiang'></i><span class='icon-fenxiangSpan'>分享</span>" +
                            "<i class='iconfont icon-shanchu'></i><span class='icon-shanchuSpan'>删除收藏</span>" +
                            "</div>"  +
                            "<!--</a>--></div>";
                    }
                    /*    console.log("7");
                        console.log(info.evaluation);
                        console.log(evaluateBox);*/

                    document.getElementsByClassName('stylingDesignerSpan')[0].innerHTML=numDesigner;
                    document.getElementsByClassName('hairSalonSpan')[0].innerHTML=numSalon;
                    document.getElementsByClassName('evaluationCollection')[0].innerHTML=numEvaluate;
                    /*console.log("8");*/
                    document.getElementsByClassName('stylingDesignerIn')[0].innerHTML=designerBox;
                    document.getElementsByClassName('hairSalonIn')[0].innerHTML=salonBox;
                    document.getElementsByClassName('evaluation')[0].innerHTML=evaluateBox;
                    alert("收藏成功");
                    /*console.log("succ");*/
                }else{
                    alert("用户没有登录");
                }

            }else{
                alert("发生错误"+xhr.status);
                console.log("err"+xhr.status);
            }
        }
    }
    xhr.open('post','/userHome/collection');
    xhr.setRequestHeader("Content-Type","application/json");
    let obj={"stoken":getCookie('stoken')};
    xhr.send(JSON.stringify(obj));
}


/*
function collect() {
    ajax('get', '').then(function(data){
       /!* let info=JSON.parse(data);*!/
       let info=data;
        //造型师、造型屋、测评的收藏数
        let numDesigner="";
        numDesigner+="<span class='stylingDesignerSpan'>造型师（"+info.designerNum+")</span>";
        let numSalon="";
        numSalon+="<span class='hairSalonSpan'>造型屋（"+info.salonNum+")</span>";
        let numEvaluate="";
        numEvaluate+="<span class='evaluationCollection'>测评（"+info.evaluateNum+")</span>";
        //造型师、造型屋、测评的添加内容
        let designerBox="";
        for (let i=0;i<info.length;i++){
            //<div class="box"><img src="../img/designerphoto2.jpg"/><span>XX造型师</span></div>
            designerBox += "<div class='box'><a href='"+info[i].designerUrl+"'><img src='"+info[i].designerPic+"'/><span>"+info[i].designer+"造型师</span></a></div>";
        }
        let salonBox="";
        for (let i=0;i<info.length;i++){
            //<div class="box"><img src="../img/salaonpho1.jpg"/><span>XX造型屋</span></div>
            salonBox += "<div class='box'><a href='"+info[i].salonUrl+"'><img src='"+info[i].salonPic+"'/><span>"+info[i].salon+"造型屋</span></a></div>";
        }
        let evaluateBox="";
        for (let i=0;i<info.length;i++){
            evaluateBox += "<div class='clear'></div>" +
                "<div class='box1'><a href='"+info[i].evaluateUrl+"'>"    +
                "<img src='"+info[i].evaluatePic+"'/>"  +
                "<div class='box1_1'>"   +
                "<span>"+info[i].evaluateName+"</span><br/>"  +
                "<span>简介："+info[i].evaluateSummary+"</span><br/>"  +
                "<i class='iconfont icon-fenxiang'></i><span class='icon-fenxiangSpan'>分享</span>" +
                "<i class=\"iconfont icon-shanchu\"></i><span class=\"icon-shanchuSpan\">删除收藏</span>" +
                "</div>"  +
                "</a></div>";
        }

        document.getElementsByClassName('stylingDesignerSpan')[0].innerHTML=numDesigner;
        document.getElementsByClassName('hairSalonSpan')[0].innerHTML=numSalon;
        document.getElementsByClassName('evaluationCollection')[0].innerHTML=numEvaluate;

        document.getElementsByClassName('stylingDesigner')[0].innerHTML=designerBox;
        document.getElementsByClassName('hairSalon')[0].innerHTML=salonBox;
        document.getElementsByClassName('evaluation')[0].innerHTML=evaluateBox;
        alert("收藏成功");
    }).catch(function (err) {
        console.error(err);
    });
}
*/



//我的收藏end

//我的关注start
function subscribe(){
    let xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState===4){
            if (xmlhttp.status>=200 && xmlhttp.status<300 || xmlhttp.status===304 ){
                let info=JSON.parse(xmlhttp.responseText);

                if (info.errCode === 0) {

                    let numsubscribe="";
                    //<span class="subscribeNum">关注(关注数)</span>
                    numsubscribe+="关注（"+info.result.attentionCount+")";

                    /*console.log(info.follerCount);*/
                    let s="";
                    for(let i=0;i<info.result.attentionCount;i++){

                        s+= "<div class='clear'></div>"+
                            "<div class='subscribeContent1'>"+
                            "<img src='"+info.result.attentions[i].userPhoto+"'/>"+
                            "<p>"+
                            "<span>"+info.result.attentions[i].userName+"</span><br/>"+
                            "<span>"+info.result.attentions[i].userWord+"</span>"+
                            "</p>"+
                            "<button class='privateChat'><a href=''>私信</a></button>"+
                            "<button class='subscribeOrNot' onclick='delSubsc(this)' id='"+info.result.attentions[i].userId+"' >取消关注</button>"+  /*data-userId='info.follers[i].userId'*/
                            "</div>"+
                            "<div class='clear'></div>";
                        /*userId=info.follers[i].userId;*/
                    }

                    console.log(info.result.attentions);
                    document.getElementsByClassName('subscribeNum')[0].innerHTML=numsubscribe;
                    document.getElementsByClassName('rightBottomSubscribe')[0].innerHTML=s;
                    /*alert("关注连接成功");*/
                    console.log("成功");
                }else{
                    alert("用户没有登录");
                }
            }else{
                alert("发生错误"+xmlhttp.status);
                console.log("'发生错误'+xmlhttp.status");
            }
        }
    }
    xmlhttp.open('post','/userHome/attention');
    xmlhttp.setRequestHeader("Content-Type","application/json");
    let obj={"stoken":getCookie('stoken')};
    xmlhttp.send(JSON.stringify(obj));
}
//我的关注end

//取消关注start
function delSubsc(obj){
    /*    let fm=document.getElementById('form');

        let fd=new FormData(fm);*/
    /*console.log("1");*/
    let information1="";
    /*console.log("2");*/

    let xhr=new XMLHttpRequest();
    /*console.log("4");*/
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                console.log("5");
                var info1 = JSON.parse(xhr.responseText);
                console.log(info1);
                // var info = xhr.responseText;
                if (!info1.errCode){
                    console.log("取消关注成功"+xhr.status);
                    subscribe();
                }else{
                    console.log("取消关注失败");
                }
                console.log("6");
            }else{
                console.log("发生错误"+xhr.status);
            }
        }
    }
    /*console.log("7");*/
    xhr.open('post','/userHome/unFollow');
    xhr.setRequestHeader("Content-Type","application/json");
    /*console.log("8");*/
    let userId=obj.getAttribute("id");
    let data={"stoken":getCookie('stoken'),"unFollowUserId":userId};
    xhr.send(JSON.stringify(data));
   /* console.log("9");
    console.log(data);*/
}


//我的粉丝start
function fans(){
    let xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject("Microsoft XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState===4){
            if(xmlhttp.status===200){
                let info=JSON.parse(xmlhttp.responseText);

                if (info.errCode === 0) {
                    let numfans="";
                    //<span class="fansNum">粉丝(粉丝数)</span>
                    numfans+="粉丝（"+info.result.fanCount+")";

                    let s="";
                    for(let i=0;i<info.result.fanCount;i++){

                        if(info.result.usersState[i]){  //0是已关注，1是未关注
                            s+="<div class='clear'></div>"+
                                "<div class='myfanContent1'>"+
                                "<img src='"+info.result.fans[i].userPhoto+"'/>"+
                                "<p>"+
                                "<span>"+info.result.fans[i].userName+"</span><br/>"+
                                "<span>"+info.result.fans[i].userWord+"</span><br/>"+
                                "</p>"+
                                "<button class='privateChat'><a href=''>私信</a></button>"+
                                "<button class='subscribeOrNot' onclick='addSubsc(this)' id='"+info.result.fans[i].userId+"' >加关注</button>"+
                                "</div>"+
                                "<div class='clear'></div>";
                        }else{
                            s+="<div class='clear'></div>"+
                                "<div class='myfanContent1'>"+
                                "<img src='"+info.result.fans[i].userPhoto+"'/>"+
                                "<p>"+
                                "<span>"+info.result.fans[i].userName+"</span><br/>"+
                                "<span>"+info.result.fans[i].userWord+"</span><br/>"+
                                "</p>"+
                                "<button class='privateChat'><a href=''>私信</a></button>"+
                                "<button class='subscribeOrNot'>已关注</button>"+
                                "</div>"+
                                "<div class='clear'></div>";
                        }

                    }

                    document.getElementsByClassName('fansNum')[0].innerHTML=numfans;
                    document.getElementsByClassName('rightBottomMyfan')[0].innerHTML=s;
                    console.log("粉丝连接成功");

                }else{
                    alert("用户没有登录");
                }


            }else{
                console.log("发生错误"+xmlhttp.status);
            }
        }
    }
    xmlhttp.open('post','/userHome/fans');
    xmlhttp.setRequestHeader("Content-Type","application/json");
    let obj={"stoken":getCookie('stoken')};
    xmlhttp.send(JSON.stringify(obj));
}
//我的粉丝end

//加关注start
function addSubsc(obj){
    /*console.log("1");*/
    let information1="";
    /*console.log("2");*/

    let xhr=new XMLHttpRequest();
    /*console.log("4");*/
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                /*console.log("5");*/
                var info1 = JSON.parse(xhr.responseText);
                console.log(info1);
                // var info = xhr.responseText;
                if (!info1.errCode){
                    console.log("关注成功"+xhr.status);
                    fans();
                }else{
                    console.log("关注失败");
                }
                console.log("6");
            }else{
                console.log("发生错误"+xhr.status);
            }
        }
    }
    /*console.log("7");*/
    xhr.open('post','/userHome/doFanFollow');
    xhr.setRequestHeader("Content-Type","application/json");
    /*console.log("8");*/
    let userId=obj.getAttribute("id");
    let data={"stoken":getCookie('stoken'),"doFollowUserId":userId};
    xhr.send(JSON.stringify(data));
    /*console.log("9");*/
    /*console.log(JSON.stringify(data));*/
}

//我的咨询
function myConsultation() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                var info = JSON.parse(xhr.responseText);
                // var info = xhr.responseText;
                if (info.errCode === 0) {
                    /* let styNum="";
                     //<span class="styNum">造型师数(6)</span>
                     styNum+="造型师数（"+info.result.stylistCount+")";*/
                    let s = "";
                    for (let i = 0; i < info.result.advisorys.length; i++) {
                        s += "<div class='clear'></div>" +
                            "<div class=\"mealContent\">" +
                            "<img src='" + info.result.advisorys[i].stylistPhoto + "'/>" +
                            "<p>" +
                            "<span class=\"stylistName\">" + info.result.advisorys[i].stylistName + "</span><br />"+
                            "<span class=\"orderTime\">回复咨询时间："+info.result.advisorys[i].advisoryEndTime+"</span>"+
                            "</p>" +
                            "<button class='order' onclick='locationCheckConsul(this)' id="+info.result.advisorys[i].advisoryId+">查看咨询并回复</button>"+
                            "</div>";
                    }
                    /*document.getElementsByClassName('styNum')[0].innerHTML=styNum;*/
                    document.getElementById('showstylist').innerHTML = s;
                } else {
                    console.log("造型师管理展示失败");
                }
            } else {
                console.log("发生错误" + xhr.status);
            }
        }
    }
    /*let stylistId=sessionStorage.getItem('stylistId');*/
    /*let url = "/styHouse/" + styHouseId + "/stylistManager";*/
    xhr.open('post',"/userHome/advisory");
    xhr.setRequestHeader("Content-Type", "application/json");
    let obj = {
        "stoken":getCookie('stoken'),
        "stylistId": stylistId
    };
    xhr.send(JSON.stringify(obj));
}
/*我的咨询跳转查看咨询*/
function locationCheckConsul(obj1){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                var info = JSON.parse(xhr.responseText);
                if (info.errCode === 0) {
                    window.location.href = "/html/checkConsultation.html";
                    alert("跳转成功");
                    let hidden=document.getElementById('beforeLogin');
                    hidden.style.display="none";
                    let userName=getCookie('username');
                    let appear=document.getElementsByClassName('afterLogin')[0];
                    appear.innerHTML="欢迎"+userName+"登录istyle";
                }else{
                    alert("跳转失败，该用户没有登录");
                }
            }else {
                alert("发生错误"+xhr.status);
                console.error(xhr.responseText);
            }
        }
    }
    xhr.open('post','/userHome/replyAdvisory');
    xhr.setRequestHeader("Content-Type","application/json");
    let data=getCookie('stoken');
    let advisoryId=obj1.getAttribute("id");
    sessionStorage.setItem('advisoryId',advisoryId);
    let obj={"stoken":data,"advisoryId":advisoryId};
    xhr.send(JSON.stringify(obj));

}




//我的预约start
/*function myOrder(){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status===200){
                var info=xhr.responseText;


                let myOrder="";
                for (let i=0;i<info.length;i++){
                    //<div class="box"><img src="../img/designerphoto2.jpg"/><span>XX造型师</span></div>
                    myOrder += "<div class='box'><a href='"+info[i].myorderUrl+"'><img src='"+info[i].myorderPic+"'/><span>"+info[i].designer+"</span></a></div>";
                }

                let historyOrderDesigner="";
                for (let i=0;i<info.length;i++){
                    //<div class="box"><img src="../img/designerphoto2.jpg"/><span>XX造型师</span></div>
                    historyOrderDesigner += "<div class='box'><a href='"+info[i].historyDesignerUrl+"'><img src='"+info[i].designerPic+"'/><span>"+info[i].designer+"</span></a></div>";
                }


                document.getElementsByClassName('myOrder').innerHTML+=myOrder;
                document.getElementsByClassName('stylingDesigner').innerHTML+=historyOrderDesigner;
                alert("预约连接成功");
            }else {
                alert("发生错误"+xhr.status);
            }
        }

    }
    xhr.open('get','');
    xhr.send(null);
}*/
//我的预约end


//我的投稿start
function contribute(){
    let xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject("Microsoft XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState===4){
            if(xmlhttp.status>=200 && xmlhttp.status<300 ||xmlhttp.status===304){
                let info=JSON.parse(xmlhttp.responseText);

                if (info.errCode === 0) {

                    let contriNum="";
                    //<span class="fansNum">粉丝(粉丝数)</span>
                    contriNum+="全部稿件（"+info.result.submissionCount+")";

                    let s="";
                    for(let i=0;i<info.result.submissionCount;i++){


                        s+="<div class='clear'></div>"+
                            "<div class='contributeContentAll'>"+
                            "<img src='"+info.result.submissions[i].subPhoto+"'/>"+
                            "<div class='box1_1'>"+
                            "<span>"+info.result.submissions[i].subName+"</span><br />"+
                            "<span>"+info.result.submissions[i].subTime+"</span><br />"+
                            "<i class='iconfont icon-bofang'></i><span class='icon-viewSpan'>浏览"+info.result.submissions[i].subPageView+"</span>"+
                            "<i class='iconfont icon-comments'></i><span class='icon-commentSpan' style='margin-left: 65px'>评论"+info.result.submissions[i].subComment+"</span>"+
                            "<i class='iconfont icon-favoritesfilling'></i><span class='icon-collectSpan' style='margin-left: 60px'>收藏"+info.result.submissions[i].subCollection+"</span><br />"+
                            "<p>"+
                            "<button class='privateChat'><a href=''>编辑</a></button>"+
                            "<button class='privateChat'><a href=''>删除</a></button>"+
                            "</p>"+
                            "</div></div>"+
                            "<div class='clear'></div>";

                    }

                    document.getElementsByClassName('contriNum')[0].innerHTML=contriNum;
                    document.getElementsByClassName('addContribute')[0].innerHTML=s;
                    console.log("投稿连接成功");

                }else{
                    alert("用户没有登录");
                }

            }else{
                console.log("发生错误"+xmlhttp.status);
            }
        }
    }
    xmlhttp.open('post','/userHome/submission');
    xmlhttp.setRequestHeader("Content-Type","application/json");
    let obj={"stoken":getCookie('stoken')};
    xmlhttp.send(JSON.stringify(obj));
}
//我的投稿end



//事件绑定start
/*onclick绑定
let collectBtn=document.getElementById('collectBtn');
collectBtn.onclick=collect;
//解绑：collectBtn.onclick=null;*/


//事件绑定end
/*
let subscribeBtn=document.getElementById('subscribeBtn');
subscribeBtn.addEventListener('click',subscribe,false);

let fansBtn=document.getElementById('fansBtn');
fansBtn.addEventListener('click',fans,false);

let myOrderBtn=document.getElementById('myOrderBtn');
myOrderBtn.addEventListener('click',myOrder,false);
console.log(collectBtn);*/


window.onload=function(){
    console.log("userIndex");
    showInformation();
    /* let collectBtn=document.getElementById('collectBtn');
     collectBtn.addEventListener('click',collect,false);*/
//collectBtn.removeEventListener('click',collect,false); 这个false是阻止冒泡的意思
};

