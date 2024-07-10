import React, { useEffect, useState } from "react";
import images from "./images.json";
import { getImages, searchImages } from "./api";
import "./App.css";
import addImage from "./addImage.png";

const App = () => {
  const [initialImages, setInitialImages] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    setInitialImages(images.resources);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setInitialImages(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    };
    fetchData();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    const responseJson = await searchImages(searchValue, nextCursor);
    setInitialImages(responseJson.resources);
    setNextCursor(responseJson.next_cursor);

    setSearchValue("");
  };

  const resetForm = async () => {
    const responseJson = await getImages();
    setInitialImages(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    setSearchValue("");
  };

  const imageHandler = (e) => {
    let newImage = URL.createObjectURL(e.target.files[0]);
    let newImages1 = [...newImages];
    newImages1.push(newImage);
    setNewImages(newImages1);
  };

  const addingImage = () => {
    document.getElementById("inputImage").click();
  };

  console.log(initialImages);
  console.log(newImages);

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
      <form onSubmit={formSubmit} style={{ textAlign: "center", margin: "1%" }}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required="required"
          placeholder="Enter search value"
        />{" "}
        <button type="submit">Submit</button>{" "}
        <button onClick={resetForm} type="button">
          Clear
        </button>
      </form>
      <div className="img_grid">
        {initialImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image.url} alt={image.public_id} />
            </div>
          );
        })}
        {newImages
          ? newImages.map((image, idx) => {
              return (
                <div key={idx}>
                  <img src={image} alt="new" title={`image${idx + 1}`} />
                </div>
              );
            })
          : ""}
        <button onClick={addingImage}>
          <img
            src={addImage}
            alt="Add"
            title="Add Image"
            width={50}
            height={60}
          />
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={imageHandler}
          id="inputImage"
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default App;
