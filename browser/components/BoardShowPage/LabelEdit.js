import React, { Component } from 'react'
import $ from 'jquery'
import '../CreateBoardPopover.sass'
import Link from '../Link'
import Icon from '../Icon'
import Form from '../Form'
import Button from '../Button'
import DialogBox from '../DialogBox'
import boardStore from '../../stores/boardStore'


export default class LabelEdit extends Component {

  static contextTypes = {
    redirectTo: React.PropTypes.func,
  }

  constructor(props){
    super(props)
    this.state = {
      color: this.props.card.color,
      name: this.props.card.name
    }
    this.updateColor = this.updateColor.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    this.refs.name.focus()
  }

  updateColor(event, color){
    if (event.target === this.refs.color)
      color = event.target.value
    this.setState({color})
  }

  onClick(event){
    event.preventDefault()
    // this.props.newLabel(event)
  }

  onSubmit(event){
    console.log('label create props', this.props)
    console.log('label create state', this.state)
    event.preventDefault()

    const label = {
      name: this.refs.name.value,
      color: this.refs.color.value,
      board_id: this.props.board.id
    }
    if (label.name.replace(/\s+/g,'') === '' || !colors.includes(label.color)) return
    $.ajax({
      method: "POST",
      url: `/api/labels/${this.props.board.labels[this.props.index].id}`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(label),
    })
    .then( label => {
      this.props.onClose()
    })
  }

  reset(){
    if (this.refs.name) this.refs.name.value = ''
    if (this.refs.color) this.refs.color.value = ''
  }

  render(props){
    const colorBoxes = colors.map(color =>
      <ColorBox key={color} color={color} onClick={this.updateColor} />
    )

    return <DialogBox
      heading="Edit Label"
      onClose={this.props.onClose}
      className="CreateBoardPopover"
    >
      <Form onSubmit={this.onSubmit}>
        <label>
          <div>Name</div>
          <input type="text" ref="name" value={this.props.card.name}/>
        </label>
        <div className="CreateBoardPopover-createBackgroundColor">
          {colorBoxes}
        </div>
        <label>
          <input
            type="text"
            ref="color"
            placeholder="#2E86AB"
            value={this.state.color || ''}
            onChange={this.updateColor}
          />
        </label>
        <Button type="primary" action="submit">Save</Button>
      </Form>
    </DialogBox>
  }
}

const ColorBox = (props) => {
  const {onClick, color} = props
  return <div
    onClick={(event)=>{ onClick(event, color) }}
    style={{backgroundColor: color}}
    className="CreateBoardPopover-createBackgroundColor-box"
  />
}

const colors = [
  "#0079bf",
  "#61bd4f",
  "#f2d600",
  "#ffab4a",
  "#eb5a46",
  "#c377e0",
  "#ff80ce",
  "#00c2e0"
]
