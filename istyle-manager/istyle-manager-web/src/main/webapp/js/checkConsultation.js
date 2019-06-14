function showConsultation(){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if (xhr.readyState===4){
            if (xhr.status>=200 && xhr.status<300 || xhr.status===304){
                var info = JSON.parse(xhr.responseText);
                if (info.errCode === 0) {
                    sessionStorage.setItem('stylistId',info.result.stylistId);
                    let showInform = "";
                    showInform += "<p><label class=\"myphoto\">咨询照片</label><img src=\"" + info.result.advisoryPhoto + "\"/></p><div class=\"clear\"></div>" +
                        "<p><span class=\"salonname\">我的基本信息:" + info.result.advisoryHeight + info.result.advisoryWeight+"</span></p><div class=\"clear\"></div>" +
                        "<p><span class=\"address\">我的穿衣风格描述:" + info.result.advisoryStyle + "</span></p><div class=\"clear\"></div>" +
                        "<p><span class=\"meal\">本次咨询问题描述：" + info.result.advisoryDescription+ "</span></p><div class=\"clear\"></div>";
                    document.getElementById('myConsul').innerHTML = showInform;
                    let s="";
                    s+="<p><label class=\"myphoto\">照片</label><img src=\"" + info.result.replyPhoto + "\"/></p><div class=\"clear\"></div>" +
                        "<p><span class=\"address\">回复内容:" + info.result.replyMessage + "</span></p><div class=\"clear\"></div>" +
                        "<p><span class=\"meal\">所在造型屋链接：" + info.result.styHouseURL+ "</span></p><div class=\"clear\"></div>" ;
                    document.getElementById('stylist_answer').innerHTML = s;
                }else{
                    alert("用户没有登录");
                }
            }else {
                alert("发生错误"+xhr.status);
            }
        }
    }
    let advisoryId=sessionStorage.getItem('advisoryId');
    xhr.open('post','/userHome/replyAdvisory');
    xhr.setRequestHeader("Content-Type","application/json");
    let obj={"stoken":getCookie('stoken'),"advisoryId":advisoryId};
    xhr.send(JSON.stringify(obj));
}
window.onload=function(){
    console.log("checkConsultation.html");
    showConsultation();
};