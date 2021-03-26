import React, { Component } from 'react'

import ComicDetails from './ComicDetails';
import './Basket.css'



class Basket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            BasketItems: JSON.parse(localStorage.getItem('BasketItems'))
        }

        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this)
        this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        const prevStateString = JSON.stringify(prevState.BasketItems)
        const updatedStateString = JSON.stringify(this.state.BasketItems)

        if (prevStateString !== updatedStateString) {
            console.log("Save this:", updatedStateString)
            localStorage.setItem('BasketItems', updatedStateString)
        }
    }
    componentDidMount() {
        const savedStateFromLocalStorage = localStorage.getItem('BasketItems')

        if (savedStateFromLocalStorage) {
            this.setState({
                BasketItems: JSON.parse(savedStateFromLocalStorage),
            })
        }
    }
    
    handleOnClick(index) {
        const {
            BasketItems,
        } = this.state
        const newBasketItems = [...this.state.BasketItems]
        newBasketItems[index] = {
            ...newBasketItems[index], details: !BasketItems[index].details
        }
        this.setState({
            BasketItems: newBasketItems
        })
    }

    handleDelete(i) {
        const index = parseInt(i, 10) // access button's custom attribute

        console.log('deleting: ' + index)

        const newBasketItemsState = [...this.state.BasketItems]
        newBasketItemsState.splice(index, 1)

        this.setState({
            BasketItems: newBasketItemsState
        })
    }
    handleQuantityIncrease(index) {
        const {
            BasketItems,
        } = this.state
        const newBasketItems = [...this.state.BasketItems]
        newBasketItems[index] = {
            ...newBasketItems[index], count: BasketItems[index].count + 1
        }
        this.setState({
            BasketItems: newBasketItems
        })
    }
    handleQuantityDecrease(index) {
        const {
            BasketItems,
        } = this.state
        
        const newBasketItems = [...this.state.BasketItems]
        if (newBasketItems[index].count <= 1) {
            this.handleDelete(index)
        console.log('delete')
    }
    else if(newBasketItems[index].count > 1) {
    newBasketItems[index] = {
        ...newBasketItems[index], count: BasketItems[index].count - 1
    }
    this.setState({
        BasketItems: newBasketItems
    })
}
    }
    

    render() {
        const {
            BasketItems,
        } = this.state
        return (
            <section>
                {BasketItems === null ? '' :
                <div>
                {BasketItems.map((item, i) => {
                    return (
                        <div>
                            <button key={i} onClick={() => this.handleOnClick(i)} itemindex={i} className="ComicHolder">
                                <h3 className="ComicTitle" >
                                    <span key={i + i}>{item.comicTitle} #{item.issueNo}</span>
                                </h3>
                                <h1 className="ComicPrice">{item.price}</h1>
                                <img className="ComicImage" src={item.image} alt='new' />

                            </button>
                            <button className='DelButton'
                                itemindex={i}
                                onClick={() => this.handleDelete(i)}>
                                ✕
                                    </button>
                                    <div className='Quantity_Adjust'>
                                    <button className='Quantity' onClick={() => this.handleQuantityDecrease(i)}>&#60;</button>
                                    {item.count}
                                        <button className='Quantity' onClick={() => this.handleQuantityIncrease(i)}>&#62;</button>
                                    </div>
                            <section>{item.details ? <ComicDetails
                                Title={item.comicTitle}
                                IssueNo={item.issueNo}
                                Price={item.price}
                                Image={item.image}
                                Desc={item.desc}
                                index={i}
                            /> : ''}</section>
                        </div>

                    )
                })}
                </div>}
            </section>
        )
    }
}
export default Basket;
