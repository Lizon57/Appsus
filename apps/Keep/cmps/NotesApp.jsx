import { noteService } from '../services/notes-service.js'
import { AddNote } from '/AddNote.jsx'
import { NoteFilter } from '/NoteFilter.jsx'
import { FilterCtg } from '/FilterCtg.jsx'
import { NotePreview } from '/NotePreview.jsx'

export class NoteApp extends React.Component {
    state = {
        notes: null,
        filterTxt: '',
        ctg: ''
    }


    componentDidMount() {
        this.loadNotes()
    }


    loadNotes = () => {
        const { filterTxt, ctg } = this.state
        noteService.query(filterTxt, ctg)
            .then(notes => {
                this.setState({ notes })
            })
    }

    onSetFilter = (filterTxt) => {
        this.setState({ filterTxt }, this.loadNotes)
    }

    onSetCtg = (ctg) => {
        this.setState({ ctg }, this.loadNotes)
    }

    get filterPinned() {
        return this.state.notes.filter((note) => {
            return note.isPinned
        })
    }

    get filterNotPinned() {
        return this.state.notes.filter((note) => {
            return !note.isPinned
        })
    }


    render() {
        const { notes } = this.state

        if (!notes) return <div>Loading...</div>

        return (
            <section className="container">
                <AddNote />
                <div className="notes-filter-container flex ">
                    <NoteFilter onSetFilter={this.onSetFilter} />
                    <FilterCtg onSetCtg={this.onSetCtg} />
                    <section className="notes-counter-container">({notes.length})</section>
                </div>

                {this.filterPinned.length >= 1 &&
                    <React.Fragment>
                        <div className="note-pinned-title">Pinned:</div>
                        <div className="notes-container">
                            {this.filterPinned.map(note => {
                                return <NotePreview note={note} key={note.id} />
                            })}
                        </div>
                    </React.Fragment>}

                {this.filterNotPinned.length >= 1 &&
                    <React.Fragment>
                        <div className="note-not-pinned-title">Not pinned:</div>
                        <div className="notes-container">
                            {this.filterNotPinned.map(note => {
                                return <NotePreview note={note} key={note.id} />
                            })}
                        </div>
                    </React.Fragment>}
            </section>
        )
    }
}