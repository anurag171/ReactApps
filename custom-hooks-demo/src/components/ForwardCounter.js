import useCounter from '../hooks/use-counter';
import Card from './Card';

const ForwardCounter = () => {
  //const [counter, setCounter] = useState(0);
  const counter = useCounter(true); 

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
