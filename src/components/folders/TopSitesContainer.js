import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';

import BarFolder from '../kits/BarFolder';
import BarFolderItem from '../kits/BarFolderItem';
import FloatTip from '../kits/FloatTip';

import { fetchTopSites } from '../../state/topsites/actionCreators';

class TopSitesContainer extends React.Component {
  static propTypes = {
    topSites: PropTypes.instanceOf(Seq).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(fetchTopSites());
  }

  render() {
    const { topSites } = this.props;
    return (
      <div className="TopSites">
        <BarFolder>
          {topSites.map((topSite, index) =>
            <FloatTip key={index} title={topSite.title}>
              <BarFolderItem link={topSite.link} />
            </FloatTip>
          )}
        </BarFolder>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topSites: state.topSites,
});

export default connect(mapStateToProps)(TopSitesContainer);