function dayweek(){
    var date = document.getElementById("date").value.split("-");
    //date = 2020-10-8 date[0]-date[1]-date[2]
    var count = 0;
    var year = parseInt(date[0]);
    var month = parseInt(date[1]);
    var day = parseInt(date[2]);
    count += (year-1)*365+Math.floor((year-1)/4)-Math.floor((year-1)/100)+Math.floor((year-1)/400);
    for(var i=1;i<month;i++){
        switch(i){
            case 1:count+=31;break;
            case 2:count+=(year%400==0 || (year%100!=0 && year%4==0))?29:28;break;
            case 3:count+=31;break;
            case 4:count+=30;break;
            case 5:count+=31;break;
            case 6:count+=30;break;
            case 7:count+=31;break;
            case 8:count+=31;break;
            case 9:count+=30;break;
            case 10:count+=31;break;
            case 11:count+=30;break;
        }
    }
    count += day;
    var text = "";
    switch(count%7){
        case 0:text="星期日";break;
        case 1:text="星期一";break;
        case 2:text="星期二";break;
        case 3:text="星期三";break;
        case 4:text="星期四";break;
        case 5:text="星期五";break;
        case 6:text="星期六";break;    
    }
    var text_date = year + "/" + month + "/" + day;
    document.getElementById("ans").innerHTML = "從西元1年1月1日至今已過" + count + "天<br>而那天("+ text_date +")是"+text;
}