function isPassword(password){
    return password && password.length >=3;
}

module.exports = {isPassword}