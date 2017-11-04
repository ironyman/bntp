import { Record } from 'immutable';

import { THEMES } from './Themes';

export default class AppPreference extends Record({
  indentFolders: true,
  showTopSites: false,
  showBookmarks: true,
  theme: THEMES.getDefault(),
}) {
  static DEFAULT = new AppPreference()
}
