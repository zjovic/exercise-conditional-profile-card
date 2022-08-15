import "../style/index.css";

function render(variables = {}) {
  const {
    includeCover,
    background,
    avatarURL,
    name,
    lastname,
    role,
    city,
    country,
    socialMediaPosition,
    twitter,
    github,
    linkedin,
    instagram
  } = variables;

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
          ${renderCover(includeCover, background)}
          ${renderAvatar(avatarURL)}
          ${renderName(name, lastname)}
          ${renderRole(role)}
          ${renderLocation(city, country)}
          <ul class="${socialMediaPosition}">
            ${renderSocialMedia({
              instagram,
              github,
              twitter,
              linkedin
            })}
          </ul>
        </div>
    `;
}

const renderCover = (includeCover, background = "") => {
  let $cover = `<div class="cover"><img src="${background}" /></div>`;
  return includeCover && background ? $cover : ``;
};

const renderAvatar = (url = "") => {
  let $avatar = `<img src="${url}" class="photo" />`;
  return url ? $avatar : ``;
};

const renderName = (first, last) => {
  return first && last
    ? `<h1>${first} ${last}</h1>`
    : first
    ? `<h1>${first}</h1>`
    : last
    ? `<h1>${last}</h1>`
    : ``;
};

const renderRole = role => {
  let $role = `<h2>${role}</h2>`;
  return role ? $role : ``;
};

const renderLocation = (city, country) => {
  return city && country
    ? `<h3>${city}, ${country}</h3>`
    : city
    ? `<h3>${city}</h3>`
    : country
    ? `<h3>${country}</h3>`
    : ``;
};

const renderSocialMedia = payload => {
  let html = ``;

  for (const [key, value] of Object.entries(payload)) {
    if (value) {
      html += `<li><a href="${value}"><i class="fa-brands fa-${key}"></i></a></li>`;
    }
  }

  return html;
};

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: "alesanchezr",
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(el) {
    el.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value

      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;

      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
