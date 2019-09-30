//基本信息start
//基本信息编辑隐藏弹出start
function editor1() {
    let hidden=document.getElementById('showInformation');
    hidden.style.display="none";

    let obj=document.getElementById('form');
    obj.style.display="block";

    //渲染造型屋信息
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                var info = JSON.parse(xhr.responseText);
                if (info.errCode === 0) {
                    let showInform = "";
                    alert("成功渲染");
                    showInform +=
                        "<p><label for=\"stylistName\">名字：</label><input type=\"text\" class=\"input\" id=\"stylistName\" name=\"stylistName\" value=\""+info.result.stylistName+"\" /></p>"+
                        "<p><label for=\"meal\">简介：</label><input type=\"text\" class=\"input\" id=\"meal\" name=\"meal\" value=\""+info.result.stylistIntroduction+"\" /></p>"+
                        "<p><label for=\"address\">所在造型屋地址：</label><input type=\"text\" class=\"input\" id=\"address\" name=\"address\" value=\""+info.result.stylistAddress+"\" /></p>"+
                        "<p><label for=\"phone\">联系电话：</label><input type=\"text\" class=\"input\" id=\"phone\" name=\"phone\" value=\""+info.result.stylistPhone+"\" /></p>";
                    document.getElementById('updateContent1').innerHTML = showInform;
                }else{
                    alert("用户没有登录");
                }
            }else {
                alert("发生错误"+xhr.status);
            }
        }
    }
    let stylistId=sessionStorage.getItem('stylistId');
    /*let url="/styHouse/"+styHouseId+"/editMessage";*/
    xhr.open('post',"/stylist/editMessage");
    xhr.setRequestHeader("Content-Type","application/json");
    let obj1={"stoken":getCookie('stoken'),"stylistId":stylistId};
    xhr.send(JSON.stringify(obj1));
}
function success(){
    let hidden=document.getElementById('form');
    hidden.style.display="none";
    showInformation();
    let obj=document.getElementById('showInformation');
    obj.style.display="block";
}
//基本信息编辑隐藏弹出end
//基本信息展示
function showInformation(){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                var info = JSON.parse(xhr.responseText);
                if (info.errCode === 0) {
                    sessionStorage.setItem('stylistId',info.result.stylistId);
                    let showInform = "";
                    showInform += "<p><img src='" + info.result.stylistPhoto + "'></p><div class=\"clear\"></div>" +
                        "<p><span class=\"salonname\">名字：" + info.result.stylistName + "</span></p><div class=\"clear\"></div>" +
                        "<p><span class=\"address\">所在造型屋地址：" + info.result.stylistAddress + "</span></p><div class=\"clear\"></div>" +
                        "<p><span class=\"meal\">简介：" + info.result.stylistIntroduction + "</span></p><div class=\"clear\"></div>" +
                        "<p><span class=\"phone\">联系电话：" + info.result.stylistPhone + "</span></p><div class=\"clear\"></div>";
                    document.getElementsByClassName('addContent1')[0].innerHTML = showInform;
                }else{
                    alert("用户没有登录");
                }
            }else {
                alert("发生错误"+xhr.status);
            }
        }
    }
    let stylistId=sessionStorage.getItem('stylistId');
    xhr.open('post','/stylist/index');
    xhr.setRequestHeader("Content-Type","application/json");
    let obj={"stoken":getCookie('stoken'),"stylistId":stylistId};
    xhr.send(JSON.stringify(obj));
}
//我的信息编辑
function information(){
    let salonName=document.getElementById('salonName').value;
    let address=document.getElementById('address').value;
    let meal=document.getElementById('meal').value;
    let time=document.getElementById('time').value;
    let phone=document.getElementById('phone').value;
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
    let stylistId=sessionStorage.getItem('stylistId');
    /*let url="/styHouse/"+styHouseId+"/updateMessage";*/
    xhr.open('post',"/stylist/updateMessage");
    xhr.setRequestHeader("Content-Type","application/json");
    let obj={"stoken":getCookie('stoken'),"stylistId":stylistId,"stylistName":stylistName,"stylistAddress":stylistAddress,"stylistIntroduction":stylistIntroduction,"styHouseWorkTime":time,"stylistPhone":phone};
    xhr.send(JSON.stringify(obj));
    console.log(JSON.stringify(obj));
}

/*待处理咨询*/
function showConsul() {
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
                    for (let i = 0; i < info.result.users.length; i++) {
                        s += "<div class='clear'></div>" +
                            "<div class=\"mealContent\">" +
                            "<img src='" + info.result.users[i].userPhoto + "'/>" +
                            "<p>" +
                            "<span class=\"stylistName\">" + info.result.users[i].userName + "</span><br />"+
                            "<span class=\"orderTime\">发起咨询时间："+info.result.users[i].advisoryStartTime+"</span>"+
                            "</p>" +
                            "<button class='order' onclick='locationAnswer(this)' id="+info.result.users[i].userId+">查看咨询并回复</button>"+
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
    let stylistId=sessionStorage.getItem('stylistId');
    /*let url = "/styHouse/" + styHouseId + "/stylistManager";*/
    xhr.open('post',"/stylist/advisorying");
    xhr.setRequestHeader("Content-Type", "application/json");
    let obj = {
        "stoken":getCookie('stoken'),
        "stylistId": stylistId
    };
    xhr.send(JSON.stringify(obj));
}
/*待处理咨询end*/
function locationAnswer(obj1){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                var info = JSON.parse(xhr.responseText);
                if (info.errCode === 0) {
                    window.location.href = "/html/answerConsultation.html";
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
    let stylistId=sessionStorage.getItem('stylistId');
    xhr.open('post','/stylist/editAdvisory');
    xhr.setRequestHeader("Content-Type","application/json");
    let data=getCookie('stoken');
    let userId=obj1.getAttribute("id");
    sessionStorage.setItem('userId',userId);
    let obj={"stoken":data,"stylistId":stylistId,"userId":userId};
    xhr.send(JSON.stringify(obj));

}


window.onload=function(){
    showInformation();
    /* let collectBtn=document.getElementById('collectBtn');
     collectBtn.addEventListener('click',collect,false);*/
//collectBtn.removeEventListener('click',collect,false); 这个false是阻止冒泡的意思
}