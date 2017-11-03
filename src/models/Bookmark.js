import { Record } from 'immutable';

function domainName(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

export default class Bookmark extends Record({
  id: null,
  title: null,
  url: null,
  icon: null,
}) {
  canEditTitle = true
  canEditUrl = true

  constructor(record) {
    const url = domainName(record.url);
    super({
      ...record,
      icon: `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`,
    });
  }


  merge(map) {
    return new Bookmark(super.merge(map).toJS());
  }
}
