let faker = require('faker');
let axios = require('axios');

let randomCoinName = faker.name.findName();

const url = 'http://localhost:5000/api/v1/coin'
function test(url,name){
    axios.post(url, {name: name}).then(r => r)
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
for (let i = 0; i <20; i++) {
    console.log(randomCoinName);
    sleep(2000)
    test(url,randomCoinName);
}
