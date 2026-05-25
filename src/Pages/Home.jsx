import React from 'react'

const Home = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      textAlign: "center"
    }}>
      <h2>Welcome to website</h2>

      <img
        src="https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg"
        alt="home"
        width="500"
      />
    </div>
  )
}

export default Home