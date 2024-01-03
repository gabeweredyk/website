//function buttons(){var t=document.getElementById("container");for(i=1998;i<2019;i++){var e=document.createElement("BUTTON");e.setAttribute("onmousedown","show("+i.toString()+")"),e.className="year",e.innerHTML=i.toString()+" - "+(i+1).toString(),t.append(e)}}function show(t){var e={2001:[5],2002:[2,3,4,5,6],2005:[5,6],2006:[2,6],2009:[4,5,6]};document.getElementById("heading").innerHTML=t.toString()+" - "+(t+1).toString();for(var n,o,r,d=document.getElementById("contests");0!=d.childNodes.length;)d.removeChild(d.childNodes[0]);for(i=1;i<=6;i++){t in e&&e[t].includes(i)||((n=document.createElement("div")).className="contest",n.id=i.toString(),(o=document.createElement("a")).setAttribute("href",t.toString()+"/Contest"+i.toString()+".pdf"),o.innerHTML="Contest "+i.toString(),d.append(o),t<2009&&((r=document.createElement("a")).setAttribute("href",t.toString()+"/Contest"+i.toString()+"Solutions.pdf"),r.innerHTML="Contest "+i.toString()+" Solutions",d.append(r)),d.append(n))}}

function buttons(){
    var container = document.getElementById("container");
    for (i = 1998; i < 2019; i++){
        var btn = document.createElement("BUTTON");
        btn.setAttribute("onmousedown", "show(" + i.toString() + ")");
        btn.className = "year";
        btn.innerHTML = i.toString() + " - " + (i + 1).toString();
        container.append(btn)
    }
}

function show(year){
    var missing = {
        2001:[5],
        2002:[2, 3, 4, 5, 6],
        2005:[5, 6],
        2006:[2, 6],
        2009:[4, 5, 6]
    };
    var heading = document.getElementById("heading");
    heading.innerHTML = year.toString() + " - " + (year + 1).toString();
    var container = document.getElementById("contests");
    while (container.childNodes.length != 0) {
        container.removeChild(container.childNodes[0]);
    }
    for (i = 1; i <= 6; i++){
        if (year in missing && missing[year].includes(i)){
            continue;
        }
        var contest = document.createElement("div");
        contest.className = "contest";
        contest.id = i.toString();
        var problems = document.createElement("a");
        problems.setAttribute("href", year.toString() + "/Contest" + i.toString() + ".pdf")
        problems.innerHTML = "Contest " + i.toString();
        container.append(problems);
        if (year < 2009){
            var solutions = document.createElement("a");
            solutions.setAttribute("href", year.toString() + "/Contest" + i.toString() + "Solutions.pdf")
            solutions.innerHTML =  "Solutions";
            container.append(solutions);
        }
        container.append(contest);
    }
}

