const PubSub = require('../helpers/pub_sub.js');
const UserView = require('./user_view.js');


const UserGridView = function(container) {
  this.container = container;


};

UserGridView.prototype.bindEvents = function() {
  PubSub.subscribe('UserList:data-loaded', (evt) => {
    console.log(evt.detail)
    this.render(evt.detail);

  });



};

UserGridView.prototype.render = function(users) {
  this.container.innerHTML = '';
  const userView = new UserView(this.container);
  users.forEach((questions) => userView.render(questions));
};

module.exports = UserGridView;
