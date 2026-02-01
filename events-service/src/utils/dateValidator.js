function isFutureDate(dateString){
    const eventDate = new Date(dateString);
    const now = new Date();
    return eventDate > now;
}

module.exports = {isFutureDate};