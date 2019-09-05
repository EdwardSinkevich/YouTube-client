import './AppClips.css';

export default class AppClips {
  constructor(videoInfo) {
    this.videoInfo = videoInfo;
    this.clips = [];
  }

  generateClips() {
    const {
      thumbnails, titles, id, channelTitles, uploadDates, viewCounts, descriptions,
    } = this.videoInfo;

    function cutText(text, count) {
      let newStr = '';
      if (text.length > count) {
        newStr = text.substring(0, count).concat('...');
        return newStr;
      }
      return text;
    }

    for (let i = 0; i < id.length; i += 1) {
      const listItem = document.createElement('li');
      listItem.className = 'list-item';

      listItem.innerHTML = `<div class="clip"><div class="clip-title">
                            <img class="clip-img" src="${thumbnails[i]}" alt="${titles[i]} width="320"">
                            <a class="title" href="https://www.youtube.com/watch?v=${id[i]}" target="_blank">${cutText(titles[i], 50)}</a>
                            </div><div class="clip-info"><div class="info-snippet"><div class="info-inner info-channel">
                            ${cutText(channelTitles[i], 15)}</div><div class="info-inner info-date">${uploadDates[i].substr(0, 10)}</div>
                            <div class="info-inner info-views">${viewCounts[i]}</div></div><div class="info-description">
                            ${cutText(descriptions[i], 160)}</div></div></div>`;
      this.clips.push(listItem);
    }
    return this.clips;
  }
}
