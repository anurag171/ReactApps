import React,{useState,useEffect} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem';
import DUMMYMEALS from './dummymeal';


const AvailableMeals = (props) => {
    
     const [isLoaded,setIsLoaded] = useState(false);
     const [mealsList,setMealsList] = useState([]); 
       

     useEffect(() => {
         console.log("render first");
        fetch('http://127.0.0.1:8083/v1/available-items/')
          .then(results => results.json())
          .then(data => {
            console.log(data);
             for(var x of data){
                let expensevar = {
                    id: x.id,
                    name: x.name,
                    price: x.price,
                    amount: x.amount,
                    description: x.description
                  }
                  DUMMYMEALS.push(expensevar);                
                  setMealsList(DUMMYMEALS.map(meal=><MealItem 
                    id={meal.id}
                    key={meal.id}
                    name ={meal.name}
                    description={meal.description}
                    price={meal.price}    
                    />)); 
            };  
      setIsLoaded(true);
          });
      }, []); // Pass empty array to only run once on mount. 

     
    
     /* const mealsList =  DUMMYMEALS.map(meal=><MealItem 
        id={meal.id}
        key={meal.id}
        name ={meal.name}
        description={meal.description}
        price={meal.price}    
        />);  */
    

    
    return <section className={classes.meals}>
        <Card>
        <ul>
           {mealsList}
        </ul>
        </Card>
        </section>
}

export default AvailableMeals;