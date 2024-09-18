import React from 'react'

    export default function guide() {
        return (
          <div 
            style={{
              backgroundImage: "url('/img/dash.jpg')",   
              backgroundSize: 'cover',                  
              backgroundPosition: 'center',              
              backgroundRepeat: 'no-repeat',             
              height: '100vh',                          
              width: '100%',                            
              display: 'flex',                           
              alignItems: 'center',                      
              justifyContent: 'center'                  
            }}
          >
            <div>
              <h1 style={{ color: '#1E201E' }}></h1>
              <a href="/travelagent/createpost">
                <button color={"#1E201E" } className='button' 
                style={{ position : 'relative' , top : '320px' , left : '155%'  }}>
                  Create Post
                </button>
              </a>
      
              <a href="/allGuides">
                <button color={"#1E201E" } className='button'
                 style={{ position : 'relative' , top : '320px' , left : '170%'  }}
                >
                  View Booking Tourist
                </button>
              </a>
            </div>
          </div>
        );
      }