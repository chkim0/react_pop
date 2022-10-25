import Anime from "../../asset/Anime"
import React, { useRef } from "react"


// const btn = {
//     position: 'absolute',
//     top: 120,
//     left: 100, 
// }
const path = process.env.PUBLIC_URL;

export default function Visual() {

    const box = useRef(null);


    return (
        <figure id="visual" className="myScroll">
                <div className="inner">
                     <video src={`${path}/img/main_vid.mp4`}
                     autoplay loop />
                     <h1>We are making <br/>
                        real life. 
                    </h1>
                    <a href="#">read more about us</a>
                    
                    <div className="bbox"></div>
                    </div>
                
          
            {/* <button
              style ={btn}
              onClick={()=>{
                new Anime(window,{
                    prop: 'scroll',
                    value : 1000,
                    duration : 500,
                    
                })
              }} >button</button> */}
            <div className='box' ref={box}></div>
        </figure>
    )
}