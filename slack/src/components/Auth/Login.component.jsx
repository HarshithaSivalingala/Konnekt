import React, { useState } from 'react'
import {
  Grid,
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Message,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../../konnect-logo.png'
import firebase from 'firebase'
import './Login.css'
import './Auth.css'
import video from './vi.mp4'




const Login = () => {
  let user = {
    email: '',
    password: '',
  }

  let errors = []

  const [userState, setuserState] = useState(user)
  const [isLoading, setIsLoading] = useState(false)
  const [errorState, seterrorState] = useState(errors)

  const handleInput = (event) => {
    let target = event.target
    setuserState((currentState) => {
      let currentuser = { ...currentState }
      currentuser[target.name] = target.value
      return currentuser
    })
  }

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: 'Please fill in all fields' })
      )
      return false
    }
    return true
  }

  const isFormEmpty = () => {
    return !userState.password.length || !userState.email.length
  }

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>)
  }

  const onSubmit = (event) => {
    seterrorState(() => [])
    if (checkForm()) {
      setIsLoading(true)
      firebase
        .auth()
        .signInWithEmailAndPassword(userState.email, userState.password)
        .then((user) => {
          setIsLoading(false)
          console.log(user)
        })
        .catch((serverError) => {
          setIsLoading(false)
          seterrorState((error) => error.concat(serverError))
        })
    }
  }

  return (
    <>
  

   
      <div class='container'>
      <video autoPlay loop  muted id="video" className='video'>
      <source src={video} type= 'video/mp4'/>
      </video>
        <h1>KONNEKT</h1>
      </div>
      <div className='forms'>
        <Grid verticalAlign='middle' textAlign='center' className='grid-form-l'>
          <Grid.Column style={{ maxWidth: '380px' }}>
            <Header icon as='h2' color='teal'>
              <Icon name='user circle' />
              Log in to KONNEKT
            </Header>
            <Form onSubmit={onSubmit}>
              <Segment Raised>
                <Form.Input
                  name='email'
                  value={userState.email}
                  icon='mail'
                  iconPosition='left'
                  onChange={handleInput}
                  type='email'
                  placeholder='User Email'
                />
                <Form.Input
                  name='password'
                  value={userState.password}
                  icon='lock'
                  iconPosition='left'
                  onChange={handleInput}
                  type='password'
                  placeholder='User Password'
                />
              </Segment>
              <Button disabled={isLoading} loading={isLoading}>
                Login
              </Button>
       
              <br />
              <br />
              
              <tb/>
              <Button color='google plus' onClick={() => {
          const googleAuth = 
          new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuth); }}>
                  <Icon name='google plus' /> Sign in with Google
              </Button>
              
            </Form>
            {errorState.length > 0 && (
              <Message error>
                <h3>Errors</h3>
                {formaterrors()}
              </Message>
            )}
            <Message>
              Don't have an account? <Link to='/register'> Register here </Link>
            </Message>
          </Grid.Column>
        </Grid>
        
      </div>
      
    </>
  )
}

export default Login