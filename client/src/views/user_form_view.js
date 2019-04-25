const PubSub = require('../helpers/pub_sub.js');

const UserFormView = function(form) {
  this.form = form;
};

UserFormView.prototype.bindEvents = function() {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

UserFormView.prototype.handleSubmit = function(evt) {
  evt.preventDefault();
  const newUser = this.createUser(evt.target);
  PubSub.publish('UserFormView:user-submitted', newUser);
  evt.target.reset();
};

UserFormView.prototype.createUser = function(form) {
  const newUser = {
    name: form.name.value,
    score: form.score.value
  };
  return newUser;

};

module.exports = UserFormView;
