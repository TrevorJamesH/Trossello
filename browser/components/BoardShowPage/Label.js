import React, {Component} from 'react'
import Form from '../Form'
import Button from '../Button'
import './CardModal.sass'
import Icon from '../Icon'
import Link from '../Link'

export default class Label extends Component {
  constructor(){
    super()
  }

  editLabel(){
    console.log('editLabel button pressed')
  }

  render(){
    const { name, color } = this.props.label
    const editLabelButton = <EditLabelButton onClick={this.editLabel} />
    return(
      <div>
        <Link className="BoardShowPage-Card-box" style={{backgroundColor: color}} onClick={()=>this.props.onClick(this.props.index)}>
          {name}
        </Link>
        {editLabelButton}
      </div>
    )
  }
}

const EditLabelButton = (props) => {
  return <Link className="penncil" onClick={props.onClick}>
    <Icon size='0' type="pencil" />
  </Link>
}
