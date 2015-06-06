var Alert, ErrorHandling;

Alert = (function() {
  function Alert(title1, message1) {
    this.title = title1;
    this.message = message1;
  }

  Alert.prototype.ShowAfter = function(timeout) {
    return setTimeout((function(_this) {
      return function() {
        if ($('.main').text() === 'Loading...') {
          return sweetAlert({
            type: 'warning',
            title: _this.title,
            text: _this.message
          });
        }
      };
    })(this), timeout);
  };

  return Alert;

})();

ErrorHandling = {
  Message: function(title, message) {
    return new Alert(title, message);
  }
};
