import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'

//! When it comes to pagination there is 2 option...
//* Pagination on frontend --> request data whether it is 30 or 100 --> Then paginate it in our end
//* Pagination on a server --> request different pages from the server --> Already paginated on the server --> setting request for those different pages
//? This project is pagination on frontend
function App() {
  const { loading, data } = useFetch()

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className='underline'></div>
        <section className='followers'>
          <div className='container'>
            {data.map((follower) => {
              return <Follower key={follower.id} {...follower} />
            })}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App