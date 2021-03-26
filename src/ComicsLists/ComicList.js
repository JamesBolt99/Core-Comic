import React, { Component } from 'react'

import ComicDetails from './ComicDetails';
import './ComicList.css'



class ComicList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDetailsOn: false,
        }

        this.state = {
            BasketItems: [],
                // {comicTitle: 'Thor', issueNo: 1, id: 'Thor1', price: '£2.91', image: '/Comics/thor1.jpg', details: false, desc: 'A BRAND-NEW, SUPERSTAR CREATIVE TEAM TAKES THE KING OF ASGARD TO NEW REALMS OF GLORY! The prince is now a king. All Asgard lies before Thor, the God of Thunder. And after many months of war, the Ten Realms are finally at peace. But the skies above the Realm Eternal are never clear for long. The Black Winter is coming. And the God of the Storm will be powerless before it.' }],
            comicItems: [
                { comicTitle: 'Thor', issueNo: 1, id: 'Thor1', price: '£2.91', image: '/Comics/thor1.jpg', details: false, desc: 'A BRAND-NEW, SUPERSTAR CREATIVE TEAM TAKES THE KING OF ASGARD TO NEW REALMS OF GLORY! The prince is now a king. All Asgard lies before Thor, the God of Thunder. And after many months of war, the Ten Realms are finally at peace. But the skies above the Realm Eternal are never clear for long. The Black Winter is coming. And the God of the Storm will be powerless before it.' },
                { comicTitle: 'Spider-Man', issueNo: 21, id: 'Spider21', price: '£2.91', image: '/Comics/Spiderman_21.jpg', details: false, desc: 'THE CLIMACTIC CONCLUSION OF “HUNTED” IS HERE! Spidey faces an impossible situation that will push him as far as he’s ever been pushed. Who lives and who dies when the hunters become the prey?' }
            ],
        }

        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.AddToBasket = this.AddToBasket.bind(this)
        // this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        const prevStateString = JSON.stringify(prevState.comicItems)
        const updatedStateString = JSON.stringify(this.state.comicItems)

        if (prevStateString !== updatedStateString) {
            console.log("Save this:", updatedStateString)
            localStorage.setItem('comicItems', updatedStateString)
        }
        const prevStateStringBasket = JSON.stringify(prevState.BasketItems)
        const updatedStateStringBasket = JSON.stringify(this.state.BasketItems)

        if (prevStateStringBasket !== updatedStateStringBasket) {
            console.log("Save this:", updatedStateStringBasket)
            localStorage.setItem('BasketItems', updatedStateStringBasket)
        }
    }
    componentDidMount() {
        const savedStateFromLocalStorage = localStorage.getItem('comicItems')
        const savedStateFromLocalStorageBasket = localStorage.getItem('BasketItems')

        if (savedStateFromLocalStorage) {
            this.setState({
                comicItems: JSON.parse(savedStateFromLocalStorage),
            })
        }
        if (savedStateFromLocalStorageBasket) {
            this.setState({
                BasketItems: JSON.parse(savedStateFromLocalStorageBasket),
            })
        }
    }
    
    handleOnClick(index) {
        const {
            comicItems,
        } = this.state
        const newComicItems = [...this.state.comicItems]
        newComicItems[index] = {
            ...newComicItems[index], details: !comicItems[index].details
        }
        this.setState({
            comicItems: newComicItems
        })
    }

    handleDelete(i) {
        const index = parseInt(i, 10) // access button's custom attribute

        console.log('deleting: ' + index)

        const newComicItemsState = [...this.state.comicItems]
        newComicItemsState.splice(index, 1)

        this.setState({
            comicItems: newComicItemsState
        })
    }
    
    AddToBasket(i) {
        const {
            BasketItems
        } = this.state
        const newBasketItems = {
            comicTitle: this.state.comicItems[i].comicTitle,
            issueNo: this.state.comicItems[i].issueNo,
            price: this.state.comicItems[i].price,
            desc: this.state.comicItems[i].desc,
            image: this.state.comicItems[i].image,
            id: this.state.comicItems[i].id,
            count: 1
        }
        const existedItem = BasketItems.find(Basket => Basket.id === newBasketItems.id)
        if (existedItem) {
            // const count = BasketItems[i].count
            const newBasketCount = [...this.state.BasketItems]
            const index = this.state.BasketItems.findIndex(Basket => Basket.id === newBasketItems.id)

            console.log('index: ' + index)

            newBasketCount[index] = {
                ...newBasketCount[index], count: newBasketCount[index].count + 1
            }
            this.setState((state) => {
                return {
                    BasketItems: newBasketCount
                }
            })
        } else {
            this.setState((state) => {
                return {
                    BasketItems: [...state.BasketItems, newBasketItems]
                }
            })
        }
    }

    render() {
        const {
            comicItems,
            
        } = this.state
        return (
            
            <section>
                <a className='NewItem' href='/NewItem'><button className='NewButtonLink'>Add New Comic</button></a>
                {comicItems.map((item, i) => {
                    return (
                        <div>
                            <button key={i} onClick={() => this.handleOnClick(i)} itemindex={i} className="ComicHolder">
                                <h3 className="ComicTitle" >
                                    <span key={i + i}>{item.comicTitle} #{item.issueNo}</span>
                                </h3>
                                <h1 className='Info'>Click for more info</h1>
                                <h1 className="ComicPrice">{item.price}</h1>
                                <img className="ComicImage" src={item.image} alt='new' />

                            </button>
                            <button className='DelButton'
                                itemindex={i}
                                onClick={() => this.handleDelete(i)}>
                                ✕
                                    </button>
                            <section>{item.details ? <ComicDetails
                                Title={item.comicTitle}
                                IssueNo={item.issueNo}
                                Price={item.price}
                                Image={item.image}
                                Desc={item.desc}
                                index={i}
                            /> : ''}</section>
                            <button className='Add' onClick={() =>this.AddToBasket(i)}>Add to Basket</button>
                        </div>

                    )
                })}
            </section>
        )
    }
}
export default ComicList;
