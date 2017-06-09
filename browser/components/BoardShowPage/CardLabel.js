import React, { Component } from 'react'

export default class CardLabels extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const labels = this.props.labels.map( (label, index) => {
      if( this.props.card.labels.includes(label.id)){
        return (<span className="label" key={index} style={{backgroundColor: label.color}}>{label.name}</span>)
      }
    })

    return(
      <div>
        {labels}
      </div>
    )
  }
}
