import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd/modules/backends/HTML5';
import update from 'react/lib/update';
import Controls from './Controls';
import OrangeBox from './OrangeBox';
import Basket from './Basket';
import Dish from './Dish';
import Stats from './Stats';
import { areaTheme } from './Themes';
import { connect } from 'redux/react';

const styles = {
  container: {
    backgroundColor: '#ffad00',
    color: '#000',
    height: "100%"
  },
  row: {
      display: "flex",
      height: areaTheme.height + areaTheme.margin
  }
}

@connect(state => ({
    oranges: state.oranges
}))
@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
        oranges: this.props.oranges,  // From flux
        basket: 0,
        dish: 0,
        totalDays: 0
    };
  }

  render() {
    const { dispatch } = this.props;
    const orangeActions = bindActionCreators(OrangeActions, dispatch);

    return <div style={styles.container}>
      <div style={styles.row}>
          <Basket actions={orangeActions} />
          <Controls actions={orangeActions} />
          <Dish actions={orangeActions} />
      </div>
      <div style={styles.row}>
          <Stats totalDays={this.state.totalDays} />
      </div>
    </div>;
  }

  onBasketDrop() {
      this.increment('basket');
      this.decrement('oranges');
  }

  onDishDrop() {
      this.increment('dish');
      this.decrement('oranges');
  }

  onNewDay() {
      this.increment('totalDays');
  }

  increment(field) {
      this.setState({
        field: this.state[field] += 1
      });
  }

  decrement(field) {
      this.setState({
        field: this.state[field] -= 1
      });
  }
}