function trans(){
    var baseL = document.getElementById("baseL").value;
    var baseR = document.getElementById("baseR").value;
    if(baseL < 2 || baseL > 62 || baseR < 2 || baseR > 62 ){
        document.getElementById("baseL").value = "";
        document.getElementById("baseR").value = "";
        alert("進制錯誤");
    }else{
        var num = document.getElementById("base_text").value;
        if(pattern_check(num,baseL,baseR)){
            document.getElementById("base_text").value = "";
            alert("數值錯誤");
        }else{
            if(baseL != baseR)
                num = base_trans(baseL,baseR,num);
            document.getElementById("ans").innerHTML = "Ans: " + num;
        }
    }
    document.getElementById("baseL").focus();
}
function pattern_check(num,baseL,baseR){
    for(var i=0;i<num.length;i++){
        try{
            var num_char = num.charCodeAt(i);
        }catch(e){
            return true;
        }
        var temp;
        if(num_char > 47 && num_char < 58)
            temp = num_char - 48;
        if(num_char > 64 && num_char < 91)
            temp = num_char - 29;//-65+36
        if(num_char > 96 && num_char < 123)
            temp = num_char - 87;//-97+10
        if(temp >= baseL)return true;
    }
    return false;
}
function base_trans(baseL,baseR,num){
    var dec_num = 0;
    var text_num = "";
    if(baseL != 10){//num to dec
        var temp = 1;
        for(var i=num.length-1;i>=0;i--){
            var num_char = num.charCodeAt(i);
            if(num_char > 47 && num_char < 58)
                dec_num += (num_char - 48) * temp;
            if(num_char > 64 && num_char < 91)
                dec_num += (num_char - 29) * temp;//-65+36
            if(num_char > 96 && num_char < 123)
                dec_num += (num_char - 87) * temp;//-97+10
            temp *= baseL;
        }
    }else
        dec_num = num;
    if(baseR != 10){//dec to base
        while(dec_num != 0){
            var temp = dec_num % baseR;
            if(temp >= 10 && temp < 36)
                temp = String.fromCharCode(temp+87);
            else if(temp >= 36 && temp < 62)
                temp = String.fromCharCode(temp+29);
            text_num = temp + "" + text_num;
            dec_num = Math.floor(dec_num/baseR);
        }
    }else
        return dec_num;
    return text_num;
}