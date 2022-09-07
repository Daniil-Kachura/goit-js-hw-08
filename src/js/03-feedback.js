import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';


const form = document.querySelector('.feedback-form');
const input = document.querySelector('[name="email"]');
const textArea = document.querySelector('[name="message"]');

form.addEventListener('submit', onSubmit);
form.addEventListener('input', throttle(onInputForm, 500));

pushToInputs();

const dataUser = { [input.name]: input.value, [textArea.name]: textArea.value };
localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUser));

function onSubmit(event) {
  event.preventDefault();
  if (input.value === '' || textArea.value === '') {
    return alert('Будь ласка, заповніть всі поля!');
  }
  console.log(dataUser);
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInputForm(evt) {
  dataUser[input.name] = input.value;
  dataUser[textArea.name] = textArea.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUser));
}

function pushToInputs() {
  const savedMsg = localStorage.getItem(STORAGE_KEY);
  const currentUser = JSON.parse(savedMsg);
  if (!currentUser) {
    return;
  }
  input.value = currentUser.email;
  textArea.value = currentUser.message;
}