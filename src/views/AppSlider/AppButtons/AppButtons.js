import './AppButtons.css';

export default class AppButtons {
  showStartBtns() {
    const firstPage = document.querySelector('.first-page');
    const prevPage = document.querySelector('.prev-page');
    const currentPage = document.querySelector('.current-page');
    const nextPage = document.querySelector('.next-page');

    currentPage.innerHTML = 1;

    firstPage.style.display = 'none';
    prevPage.style.display = 'none';
    currentPage.style.display = 'none';
    nextPage.style.display = 'none';

    const slider = document.querySelector('.clips');
    const amountClips = parseInt(getComputedStyle(slider).getPropertyValue('--amount-clips'), 10);
    const clipsOnPage = parseInt(getComputedStyle(slider).getPropertyValue('--clips-on-page'), 10);

    if (amountClips >= 1) {
      currentPage.style.display = 'inline-block';
    }
    if (amountClips >= clipsOnPage * 2) {
      nextPage.style.display = 'inline-block';
    }
  }
}
