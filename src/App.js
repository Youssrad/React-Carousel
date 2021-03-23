import { Fragment } from 'react';
import FunctionalCarousel from './components/functionalCarousel';

const children = [1, 2, 3, 4, 5, 6];
const delay = 5000;

function App() {
  return (
    <Fragment>
      <FunctionalCarousel children={children} />
    </Fragment>
  );
}

export default App;
