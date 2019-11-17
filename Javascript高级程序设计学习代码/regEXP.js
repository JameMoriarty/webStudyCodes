//用正则表达式，找出第一次只出现了一次的值
function find(str){
    for (var i = 0; i < str.length; i++) {
        let char = str[i];
        let reg = new RegExp(char, 'g');
        let l = str.match(reg).length;
        if(l===1){
            return char;
        }
    }
}
console.log(find("pple"));