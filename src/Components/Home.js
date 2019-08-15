import React from 'react'
import {graphql}  from 'react-apollo'
import gql from 'graphql-tag'
import { graphCmsImageUrl } from '../lib'
import { Link } from 'react-router-dom'
import { Card, Image,Label,Button} from 'semantic-ui-react'
import './Home.css'
const PRODUCTS_PER_PAGE = 4

    const Home = ({ data: { loading, error, products, productsConnection, networkStatus }, loadMoreProducts }) => {
      if (error) return <h1>Error fetching posts!</h1>
      if (products && productsConnection){
        const areMoreProducts = products.length < productsConnection.aggregate.count
        return (
          <section>
            {products.map(product => (
               <Card key={`product-${product.id}`}  className='card'>
               <div className='product-image'>
               { product.image.length > 0 ? (
               <a href='#'>
               <Image
               style={{padding:'5px'}}
                 alt={product.name}
                 src={graphCmsImageUrl(product.image[0].handle, {height:300, width: 300, fit: 'crop'})}
               /></a> ) : (<a href='#'> <Image src='https://media.springernature.com/lw410/springer-cms/rest/v1/img/10046734/v2/4by3?as=jpg' style={{padding:'5px'}}/></a> ) }
               </div>
                 <Link to={`/product/${product.slug}`} className='Product-link'>
                  <h3>{product.name}</h3>
                </Link>
 
               {/* <div className='Product-tags'>
                 {product.tags.map(tag => {
                   return <a href='#'><Label  key={tag.slug} to={`/tag/${tag.slug}`} style={{margin:'5px'}} >
                     {tag.name}
                   </Label></a>
                 })}
               </div> */}
               <Card.Description style={{margin:'8px'}}>
               <strong>Product Detail:</strong><br/><span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren</span> 
               </Card.Description>
                <div className='Product-company u-pull-right' style={{margin:'8px'}}><strong>{product.company ? product.company.name : ''}</strong></div> 
           </Card>
            ))}
          <div className='Home-showMoreWrapper'>
            {areMoreProducts
              ? <button className='Home-button' disabled={loading} onClick={() => loadMoreProducts()}>
                {loading ? 'Loading...' : 'Show More Products'}
              </button>
              : ''}
          </div>
        </section>
  
        )
      }
      return <h2>Loading products...</h2>
    }
    
    export const products = gql`
    query products($first: Int!, $skip: Int!) {
      products(first: $first, skip: $skip, orderBy: premium_DESC) {
        id
        name
        slug
        tagLine
        premium
        image {
          handle
        }
        tags {
          name
          slug
        }
        company {
          name
        }
      },
      productsConnection {
        aggregate {
          count
        }
      }
    }
  `
  
    
  export const productsQueryVars = {
    skip: 0,
    first: PRODUCTS_PER_PAGE
  }
  
  export default graphql(products, {
    options: {
      variables: productsQueryVars
    },
    props: ({ data }) => ({
      data,
      loadMoreProducts: () => {
        return data.fetchMore({
          variables: {
            skip: data.products.length
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return Object.assign({}, previousResult, {
              products: [...previousResult.products, ...fetchMoreResult.products]
            })
          }
        })
      }
    })
  })(Home)
  