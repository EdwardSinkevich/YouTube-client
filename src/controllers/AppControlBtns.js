export default class AppControlBtns {
  constructor(slider) {
    this.slider = slider;
    this.btns = {
      firstPage: document.querySelector('.first-page'),
      prevPage: document.querySelector('.prev-page'),
      currentPage: document.querySelector('.current-page'),
      nextPage: document.querySelector('.next-page'),
    };
    this.clipsOnPage = null;
    this.amountClips = null;
    this.currentPageNum = null;
  }

  showBtn(btn) {
    btn.style.display = 'inline-block';
  }

  hideBtn(btn) {
    btn.style.display = 'none';
  }

  updateCurrentBtn(pageNum) {
    const currentPage = document.querySelector('.current-page');
    currentPage.innerHTML = pageNum + 1;
  }

  updateCurrentValues() {
    this.clipsOnPage = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-on-page'), 10);
    this.amountClips = parseInt(getComputedStyle(this.slider).getPropertyValue('--amount-clips'), 10);
    this.currentPageNum = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-page'), 10);
  }

  displayNext() {
    this.updateCurrentValues();

    if (this.currentPageNum > 0) {
      this.showBtn(this.btns.prevPage);
    }
    if (this.currentPageNum > 1) {
      this.showBtn(this.btns.firstPage);
    }
    if (this.currentPageNum + 1 >= this.amountClips / this.clipsOnPage) {
      this.hideBtn(this.btns.nextPage);
    }
  }

  displayPrev() {
    this.updateCurrentValues();

    if (this.currentPageNum < 1) {
      this.hideBtn(this.btns.prevPage);
    }
    if (this.currentPageNum < 2) {
      this.hideBtn(this.btns.firstPage);
    }
    if (this.currentPageNum < (this.amountClips / this.clipsOnPage) - 1) {
      this.showBtn(this.btns.nextPage);
    }
  }

  goNextPage() {
    if (window.clipsLoading) {
      return;
    }
    this.updateCurrentValues();
    this.slider.style.setProperty('--clips-page', this.currentPageNum += 1);

    this.updateCurrentBtn(this.currentPageNum);
    this.displayNext();
  }

  goPrevPage() {
    this.updateCurrentValues();
    this.slider.style.setProperty('--clips-page', this.currentPageNum -= 1);

    this.updateCurrentBtn(this.currentPageNum);
    this.displayPrev();
  }

  goFirstPage() {
    this.updateCurrentValues();
    this.slider.style.setProperty('--clips-page', this.currentPageNum = 0);

    this.updateCurrentBtn(this.currentPageNum);
    this.displayPrev();
  }

  showNextTooltip(e) {
    const toolTip = e.target.querySelector('.tooltip');
    const slider = document.querySelector('.clips');
    toolTip.innerHTML = parseInt(getComputedStyle(slider).getPropertyValue('--clips-page'), 10) + 2;
    toolTip.classList.add('tooltip-visible');
  }

  showPrevTooltip(e) {
    const toolTip = e.target.querySelector('.tooltip');
    const slider = document.querySelector('.clips');
    toolTip.innerHTML = parseInt(getComputedStyle(slider).getPropertyValue('--clips-page'), 10);
    toolTip.classList.add('tooltip-visible');
  }

  showFirstTooltip(e) {
    const toolTip = e.target.querySelector('.tooltip');
    toolTip.innerHTML = 1;
    toolTip.classList.add('tooltip-visible');
  }

  hideTooltip(e) {
    const toolTip = e.target.querySelector('.tooltip');
    toolTip.classList.remove('tooltip-visible');
  }

  addSliderPagination() {
    const next = this.goNextPage.bind(this);
    this.btns.nextPage.addEventListener('click', next, false);
    this.btns.nextPage.addEventListener('mousedown', this.showNextTooltip, false);
    this.btns.nextPage.addEventListener('mouseup', this.hideTooltip, false);
    this.btns.nextPage.addEventListener('mouseout', this.hideTooltip, false);

    const prev = this.goPrevPage.bind(this);
    this.btns.prevPage.addEventListener('click', prev, false);
    this.btns.prevPage.addEventListener('mousedown', this.showPrevTooltip, false);
    this.btns.prevPage.addEventListener('mouseup', this.hideTooltip, false);
    this.btns.prevPage.addEventListener('mouseout', this.hideTooltip, false);

    const first = this.goFirstPage.bind(this);
    this.btns.firstPage.addEventListener('click', first, false);
    this.btns.firstPage.addEventListener('mousedown', this.showFirstTooltip, false);
    this.btns.firstPage.addEventListener('mouseup', this.hideTooltip, false);
    this.btns.firstPage.addEventListener('mouseout', this.hideTooltip, false);
  }
}
