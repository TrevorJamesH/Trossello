import React, {Component} from 'react'
import Form from '../Form'
import Button from '../Button'
import './CardModal.sass'

export default class Label extends Component {
  constructor(){
    super()
  }

  render(){
    const { name, color } = this.props.label
    console.log('Label props',this.props)
    return(
      <div className="BoardShowPage-Card-box" style={{backgroundColor: color}}>
        {name}
      </div>
    )
  }
}
