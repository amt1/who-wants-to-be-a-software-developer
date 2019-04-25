const PubSub = require('../helpers/pub_sub.js');

const UserView = function(container) {
  this.container = container;

};

UserView.prototype.render = function(user) {
  const userContainer = document.createElement('div');
  userContainer.id = 'user';

  const name = this.createHeading(user.user_name);
  userContainer.appendChild(name);
  console.log(name)

  const score = this.createDetail(user.score);
  userContainer.appendChild(score);

 const completeButton = document.createElement('button');
 completeButton.textContent = 'Complete';
 completeButton.value = user._id;
 userContainer.appendChild(completeButton);

  // const button = document.createElement('submit');
  // button.classList.add('submit');


  //
  //

  // completeButton.value = user._id;
  // userContainer.appendChild(completeButton);
  //
  // completeButton.addEventListener('click', (evt) => {
  //   PubSub.publish('UserView:update-completed', evt.target.value);
  // });

  const deleteButton = this.createDeleteButton(user._id);
  userContainer.appendChild(deleteButton);

  this.container.appendChild(userContainer);
};

 UserView.prototype.createHeading = function(textContent) {
  const heading = document.createElement('h3');
  heading.textContent = textContent;
  return heading;
};

 UserView.prototype.createDetail = function(textContent) {
  const detail = document.createElement('p');
  detail.textContent = textContent;
  return detail;
};

 UserView.prototype.createDeleteButton = function(bucketId) {
  const button = document.createElement('button');
  button.classList.add('delete-btn');
  button.value = userId;
  button.textContent = "delete";

  button.addEventListener('click', (evt) => {
    PubSub.publish('UserView:user-delete-cliked', evt.target.value);
  });
  return button;
};




module.exports = UserView;
