import React from 'react'
import image from './image.jpg'
function Home(props){
    return(
        <div className=" text-center mt-5">
        <p className="h3 text-center">Welcome to ticket-master app</p>
        <img className = "ml-4" src={image} alt="Images of tickets"/>
        </div>
    )
}
export default Home