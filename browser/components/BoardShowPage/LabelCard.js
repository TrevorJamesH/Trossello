import React, {Component} from 'react'
import $ from 'jquery'
import Form from '../Form'
import Button from '../Button'
import DialogBox from '../DialogBox'
import Label from './Label'
import LabelCreate from './LabelCreate'
import LabelEdit from './LabelEdit'
import PopoverMenuButton from '../PopoverMenuButton'
import Icon from '../Icon'
import './CardModal.sass'

export default class LabelCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      boardId: this.props.board.id,
      title: this.props.card.content,
      labels: this.props.board.labels,
      labelPane: 'Select Label',
      editing: null
    }
    this.changePane = this.changePane.bind(this)
  }

  createLabel( newLabel ){
    let state = this.state
    state.labels.push( newLabel )
    this.setState(state)
  }

  labelClickHandler( index ){
    this.props.toggleLabel( index )
  }

  editLabel( index ){
    let state = this.state
    state.editing = index
    this.setState(state)
    this.changePane( 'Edit Label' )
  }

  deleteLabel( index ){
    $.ajax({
      method: "POST",
      url: `/api/labels/${this.props.board.labels[index].id}/delete`,
    })
  }

  buildLabelList(){
    return this.state.labels.map( (label, index) => {
      return(
      <Label label={label}
        key={index}
        index={index}
        onClick={this.labelClickHandler.bind(this)}
        editLabel={this.editLabel.bind(this)}
        deleteLabel={this.deleteLabel.bind(this)}
      />)
    })
  }

  changePane( pane ){
    let newState = this.state
    newState.labelPane = pane
    this.setState(newState)
  }

  onClose(){
    this.changePane('Select Label')
    this.props.reload()
  }

  render(){
    const labelPane = {
      'Edit Label'  : <LabelEdit index={this.state.editing} card={this.props.board.labels[this.state.editing]} board={this.props.board} onClose={this.onClose.bind(this)}/>,
      'Create Label': <LabelCreate board={this.props.board} createLabel={this.createLabel.bind(this)} onClose={this.onClose.bind(this)}/>,
      'Select Label': null
    }

    if (this.state.boards === null){
      return <DialogBox className="CardModal-CopyCardDialog" heading='Labels' onClose={this.props.onClose}>
        Loading…
      </DialogBox>
    }

    const labelList = this.buildLabelList()

    const labelSelector =
      <div className='CardModal-CopyCardDialog-SelectContainer'>
        <label className='CardModal-CopyCardDialog-SelectContainer-Label'> List </label>
      </div>

    return <DialogBox className="CardModal-CopyCardDialog" heading='Labels' onClose={this.props.onClose}>
      <div>
      {labelList}

      <Button className="CardModal-controls-copy" type="default" onClick={()=>this.changePane('Create Label')}>
        <Icon type="plus" /> New Label
      </Button>
        {labelPane[this.state.labelPane]}
      </div>
    </DialogBox>
  }
}
