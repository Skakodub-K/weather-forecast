function upFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}
function cordround(number, round){
    var round = Math.round(number * round) / round;
    return round;
}
function debounce(func, delay=250) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }
export {upFirst,cordround,debounce};