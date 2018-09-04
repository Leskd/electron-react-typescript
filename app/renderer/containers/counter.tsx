import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StoreState } from '../types';
import Counter from '../components/Counter';
import { counterActions, increment, decrement } from '../actions/counter';

function mapStateToProps(state: StoreState) {
  return {
    count: state.counter.count
  };
}

function mapDispatchToProps(dispatch: Dispatch<counterActions>) {
  return bindActionCreators({increment, decrement}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
