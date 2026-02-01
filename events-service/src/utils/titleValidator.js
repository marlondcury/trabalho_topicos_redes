function isValidTitle(title){
    if (!title) return false;
    const trimmedTitle = title.trim();

    if(trimmedTitle.length < 3) return false;

    return true;
}

module.exports = {isValidTitle};