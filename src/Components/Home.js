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
          <ul className='Product-list row'>
            {products.map(product => (
              <li className='Product-card four columns' key={`product-${product.id}`}>
                <div className='Product-image'>
                  { product.image.length > 0 ? (
                  <img
                    alt={product.name}
                    src={graphCmsImageUrl(product.image[0].handle, {height:300, width: 300, fit: 'crop'})}
                  /> ) : ( <img /> ) }
                </div>
                <div className="Product-details">
                <Link to={`/product/${product.slug}`} className='Product-link'>
                  <h3>{product.name}</h3>
                </Link>
                  <div className='Product-description'>
                    {product.tagLine}
                  </div>
                  {/* <div className='Product-tags'>
                    {product.tags.map(tag => {
                      return <Link className='tag' key={tag.id} to={`/tag/${tag.slug}`} >
                        {tag.name}
                      </Link>
                    })}
                  </div> */}
                  <div className='Product-company u-pull-right'>{product.company ? product.company.name : ''}</div>
                </div>
              </li>
            ))}
          </ul>
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
  