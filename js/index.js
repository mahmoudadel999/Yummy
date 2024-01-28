let mealsYummy = document.getElementById('mealsYummy');
let searchYummy = document.getElementById('searchYummy');
let submitBtn;

$(document).ready(() => {
  searchNameYummy('').then(() => {
    $('.loading-screen').fadeOut(500);
    $('body').css('overflow', 'visible');
  });
});

function openNavBar() {
  $('.side-nav-menu').animate(
    {
      left: 0,
    },
    500
  );

  $('.open-close-icon').removeClass('fa-bars');
  $('.open-close-icon').addClass('fa-x');

  for (let i = 0; i < 5; i++) {
    $('.links li')
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 10
      );
  }
}

function closeNavBar() {
  let boxWidth = $('.side-nav-menu .nav-tab').outerWidth();
  $('.side-nav-menu').animate(
    {
      left: -boxWidth,
    },
    500
  );

  $('.open-close-icon').addClass('fa-align-justify');
  $('.open-close-icon').removeClass('fa-x');

  $('.links li').animate(
    {
      top: 300,
    },
    500
  );
}

closeNavBar();
$('.side-nav-menu i.open-close-icon').click(() => {
  if ($('.side-nav-menu').css('left') == '0px') {
    closeNavBar();
  } else {
    openNavBar();
  }
});

function displayMealsYummy(arr) {
  let cartoona = '';

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black  p-2">
                        <h3 class="meal-clr fw-bold ">${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }

  mealsYummy.innerHTML = cartoona;
}

async function getCategoriesYummy() {
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);
  searchYummy.innerHTML = '';

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategoriesYummy(response.categories);
  $('.inner-loading-screen').fadeOut(300);
}

function displayCategoriesYummy(arr) {
  let cartoona = '';

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryYummy('${
                  arr[i].strCategory
                }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${
                      arr[i].strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription
                          .split(' ')
                          .slice(0, 20)
                          .join(' ')}</p>
                    </div>
                </div>
        </div>
        `;
  }

  mealsYummy.innerHTML = cartoona;
}

async function getAreasYummy() {
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);

  searchYummy.innerHTML = '';

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();

  displayAreasYummy(respone.meals);
  $('.inner-loading-screen').fadeOut(300);
}

function displayAreasYummy(arr) {
  let cartoona = '';

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getAreasYummyMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  mealsYummy.innerHTML = cartoona;
}

async function getIngredientsYummy() {
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);

  searchYummy.innerHTML = '';

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();

  displayIngredients(respone.meals.slice(0, 20));
  $('.inner-loading-screen').fadeOut(300);
}

function displayIngredients(arr) {
  let cartoona = '';

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(' ')
                          .slice(0, 20)
                          .join(' ')}</p>
                </div>
        </div>
        `;
  }

  mealsYummy.innerHTML = cartoona;
}

async function getCategoryYummy(category) {
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMealsYummy(response.meals.slice(0, 20));
  $('.inner-loading-screen').fadeOut(300);
}

async function getAreasYummyMeals(area) {
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMealsYummy(response.meals.slice(0, 20));
  $('.inner-loading-screen').fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayMealsYummy(response.meals.slice(0, 20));
  $('.inner-loading-screen').fadeOut(300);
}

async function getMealDetails(mealID) {
  closeNavBar();
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);

  searchYummy.innerHTML = '';
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
  $('.inner-loading-screen').fadeOut(300);
}

function displayMealDetails(meal) {
  searchYummy.innerHTML = '';

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-recipes m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags.split(',');
  if (!tags) {
    tags = [];
  }

  let tagsStr = '';
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-warning m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-4 border border-4 border-info " src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-source" {

                }">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  mealsYummy.innerHTML = cartoona;
}

function showSearchInputs() {
  searchYummy.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchNameYummy(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchFLetterYummy(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  mealsYummy.innerHTML = '';
}

async function searchNameYummy(term) {
  closeNavBar();
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? displayMealsYummy(response.meals) : displayMealsYummy([]);
  $('.inner-loading-screen').fadeOut(300);
}

async function searchFLetterYummy(term) {
  closeNavBar();
  mealsYummy.innerHTML = '';
  $('.inner-loading-screen').fadeIn(300);

  term == '' ? (term = 'a') : '';
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? displayMealsYummy(response.meals) : displayMealsYummy([]);
  $('.inner-loading-screen').fadeOut(300);
}

function showContactsYummy() {
  mealsYummy.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  submitBtn = document.getElementById('submitBtn');

  document.getElementById('nameInput').addEventListener('focus', () => {
    nameInputTouched = true;
  });

  document.getElementById('emailInput').addEventListener('focus', () => {
    emailInputTouched = true;
  });

  document.getElementById('phoneInput').addEventListener('focus', () => {
    phoneInputTouched = true;
  });

  document.getElementById('ageInput').addEventListener('focus', () => {
    ageInputTouched = true;
  });

  document.getElementById('passwordInput').addEventListener('focus', () => {
    passwordInputTouched = true;
  });

  document.getElementById('repasswordInput').addEventListener('focus', () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById('nameAlert')
        .classList.replace('d-block', 'd-none');
    } else {
      document
        .getElementById('nameAlert')
        .classList.replace('d-none', 'd-block');
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById('emailAlert')
        .classList.replace('d-block', 'd-none');
    } else {
      document
        .getElementById('emailAlert')
        .classList.replace('d-none', 'd-block');
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById('phoneAlert')
        .classList.replace('d-block', 'd-none');
    } else {
      document
        .getElementById('phoneAlert')
        .classList.replace('d-none', 'd-block');
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById('ageAlert')
        .classList.replace('d-block', 'd-none');
    } else {
      document
        .getElementById('ageAlert')
        .classList.replace('d-none', 'd-block');
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById('passwordAlert')
        .classList.replace('d-block', 'd-none');
    } else {
      document
        .getElementById('passwordAlert')
        .classList.replace('d-none', 'd-block');
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById('repasswordAlert')
        .classList.replace('d-block', 'd-none');
    } else {
      document
        .getElementById('repasswordAlert')
        .classList.replace('d-none', 'd-block');
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById('nameInput').value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById('emailInput').value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById('phoneInput').value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById('ageInput').value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById('passwordInput').value
  );
}

function repasswordValidation() {
  return (
    document.getElementById('repasswordInput').value ==
    document.getElementById('passwordInput').value
  );
}
