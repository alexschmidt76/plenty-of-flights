import React, {useState, useContext, Suspense} from 'react'
import { useNavigate } from "react-router"
import Button from 'react-bootstrap/Button';
import Spinner from './spinner';
import {CurrentUser} from '../context/CurrentUser';
import { DataContext } from '../context/dataContext'

// import FlightPath from './flightPath';
import Map from './Map';

export default function SearchResults () {

  const navigate = useNavigate()
  const {currentUser} = useContext(CurrentUser)
  const [state, setState]=useState('')

  const {dap, aap} = useContext(DataContext)

  async function handleSave(e) {
		e.preventDefault()
    if(currentUser){
      setState('')
      // https://plenty-of-flights-backend.vercel.app
		  await fetch(`http://localhost:3001/users/${currentUser.user_id}/flight-paths`, {
			  method: 'POST',
			  headers: {
				  'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({dap, aap})
		  })
		  navigate(`/`)
	  } else {
      setState("Please login/sign up to be able to save your search")
    }
  }

    const renderFlight = () => {
          return(
            <Suspense fallback={<Spinner />}>
              <Map/>
            </Suspense>
          )
        }
      
    return(
        <div className="homepage">
            {renderFlight()}
            <Button variant="primary" type="submit" onClick={e => handleSave(e)}>
                  Save Flight
              </Button>
              {state===''?null:<p>{state}</p>}
        </div>
    )
}