import { useState,useEffect } from "react";



//custom function must start with word 'use'


const useCounter = (forwards = true) => {
    const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        if(forwards){
            setCounter((prevCounter) => prevCounter + 1);
        }else{
            setCounter((prevCounter) => prevCounter - 1);
        }
      
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
};

export default useCounter