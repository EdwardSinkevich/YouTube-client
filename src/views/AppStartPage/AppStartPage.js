import './AppStartPage.css';

export default class AppStartPage {
  static render() {
    document.body.innerHTML = `<div class='container'><div class='search-wrapper'>
    <div class='search-box'><button class='button'></button>
    <input class='search-input'></div></div><ul class='clips'></ul>
    <div class='controls'><button class='control-button first-page'><span class="tooltip"></span></button>
    <button class='control-button prev-page'><span class="tooltip"></span></button>
    <button class='control-button current-page'></button>
    <button class='control-button next-page'><span class="tooltip"></span></button></div></div>`;
  }
}
