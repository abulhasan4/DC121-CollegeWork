import { useState, useEffect } from "react";

function CatFacts(){
  const [facts, setFacts] = useState(["Cats are cool", "Cats are nice"])
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
      fetch("https://cat-fact.herokuapp.com/facts")
      .then(response=>response.json())
      .then(data=>{
        setFacts(data.map(e=>e.text))
        setIsLoaded(true);
      })
      .catch(err=>console.log(err))
    }
  )

  const displayFacts = () =>{
    return facts.map(elem=>
      <li>{elem}</li>
    )
  }

  if(isLoaded){
    return(
      <ul>
        {displayFacts()}
      </ul>
    )
  }
  else{
    return(
      <img src="loading.gif" alt=""/>
    )
  }

}

export default CatFacts;
  
