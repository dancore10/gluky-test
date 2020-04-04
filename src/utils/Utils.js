class Utils {
    formatDate(date) {
        date = new Date(date);
        return date.toLocaleDateString() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    }
    formatOnlyDate(date) {
        date = new Date(date);
        return date.toLocaleDateString();
    }
    formatFullDate(date) {
        date = new Date(date);
        return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    }
    convertDateAMDT(date) {
        date = new Date(date);
        return date.toISOString().slice(0, 19).replace('T', " ");
    }
}
module.exports = new Utils();