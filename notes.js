import fs from 'fs'
import chalk from 'chalk'

const addNote = (title, body) => {
    const notes = loadNotes()
    //filter function returns a subset containing all the duplicate notes
    //it works on each note(object) in the array
    //const duplicateNotes = notes.filter((note) => note.title === title)
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })

    //find function returns the first note object that matches
    const duplicateNote = notes.find((note)=>note.title === title) 

    // debugger 

    if (!duplicateNote) {   //or condition can be if(duplicateNote === undefined) ie if no duplicate note found
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

//utility function 
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//utility function 
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON) //returns a javascript object (with properties to access object methods/data) instead of just a string ie json
    } catch (e) {
        return [] //return an empty array when the notes.json is empty
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    // const notesToKeep = notes.filter(function(note){
    //     return note.title !== title
    // })
    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(notesToKeep)
    }
    else
        console.log(chalk.red.inverse('No Note Found!'));
}

const listNotes = () => {
    console.log(chalk.inverse('Your Notes'))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(chalk(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const loadedNote = notes.find((note)=>note.title === title)
    if(!loadedNote) {
        console.log(chalk.red.inverse('No note found!'))
    } else {
        console.log(chalk.inverse(loadedNote.title))
        console.log(loadedNote.body)
    }
}

export default {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
