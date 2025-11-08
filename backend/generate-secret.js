const crypto = require('crypto');

function gererateRandomSecret() {
    return crypto.randomBytes(64).toString('hex');
};

console.log(gererateRandomSecret());

