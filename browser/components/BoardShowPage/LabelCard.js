import React, {Component} from 'react'
import $ from 'jquery'
import Form from '../Form'
import Button from '../Button'
import DialogBox from '../DialogBox'
import Label from './Label'
import LabelCreate from './LabelCreate'
import PopoverMenuButton from '../PopoverMenuButton'
import Icon from '../Icon'
import './CardModal.sass'

export default class LabelCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      boardId: this.props.board.id,
      title: this.props.card.content,
      labels: this.props.board.labels
    }
    this.changeLabelHandler = this.changeLabelHandler.bind(this)
  }

  changeLabelHandler(event){
    event.preventDefault()
    if (this.state.title.replace(/\s+/g,'') === '') { return }
    $.ajax({
      method: 'post',
      url: `/api/boards/${this.state.boardId}/lists/${this.state.listId}/cards`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({content: this.state.title}),
    }).then( card => {
      $.ajax({
        method: 'post',
        url: `/api/cards/${card.id}/move`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({boardId: card.board_id, listId: card.list_id, order: this.state.order}),
      }).then( () => {
        boardStore.reload()
        this.props.onClose()
      })
    })
  }

  createLabel( newLabel ){
    let state = this.state
    state.labels.push( newLabel )
    this.setState(state)
  }

  labelClickHandler( index ){
    console.log('adding label ',this.state.labels[index].name,' to card ',this.props.card.content)
  }

  buildLabelList(){
    return this.state.labels.map( (label, index) => {
      return <Label label={label} key={index} index={index} onClick={this.labelClickHandler.bind(this)}/>
    })
  }

  render(){
    const labelCreate = <LabelCreate board={this.props.board} createLabel={this.createLabel.bind(this)}/>
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


      <PopoverMenuButton className="CardModal-controls-copy" type="default" popover={labelCreate}>
        <Icon type="plus" /> New Label
      </PopoverMenuButton>
      </div>
    </DialogBox>
  }
}
