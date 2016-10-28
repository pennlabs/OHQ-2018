import { renderComponent, expect } from './../test_helper'
import App from './../../src/components/app.react'

//group together similar tests
describe('App.react.js', () => {

  let component
  beforeEach(() => {
    component = renderComponent(App)
  })

  //create an instance of app
  //use it to test a single attribute of a target
  // it('shows a comment box', () => {
  //   expect(component.find('.comment-box')).to.exist
  // })
})
