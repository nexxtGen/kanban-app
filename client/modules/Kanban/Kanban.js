import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';

import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';//import action creator to add new lane

// Import Style
import styles from './Kanban.css';
//import styles from '../Lane/Lane.css'

const Kanban = (props) => {
  return (
    <div>
      <h3>Tablica Kanban</h3>
      <button className={styles.AddLane} onClick={() => props.createLane({ name: 'New lane',}) }>Add lane</button>
      <Lanes lanes={props.lanes} />
    </div>
  );
};
// Achtung! Wyjaśnienie i sama metoda w dalszej części kursu.
Kanban.need = [() => { return fetchLanes(); }];

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes), //v3 integration
});

const mapDispatchToProps =  {
  createLane: createLaneRequest,
  fetchLanes
};

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

export default connect( mapStateToProps, mapDispatchToProps)(Kanban);

