import { useState, useEffect } from "react";

function Ratings() {

    const [ratings, setRatings] = useState(null);
    
    useEffect(() => {
        async function getRatingsPage() {
            const requestOptions = {
                method: 'Get',
                headers: { 'Content-Type': 'application/json'}
              };
            
              const response = await fetch("http://localhost:5266/", requestOptions);
              setRatings(await response.text());
        }
        getRatingsPage();
    }, [])

    return(
        <div>{ratings}</div>
    );
}

export default Ratings;