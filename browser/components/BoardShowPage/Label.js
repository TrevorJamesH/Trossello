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
    return(
      <div className="BoardShowPage-Card-box" style={{backgroundColor: color}} onClick={()=>this.props.onClick(this.props.index)}>
        {name}
      </div>
    )
  }
}
