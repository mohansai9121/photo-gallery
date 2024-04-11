import React, { useEffect, useState } from 'react'
import images from './images.json'
import { getImages, searchImages } from './api'
import './App.css'

const App = () => {
  const [initialImages, setInitialImages] = useState([])
  const [nextCursor, setNextCursor] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  useEffect(()=>{
    setInitialImages(images.resources)
  }, [])
  useEffect(()=>{
    const fetchData = async ()=>{
      const responseJson = await getImages()
      setInitialImages(responseJson.resources)
      setNextCursor(responseJson.next_cursor)
    }
    fetchData()
  },[])

  const handleLoadMore = async ()=>{
    const responseJson = await getImages(nextCursor)
    setInitialImages((currentImages)=>[
      ...currentImages,
      ...responseJson.resources
    ])
    setNextCursor(responseJson.next_cursor)
  }

  const formSubmit = async (e)=>{
    e.preventDefault()
    const responseJson = await searchImages(searchValue, nextCursor)
    setInitialImages(responseJson.resources)
    setNextCursor(responseJson.next_cursor)

    setSearchValue('')
  }
  const resetForm = async ()=>{
    const responseJson = await getImages()
    setInitialImages(responseJson.resources)
    setNextCursor(responseJson.next_cursor)
    setSearchValue("")
  }
  console.log(initialImages)
  return (
    /*<div className='img_grid'>
      {initialImages.map((image,index)=>{
        return(
          <div key={index}>
            <img src={image.url} alt={image.public_id}/>
          </div>
        )
      })}
    </div>*/
    <>
      <form onSubmit={formSubmit} style={{textAlign:'center', margin:'1%'}}>
        <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} required='required' placeholder='Enter search value'/>
        {" "}<button type='submit'>Submit</button>{" "}
        <button onClick={resetForm} type='button'>Clear</button>
      </form>
      <div className='img_grid'>
        {initialImages.map((image, index)=>{
          return(
            <div key={index}>
              <img src={image.url} alt={image.public_id}/>
            </div>
          )
        })}
      </div>
      <div className='footer'>
        <button type='button' onClick={handleLoadMore} style={{margin:'1%'}}>Load More</button>
      </div>
    </>
  )
}

export default App
