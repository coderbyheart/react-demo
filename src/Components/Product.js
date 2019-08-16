import React from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {graphCmsImageUrl} from '../lib'

const Product = ({data:{loading,error,product}}) =>{
  if(error) return <div>Error</div>
  if (loading) return <div>Loading ...</div>
  if(!loading) return (
    <article>
        <h1>{product.name}</h1>
        <div>
        { product.image.length > 0 ? (
          <img
            alt={product.name}
            src={graphCmsImageUrl(product.image[0].handle, {height:650, width: 366, fit: 'crop'})}
          /> ) : ( <img /> ) }
        </div>
    </article>
  )
}

export const singleProduct = gql`
query singleProduct($slug: String!) {
  product(where: {slug: $slug}) {
      id
      slug
      name
      image {
        handle
      }
    }
  }
`

export default graphql(singleProduct,{
    options: ({ match }) => ({
        variables: {
          slug: match.params.slug
        }
    })
})(Product)

