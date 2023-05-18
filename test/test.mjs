import axios from 'axios'

var myurl = 'http://localhost:3000';

const instance = axios.create({
    baseURL: myurl,
    timeout: 3000,
    headers: {'content-type': 'application/json'}
});

async function test() {
    try {

        let title = 'Mob Psycho 100 II';
        let res2 = await instance.post('/library/'+title);
        console.log(res2.data);

        let res3 = await instance.delete('/library/'+title);
        console.log(res3.data);

    }
    catch(err) {
        console.log(err);
    }
}

test();