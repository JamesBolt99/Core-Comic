import React, { Component } from 'react'
import './NewItem.css'

class NewItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comicItems: JSON.parse(localStorage.getItem('comicItems')),
            newTitle: '',
            newIssue: '',
            newPrice: '',
            newDesc: '',
            newImage: ''
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
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

        this.setState((state) => {
            return {
                comicItems: JSON.parse(savedStateFromLocalStorage)

            }
        })
    }

    handleOnChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        // const target = e.target
        // const comicTitle = target.newComicTitle
        // const value = target.value

        this.setState({
            [name]: value
            //   newComicTitle: value
        });
    }


    handleOnSubmit(e) {
        // e.preventDefault()
        const newComicItemObject = {
            comicTitle: this.state.newTitle,
            id: this.state.newTitle + this.state.newIssue,
            issueNo: this.state.newIssue,
            price: '£' + this.state.newPrice,
            details: false,
            desc: this.state.newDesc,
            image: this.state.newImage,
            count: 1
        }
        
        this.setState((state) => {
            return {
                comicItems: [...state.comicItems, newComicItemObject],
                newComicTitle: '',
                newIssue: '',
                newPrice: '',
                newDesc: '',
                newImage: null,
            }
        })

    }
    fileSelectedHandler(event) {
        console.log((event.target.files[0]))
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        console.log(reader.result)
        reader.onload = () => this.setState({ newImage: reader.result })

        // reader.addEventListener("load", () => {

        //     console.log(reader.result)       
        // })
        // this.setState({
        //     newImage: reader.result

        // selectedFile: event.target.files[0]
        // })
    }

    render() {
        return (
            <div className="grid-containerI">
                <div className="TitleI">Add New Comic</div>
                <form className="Content" onSubmit={this.handleOnSubmit}>
                    <div className="ComicTitleI">Comic Title</div>
                    <div className="TitleInput">
                        <input
                            type="text"
                            name="newTitle"
                            placeholder="Comic Title"
                            value={this.state.newComicTitle}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="IssueNoI">Issue No</div>
                    <div className="IssueInput"><input
                        type="text"
                        name="newIssue"
                        placeholder="Comic Issue"
                        value={this.state.newIssue}
                        onChange={this.handleOnChange}
                    /></div>
                    <div className="PriceI">Price</div>
                    <div className="PriceInput"><input
                        type="text"
                        name="newPrice"
                        placeholder="Comic Price"
                        value={this.state.newPrice}
                        onChange={this.handleOnChange}
                    /></div>
                    <div className="DescI">Description</div>
                    <div className="DescInput"><input
                        type="text"
                        name="newDesc"
                        placeholder="Comic Desc"
                        value={this.state.newDesc}
                        onChange={this.handleOnChange}
                    /></div>
                    <div className="ImageI">Image</div>
                    <div className="ImageInput"><input
                        type="file"
                        name={this.state.newImageName}
                        files={this.state.newImage}
                        onChange={this.fileSelectedHandler}
                    /></div>
                </form>
                <a className='ButtonHolder' href='/ComicList'><button className='NewButton' onClick={this.handleOnSubmit}>Add</button></a>
            </div>
        );
    }
}
export default NewItem;