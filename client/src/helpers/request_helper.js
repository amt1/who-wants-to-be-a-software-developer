const RequestHelper = function (url) {
  this.url = url;
  // console.log('url to RequestHelper: ', this.url);
};

RequestHelper.prototype.get = function () {


  return fetch(this.url, {mode: 'no-cors'})
    .then((response) => {
     response.json()
  })
    .catch((err) =>{ console.error(err)
    });
};

RequestHelper.prototype.post = function (payload) {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json());
};

RequestHelper.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json());
};

module.exports = RequestHelper;
