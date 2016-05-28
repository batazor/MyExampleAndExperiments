import React from 'react'
import { connect } from 'react-redux'
import Button from '../components/Button'
import { githubAuth } from '../actions/auth'

let GithubAuth = ({ onClick, dispatch }) => {
  return (
    <div>
      <Button
        style="btnThree"
        onClick={() => dispatch(githubAuth)}>
        GitHub
      </Button>
      <Button style="btnThree">LinkedIn</Button>
      <Button style="btnThree">Twitter</Button>
    </div>
  )
}

GithubAuth = connect()(GithubAuth)
export default GithubAuth
