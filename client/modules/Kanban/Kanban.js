import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import styles from './Kanban.css';

const Kanban = (props) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.hTitle}>Tablica Kanban</h3>
      <button className={styles.AddLane} onClick={() => props.createLane({ name: 'New lane',}) }>Add lane</button>
      <Lanes lanes={props.lanes}/>
    </div>
  );
};

Kanban.need = [() => { return fetchLanes(); }];

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes), 
});

const mapDispatchToProps =  {
  createLane: createLaneRequest,
  fetchLanes
};

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Kanban);

