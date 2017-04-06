// import CommentBox from './../../src/components/CommentBox.react'
// import { renderComponent, expect } from './../test_helper'

// describe('CommentBox.react.js', () => {
//   let component
//   //run before every it statement
//   beforeEach(() => {
//     //best practice to start fresh for every test
//     component = renderComponent(CommentBox)
//   })

//   it('exists', () => {
//     expect(component).to.exist
//   })
//   it('has the class "comment-box"', () => {
//     expect(component).to.have.class('comment-box')
//   })
//   it('has a textarea', () => {
//     expect(component.find('textarea')).to.exist
//   })

//   describe('entering text', () => {
//     //this one gets run after the top level one, and it only applies to this describe block
//     beforeEach(() => {
//       component.find('textarea').simulate('change', 'new comment')
//     })
//     it('shows text that is entered', () => {
//       expect(component.find('textarea')).to.have.value('new comment')
//     })
//     it('clears text on submit', () => {
//       // component.find('button').simulate('click')
//       component.simulate('submit') //might not be good because requires the component to be a form?
//       expect(component.find('textarea')).to.have.value('')
//     })
//   })

//   describe('Submit Button', () => {
//     it('exists', () => {
//       expect(component.find('button')).to.exist
//     })
//     it('has correct text', () => {
//       expect(component.find('button')).to.contain('Submit Comment')
//     })
//   })
// })
