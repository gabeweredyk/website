var resets = [0, 24, 60, 60];
var names = ["days", "hours", "minutes", "seconds"];
var x;

function updateTime(i){
    var num = interval[i].toString();
    if (interval[i] < 10 && i>1){
        num = "0" + num;
    }
    // var c = Array.from(document.getElementsByClassName(names[i]));
    // c.forEach(element => {
    //     element.innerHTML = num;
    // });
    document.getElementById(names[i]).innerHTML = num;
}

for (let i = 0; i < 4; i++){
    updateTime(i);
}
function bump(i){
    if (interval.reduce((a, b) => a + b) == 0) {clearInterval(x); return;}
    interval[i]--;
    if (interval[i] < 0){
        bump(i - 1);
        interval[i] += resets[i];
    }
    updateTime(i);
}
x = setInterval(bump, 1000, 3);