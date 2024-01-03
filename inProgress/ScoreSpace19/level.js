

class Level {
    constructor(lines){
        this.lines = [];
        for ( let i = 0; i < lines.length; i++ ) {
            this.lines.push(new Line(lines[i][0], lines[i][1], lines[i][2], lines[i][3]));
        }
    }
}

class Line{
    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.length =  Math.sqrt((this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2);
        this.norm =  [(this.y1 - this.y2) / this.length, (this.x2 - this.x1) / this.length];
    }

    // applyNormalForce(p){
    //     p.F['Fn'] this.norm[0] * p.F['Fg'].y, -this.norm[1] * p.F['Fg'].y);
    //     p.v.y = 0;
    //     console.log(p.F['Fn']);= new Vector(-
    // }

    pointDist(x, y){
        let dot1 = (this.x2 - this.x1) * (x - this.x1) + (this.y2 - this.y1) * (y - this.y1);
        let dot2 = (this.x2 - this.x1) * (x - this.x2) + (this.y2 - this.y1) * (y - this.y2);

        if (dot2 > 0){ 
            return Math.sqrt( (y - this.y2) ** 2 + (x - this.x2) ** 2 );
        }
        else if (dot1 < 0){
            return Math.sqrt( (y - this.y1) ** 2 + (x - this.x1) ** 2 );
        }
        else {
            return Math.abs( (this.x2 - this.x1) * (y - this.y1) - (this.y2 - this.y1) * (x - this.x1) ) / this.length;
        }
    }
}