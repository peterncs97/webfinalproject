
class algo {
    constructor() { };

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }    
    correctnessOfOne(input, target) {
        var result = 0;
        for (let i = 0; i < target.length & i < input.length; i++) {
            if (input[i] == target[i]) {
                result+=1;
            }
        }
        // when there is redundent input
        if (target.length < input.length)
            return result / (input.length - target.length);
        // when input do not exceed target
        return result / target.length;
    }

    correctness(input, targets) {
        var result = Number.NEGATIVE_INFINITY;
        for (const target of targets) {
            let temp = this.correctnessOfOne(input, target);
            result = result > temp ? result : temp;
        }
        return result;
    }

    timeBonus(rt, target, ratio) {
        if ((rt) === (target)) return 1;
        return ((target) - (rt)) * (1 + ratio);
    }


}
module.exports = algo;
