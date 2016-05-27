import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { increase, decrease } from '../../actions/count';

function Home({ number, increase, decrease }) {
  return (
    <div>
      Some state change:
      { number }

      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
  );
}

export default connect(
  state => ({ number: state.count.number }),
  { increase, decrease }
)(Home);
