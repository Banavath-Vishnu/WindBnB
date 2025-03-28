import bcrypt from 'bcryptjs';

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

export {
    bcryptSalt,
    jwtSecret,
}; 