import React from 'react'
import './Card.css';

export class Card extends React.Component{
    render(){
        return <div className='card'>
        <div className='cardLeft'>
        <div className='userId'>{this.props.userId}</div>
        <div className='userName'><span className='title'>Name:</span><br/>{this.props.userName}</div>
        <div className='gitHubUrl'><span className='title'>Git Hub Link:</span><br/><a href={this.props.gitHubUrl} target='_blank'>{this.props.gitHubUrl}</a></div>
        </div>
        <hr/>
        <div className='cardRight'><img height='150px' width='150px' src={this.props.avtarUrl} /></div>
        </div>
    }
} 