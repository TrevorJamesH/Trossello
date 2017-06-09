import React, {Component} from 'react'
import Form from '../Form'
import Button from '../Button'
import './CardModal.sass'
import Icon from '../Icon'
import Link from '../Link'

export default class Label extends Component {
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
    this.edit = this.edit.bind(this)
    this.delete = this.delete.bind(this)
  }

  edit(event){
    event.preventDefault()
    this.props.editLabel( this.props.index )
  }

  onClick(event){
    event.preventDefault()
    this.props.onClick( this.props.index )
  }

  delete(event){
    event.preventDefault()
    this.props.deleteLabel( this.props.index )
  }

  render(){
    const { name, color } = this.props.label
    return(
      <div className="BoardShowPage-Label">
        <Link className="BoardShowPage-Label-Link" style={{backgroundColor: color}} onClick={this.onClick}>
          {name}
        </Link>
        <Link className="BoardShowPage-Label-pencil" onClick={this.edit}>
          <Icon size='0' type="pencil" />
        </Link>
        <Link className="BoardShowPage-Label-pencil" onClick={this.delete}>
          <Icon size='0' type="close" />
        </Link>
      </div>
    )
  }
}
