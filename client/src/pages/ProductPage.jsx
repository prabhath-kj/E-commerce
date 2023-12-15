import React from 'react'
import {useParams} from "react-router-dom"

const ProductPage = () => {
    const {fileName} =useParams()
  return (
    <div>
      {fileName}
    </div>
  )
}

export default ProductPage
