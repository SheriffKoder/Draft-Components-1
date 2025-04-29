const calculateYearsFrom = (year) => {
    const currentYear = new Date().getFullYear();
    return currentYear - year;
}


module.exports = {
    calculateYearsFrom,
}