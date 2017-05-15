import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';

import { TileFolderItem } from '../components/Tile';

import { Bookmark } from '../models';

class BookmarkItem extends React.Component {
  static propTypes = {
    bookmark: PropTypes.instanceOf(Bookmark).isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  render() {
    const { bookmark, connectDragSource, isDragging, connectDropTarget, isOver } = this.props;
    return connectDropTarget(connectDragSource(
      <span>
        <TileFolderItem link={bookmark.link}>
          {bookmark.title}
        </TileFolderItem>
      </span>
    ));
  }
}

const dragSource = {
  beginDrag(props) {
    console.log('beginDrag', props);
    return {};
  }
};

const dropTarget = {
  hover(props, monitor, component) {
    console.log('hover', props, monitor, component);
  },
  drop(props) {
    console.log('drop', props);
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

export default DropTarget('BOOKMARK', dropTarget, collectTarget)
  (DragSource('BOOKMARK', dragSource, collectSource)(BookmarkItem));
