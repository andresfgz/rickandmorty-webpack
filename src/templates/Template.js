import getData from '@utils/getData.js';
import github from '@images/github.png';
import twitter from '@images/twitter.png';
import instagram from '@images/instagram.png';

const Template = async () => {
  const data = await getData();
  const view = `
    <div class="About">
      <div class="card">
        <div class="card_details">
          <div class="card_photo center circle">
            <img src="${data.image}" alt="${data.name}">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;"
              xml:space="preserve">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>
          <p class="card_title">Hi, My name is</p>
          <p class="card_value">${data.name}</p>
        </div>
        <div class="card_userdata">
          <ul>
            <li>Status: ${data.status}</li>
            <li>Specie: ${data.species}</li>
            <li>Location: ${data.location.name}</li>
            <li>gender: ${data.gender}</li>
          </ul>
        </div>
        <div class="card_social">
          <a href="https://github.com/andresfgz">
            <img src="${twitter}" />
          </a>
          <a href="https://twitter.com/Andresfgz2">
            <img src="${github}" />
          </a>
          <a href="https://www.instagram.com/andresfgz2/">
            <img src="${instagram}" />
          </a>
        </div>
      </div>
    </div>
  `;
  return view;
};

export default Template;