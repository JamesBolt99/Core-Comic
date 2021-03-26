import { Component } from 'react'

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            comicItems: [
                { comicTitle: 'Thor', issueNo: 1, id: 'Thor1', price: '£2.91', image: '/Comics/thor1.jpg', details: false, desc: 'A BRAND-NEW, SUPERSTAR CREATIVE TEAM TAKES THE KING OF ASGARD TO NEW REALMS OF GLORY! The prince is now a king. All Asgard lies before Thor, the God of Thunder. And after many months of war, the Ten Realms are finally at peace. But the skies above the Realm Eternal are never clear for long. The Black Winter is coming. And the God of the Storm will be powerless before it.' },
                { comicTitle: 'Spider-Man', issueNo: 21, id: 'Spider21', price: '£2.91', image: '/Comics/Spiderman_21.jpg', details: false, desc: 'THE CLIMACTIC CONCLUSION OF “HUNTED” IS HERE! Spidey faces an impossible situation that will push him as far as he’s ever been pushed. Who lives and who dies when the hunters become the prey?' }
            ],
        }
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
                comicItems: JSON.parse(savedStateFromLocalStorage),
            })
        }
    }
    updateSearch(e) {
        this.setState({ search: e.target.value.substr(0, 20) });
    }
    render() {
        let filteredComics = this.state.comicItems.filter(
            (comicItems) => {
                return comicItems.comicTitle.indexOf(this.state.search) !== -1;
            }
        );
        return (
            <div>
                <input
                    type='text'
                    name='Search'
                    placeholder='Search Comic Title...'
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)} />
                {filteredComics.map((comicItems, i) => {
                    return (
                        <div>
                            <button className="ComicHolder">
                                <h3 className="ComicTitle" >
                                    <span>{comicItems.comicTitle} #{comicItems.issueNo}</span>
                                </h3>
                                <h3 className="ComicPrice">{comicItems.price}</h3>
                                <img className="ComicImage" src={comicItems.image} alt='new' />

                            </button>
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default Search;