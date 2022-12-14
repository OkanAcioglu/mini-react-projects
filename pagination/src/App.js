import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'

//! When it comes to pagination there is 2 option...
//* Pagination on frontend --> request data whether it is 30 or 100 --> Then paginate it in our end
//* Pagination on a server --> request different pages from the server --> Already paginated on the server --> setting request for those different pages
//? This project is pagination on frontend
function App() {
  const { loading, data } = useFetch()
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])

  //! When loading change re-run the callback
  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  const handlePage = (index) => {
    setPage(index)
  }

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = data.length - 1
      }
      return prevPage
    })
  }

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'}</h1>
        <div className='underline'></div>
        <section className='followers'>
          <div className='container'>
            {followers.map((follower) => {
              return <Follower key={follower.id} {...follower} />
            })}
          </div>
          {/* Buttons displayed even before loading... Create a conditional rendering so that display buttons if we are not loading */}
          {!loading && (
            <div className='btn-container'>
              <button className='prev-btn' onClick={prevPage}>
                Prev
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`page-btn ${
                      index === page ? 'active-btn' : null
                    }`}
                    onClick={() => {
                      handlePage(index)
                    }}
                  >
                    {index + 1}
                  </button>
                )
              })}
              <button className='next-btn' onClick={nextPage}>
                Prev
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
