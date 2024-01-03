const K = 15;
const INITIAL_RATING = 1000;
const POINT_ADVANTAGE = 400;
const MAX_S = 1;
const n = 10;

var players;

class Player {
    constructor(name, rating = INITIAL_RATING){
        this.name = name;
        this.rating = rating;
        this.games = 0;
    }
}

function initSystem(){
    players = Array.apply(null, Array(n)).map(function (x, i) {return new Player("Player " + i)});
}

function Qexpected(a, b){
    return Q(a) / (Q(a) + Q(b));
}

function Q(x) {
    return 10 ** (x.rating / POINT_ADVANTAGE);
}

function updateRatings(a, b, S){
    // S is a's score against b
    let Ra = K * (S - Qexpected(a, b));
    let Rb = K * (MAX_S - S - Qexpected(b, a));
    a.rating += Ra;
    b.rating += Rb;
    a.games++;
    b.games++;
}