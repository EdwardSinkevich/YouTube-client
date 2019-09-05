import AppStartPage from './AppStartPage';

describe('AppStartPage.render', () => {
  it('Should be render correctly', () => {
    AppStartPage.render();
    expect(document.querySelector('.clips').innerHTML).toMatchSnapshot();
  });
});
