import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Seq } from 'immutable';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { toggleFolderCollapse } from '../actions';

import { TileFolder } from '../components/Tile';
import BookmarkItem from '../components/BookmarkItem';

import { FolderPreference } from '../models';

class Bookmarks extends React.Component {
  static propTypes = {
    folders: PropTypes.instanceOf(Seq).isRequired,
    folderPreference: PropTypes.instanceOf(FolderPreference).isRequired,
  }

  render() {
    const { dispatch, folders, folderPreference } = this.props;
    return (
      <div className="Bookmarks">
        {folders.map(folder =>
          <TileFolder key={folder.id}
                      title={folder.title}
                      collapsed={folderPreference.isCollapse(folder)}
                      onToggle={collapsed => dispatch(toggleFolderCollapse(folder))}>
            {folder.bookmarks.map(bookmark =>
              <BookmarkItem key={bookmark.id} bookmark={bookmark} />
            )}
          </TileFolder>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  folderPreference: state.folderPreference,
});

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Bookmarks));
