const g = 2.5;
const m = 1;
const mu = 0.05;

class Vector {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
        // this.nX = this.x / this.mag();
        // this.nY = this.y / this.mag();
    }

    mag(){
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    // setMagnitude(m){
    //     this.x = this.nX * m;
    //     this.y = this.nY * m;
    // }
}

class Player {
    constructor(x0, y0) {
        this.s = new Vector(x0, y0);
        this.v = new Vector();
        this.F = {};
        this.F["Fg"] = new Vector(0, m * g);
        this.F["Fn"] = new Vector();
        this.F["Ff"] = new Vector();
        this.F["Fa"] = new Vector();
    }

    updateMotion(t){
        

        this.applyFriction();
        this.v.x += this.R().x * t;
        this.v.y += this.R().y * t;
        this.s.x += this.v.x;
        this.s.y += this.v.y;
    }

    R(){
        let sum = new Vector();
        for (var k in this.F){
            sum.x += this.F[k].x;
            sum.y += this.F[k].y;
        }
        return sum;
    }

    applyFriction(){

        if (this.v.mag() == 0) return;
        this.F["Ff"].x = -this.v.x * ( (mu * this.F["Fn"].mag()) / this.v.mag() );
        this.F["Ff"].y = -this.v.y * ( (mu * this.F["Fn"].mag()) / this.v.mag() );

        
    }

}