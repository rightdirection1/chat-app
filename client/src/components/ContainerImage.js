import React from 'react'

function ContainerImage({image}) {
    console.log(image);
  return (
   
    <>
     {image? (<ul style={{background: "#fff", height: "150px"}}>
         <li><img id="image" alt="" src={image} /></li>
         <li>Image 2</li>
      </ul>): <></>}
      
    </>
  )
}

export default ContainerImage;
