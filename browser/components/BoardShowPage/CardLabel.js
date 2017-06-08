import React, { Component } from 'react'

export default class CardLabels extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const labels = this.props.card.labels.map( (label, index) => {
      return(
      <span key={index} style={{backgroundColor: label.color}}>{label.name}</span>
    )
    })

    return(
      <div>
        {labels}
      </div>
    )
  }
}
