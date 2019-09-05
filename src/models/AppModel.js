export default class AppModel {
  constructor(request) {
    this.request = request;
    this.videoInfo = {
      nextPageToken: null,
      id: [],
      titles: [],
      thumbnails: [],
      descriptions: [],
      channelTitles: [],
      uploadDates: [],
      viewCounts: [],
    };
  }

  async takeData() {
    const url = this.request;
    const responce = await fetch(url);
    const data = await responce.json();

    data.items.forEach(item => this.videoInfo.id.push(item.id.videoId));
    this.videoInfo.nextPageToken = data.nextPageToken;
  }

  async extractVideoInfo() {
    await this.takeData();
    const url = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=${this.videoInfo.id.join(',')}&part=snippet,statistics`;
    const responce = await fetch(url);
    const data = await responce.json();
    data.items.forEach((item) => {
      this.videoInfo.titles.push(item.snippet.title);
      this.videoInfo.thumbnails.push(item.snippet.thumbnails.medium.url);
      this.videoInfo.descriptions.push(item.snippet.description);
      this.videoInfo.channelTitles.push(item.snippet.channelTitle);
      this.videoInfo.uploadDates.push(item.snippet.publishedAt);
      this.videoInfo.viewCounts.push(item.statistics.viewCount);
    });
    return this.videoInfo;
  }
}
