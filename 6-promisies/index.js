
const p = new Promise( (resolve, reject) =>{
    //kick off some async work
    //
    setTimeout(()=> {
        //resolve(1); // resolvved|fulfilled
        reject ( new Error('message')); // pending -> reject
    }, 2000);

});


p
    .then ( result => console.log('Result'))
    .catch(err => console.log('Error', err.message));

