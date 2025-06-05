const feedBackForm = document.querySelector('.js-feedback-form');

let formData ={};


const fillFormFields= feedBackForm => {
  const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'))

  if (formDataFromLS === null ) {
    return;
  }

  formData = formDataFromLS;

  const fromDataFromLSKeys = Object.keys(formDataFromLS);

  for (const key of fromDataFromLSKeys) {
    feedBackForm.elements[key].value = formDataFromLS[key];

  }
};

fillFormFields(feedBackForm);

const onFormFieldInput = ({ target: formField}) =>{
  const formFieldName = formField.name;
  const formFieldValue = formField.value;

  formData[formFieldName] = formFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

const onFormSubmit = event => {
  event.preventDefault();

  if (!formData.message || !formData.email) {
    alert("Fill please all fields")
    console.log(formData);
  } else {
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    formData = {};
    event.target.reset();
  }
}

feedBackForm.addEventListener('input', onFormFieldInput);

feedBackForm.addEventListener('submit', onFormSubmit);
