function pickfunc(){
    var num_list = [];
    var randomL = Math.floor(document.getElementById("randomL").value);
    var randomR = Math.floor(document.getElementById("randomR").value);
    var count = Math.floor(document.getElementById("count").value);
    var check_re = document.getElementById("check_re").checked;
    if(randomL > randomR){//check small to big
        var temp = randomL;
        randomL = randomR;
        randomR = temp;
    }
    if(randomL < 0 || randomR < 0){
        alert("不能包含負數");
    }else if(count > randomR-randomL+1){//check count case
        alert("次數過多");
        document.getElementById('count').value = "";
    }else{
        while(count != 0){
            var check = true;
            var temp = Math.floor(Math.random() * (randomR - randomL + 1) + randomL)
            if(!check_re){//can't re
                for(var i=0;i<num_list.length;i++){
                    if(num_list[i] == temp){
                        check = false;
                        break;
                    }
                }
            }
            if(check){
                num_list.push(temp);
                count -= 1;
            }
        }
        var text = "";
        for(var i=0;i<num_list.length;i++){
            text += num_list[i] + " ";
        }
        document.getElementById("ans").innerHTML = "Output: " + text;
    }
}