import React, { Component } from 'react'

import './ComicDetails.css'




class ComicDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comicItems: JSON.parse(localStorage.getItem('comicItems')),
            BasketItems: []
        }

        this.handleOnClick = this.handleOnClick.bind(this)
        // this.handleOnChange = this.handleOnChange.bind(this)
        // this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        const prevStateString = JSON.stringify(prevState.comicItems)
        const updatedStateString = JSON.stringify(this.state.comicItems)

        if (prevStateString !== updatedStateString) {
            console.log("Save this:", updatedStateString)
            localStorage.setItem('comicItems', updatedStateString)
        }
    }
    componentDidMount() {
        const savedStateFromLocalStorage = localStorage.getItem('comicItems')

        if (savedStateFromLocalStorage) {
            this.setState({
                comicItems: JSON.parse(savedStateFromLocalStorage)
            })
        }
    }
    handleOnClick(i) {
        const {
            comicItems,
        } = this.state

        const newComicItems = [...this.state.comicItems]
        newComicItems[i] = {
            ...newComicItems[i], details: !comicItems[i].details
        }
        this.setState({
            comicItems: newComicItems
        })
    }
    


    render() {
        return (
            
            <div>
                <div className="grid-container">
                    <div className="Image"><img src={this.props.Image} alt='Comic Cover' width="200px" /></div>
                    <div className="Desc">{this.props.Desc}</div>
                    <div className="InfoHolder">
                        <div className="TitleD">{this.props.Title}</div>
                        <div className="Issue">Issue No: #{this.props.IssueNo}</div>
                        <div className="Price">{this.props.Price}</div>
                        <div className="Blank"></div>
                    </div>
                </div>
                
            </div>

        );

    }
}
export default ComicDetails;
