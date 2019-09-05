import AppButtons from './AppButtons';
import AppStartPage from '../../AppStartPage/AppStartPage';

describe('showStartBtns', () => {
  it('Current button should be display "none" ', () => {
    AppStartPage.render();

    const currentPage = document.querySelector('.current-page');

    const appButtons = new AppButtons();
    appButtons.showStartBtns();
    expect(getComputedStyle(currentPage).getPropertyValue('display')).toEqual('none');
  });
});
