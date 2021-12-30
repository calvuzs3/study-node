const p1 = new Promise( (r, j) => {
    setTimeout(()=> {
        console.log("p1..");
        // r(1);
        j(new Error('something went wrong..'));
    }, 4000);
});

const p2 = new Promise( (r,j) => {
    setTimeout(() => {
        console.log('p2..');
        r(2);
    }, 3000);
});

// Promise.all([p1, p2])
Promise.race([p1, p2])
    .then((result) => console.log("The first is." + result))
    .catch((result) => console.log("Error", result.message));