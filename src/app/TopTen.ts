export class TopTen{
    currentBest = [];
    lowestScore = 0;

    insert(key: any, score: number){
        if (this.currentBest.length < 10){
            this.currentBest.push({
                key: key,
                score: score
            });
            this.lowestScore = Math.min(this.lowestScore, score);
        }
        else {
            if (score > this.lowestScore){
                this.currentBest.push({
                    key: key,
                    score: score
                });
                this.currentBest.sort((a, b) => b.score - a.score);
                this.currentBest.splice(10);
                this.lowestScore = this.currentBest[9].score;
            }
        }
    }

    log(){
        console.log(JSON.stringify(this.currentBest, null, 2));
    }

    getBest() {
        return this.currentBest;
    }

}

// let topTenTest = new TopTen();

// topTenTest.insert("two1", 2);
// topTenTest.insert("two2", 2);
// topTenTest.insert("two3", 2);
// topTenTest.insert("one", 1);
// topTenTest.insert("one2", 1);
// topTenTest.insert("one3", 1);
// topTenTest.insert("one4", 1);
// topTenTest.insert("one5", 1);
// topTenTest.insert("three", 3);
// topTenTest.insert("four", 4);
// topTenTest.log();
// topTenTest.insert("two1", 2);
// topTenTest.log();
// topTenTest.insert("two1", 2);
// topTenTest.log();
// topTenTest.insert("two1", 2);
// topTenTest.log();
// topTenTest.insert("five", 5);
// topTenTest.log();
// topTenTest.insert("one6", 1);
// topTenTest.log();
// topTenTest.insert("one7", 1);
// topTenTest.log();