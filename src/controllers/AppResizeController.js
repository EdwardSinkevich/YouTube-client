import AppControlBtns from './AppControlBtns';

export default class AppResizeController {
  constructor(slider, clipsOnPage) {
    this.slider = slider;
    this.clipsOnPage = clipsOnPage;
  }

  actualResizeHandler() {
    const currentClipsOnPage = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-on-page'), 10);
    let currentPageNum = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-page'), 10);

    if (currentClipsOnPage !== this.clipsOnPage) {
      currentPageNum = Math.floor(currentPageNum * (this.clipsOnPage / currentClipsOnPage));

      this.clipsOnPage = getComputedStyle(this.slider).getPropertyValue('--clips-on-page');

      this.slider.style.setProperty('--clips-page', currentPageNum);

      const controlBtns = new AppControlBtns(this.slider);
      controlBtns.updateCurrentBtn(currentPageNum);
      controlBtns.displayPrev();
      controlBtns.displayNext();
    }
  }

  resizeThrottler() {
    let resizeTimeout;
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        this.actualResizeHandler();
      }, 15);
    }
  }

  addResizeController() {
    const throttler = this.resizeThrottler.bind(this);
    window.addEventListener('resize', throttler, false);
  }
}
