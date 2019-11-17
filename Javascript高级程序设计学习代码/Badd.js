function NumberOf1(n)
{
    var num=new Array(32);
    if(n>=0){
        num = n.toString(2).split("");
    }else{
        num = (num.join("0")+Math.abs(n).toString(2)).slice(-32).split("");
        addB(num);
    }
    var sum = 0;
    for(var i=0;i<num.length;i++){
        if(num[i] == 1){
            sum++;
        }
    }
    return sum;
}
    
function addB(num){
    for(var j=0;j<num.length;j++){
        if(num[j]==0)
            num[j]=1;
        else
            num[j]=0;
    }
    if(num[num.length-1]==1){
        for(var i=num.length-1;i>=0;i--){
            if(num[i]==1){
                num[i]=0;
            }
            else if(num[i]==0){
                num[i]=1;
                break;
            }
        }
    }else{
        num[num.length-1]+=1;
    }
}

console.log(NumberOf1(-1));