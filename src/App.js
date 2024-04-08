import React, { useEffect, useState } from 'react'
import images from './images.json'
import './App.css'

const App = () => {
  const [initialImages, setInitialImages] = useState([])
  useEffect(()=>{
    setInitialImages(images.resources)
  }, [])
  console.log(initialImages)
  return (
    <div>
      {initialImages.map((image,index)=>{
        return(
          <div key={index} className='img_grid'>
            <img src={image.url} alt={image.public_id}/>
          </div>
        )
      })}
    </div>
  )
}

export default App
