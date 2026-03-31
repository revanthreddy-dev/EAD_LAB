import React from "react";
import { useState, useEffect } from "react";

function GetData() {
    const URL = "https://jsonplaceholder.typicode.com/users"

    const [printData, setPrintData] = useState([]);

   const apiCalls = async () => {
    const response = await fetch(URL);
    console.log(response)
    const data = await response.json();
    console.log(data)
    setPrintData(data);
   };

   useEffect(() => {
    apiCalls();
   }, []);

   return (
    <div>
        <h1>Data</h1>
        {
            printData.map(function(item){
                return(
                    <div key={item.id}>
                        <h2 style={{fontWeight:"bold"}}>{item.name}</h2>
                        <h3>Email :{item.email}</h3>
                        <h3>Ph.No :{item.phone}</h3>
                        <h3> Website = {item.website}</h3>
                        <h3>Company : {item.company.name}</h3>
                        <h3>City ={item.address.city}</h3>
                        <h3>Zipcode = {item.address.zipcode}</h3>
                        <h3>Street = {item.address.street}</h3>
                        <h3>Suite = {item.address.suite}</h3>

                    </div>
                )
            })
        }
    </div>
   );
}
export default GetData;
