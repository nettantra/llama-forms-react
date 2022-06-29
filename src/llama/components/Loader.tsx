import React from 'react'


const Loader = () => {
    const loader:object = {
        height: '12px',
        width: '12px',
        borderRadius: '50%',
        border: "2px solid #f3f3f3",
        borderTop: "2px solid #3498db",
        borderLeft: "2px solid #3498db",
        borderBottom: "2px solid #3498db",
        WebkitAnimation: 'spin 1.5s linear infinite',      // Safari
        animation: 'spin 1.5s linear infinite',
        display: 'inline-block',
        margin: 'auto',
        position: 'relative',
        marginLeft:"10px",   
    }
    const animation =`
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    `
  return (<>
    <style>{animation}</style>
    <div style={loader}></div>
    </>
  )
}

export default Loader