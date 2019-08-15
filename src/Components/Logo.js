import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const Companies = ({ data: { loading, error, companies } }) => {
  if (error) return <h1>Error fetching authors!</h1>
  if (!loading) {
    return (
      <div>
        {companies.map(company => (
          <div className='About-author' key={company.id}>
            <div className='About-infoHeader'>
              { company.logo ? (
              <img
                className='About-img'
                alt={company.name}
                src={`https://media.graphcms.com/resize=h:60/${company.logo.handle}`}
              />) : (
              <h1>{company.name}</h1>
            )}
            </div>
          </div>
        ))}
      </div>
    )
  }
  return <h2>Loading author...</h2>
}

export const companies = gql`
  query companies {
    companies {
      id
      name
      logo {
        handle
      }
    }
  }
`

export default graphql(companies)(Companies)