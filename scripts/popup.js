let addForm = document.getElementById('addForm');

let addBtn = document.getElementById('add-btn');

let input = document.getElementById('keyword');

input.focus();

addForm.onsubmit = function (e) {
  e.preventDefault();
  addBtn.click();
};


addBtn.onclick = function () {
  const keyword = input.value.trim();
  if (keyword === '') return;

  browser.runtime.sendMessage({action: 'perform-save', data: keyword})
    .then(clearInput);
};

function clearInput() {
  input.value = '';

  browser.runtime.sendMessage({action: 'update-options'});

}


let optionsLink = document.querySelector('.js-options');
optionsLink.onclick = function (e) {
  e.preventDefault();

  browser.tabs.create({'url': browser.extension.getURL('options.html')});
};
