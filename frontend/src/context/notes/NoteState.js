
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{

  const host = "https://note-book-api.vercel.app"

    const notesInitial = [
        
      ]
      const [notes, setNotes] = useState(notesInitial)
//  Get all Notes
      const getNotes = async()=>{
        //  API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        // eslint-disable-next-line
      const json = await response.json();
        setNotes(json);
       
      }


      // Add a Note

      const addNote = async(title, description, tag)=>{
        // TODO: API Call
       // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnotes`, {
           // eslint-disable-next-line
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}),
        });
    // eslint-disable-next-line
        const note = await response.json();
        setNotes(notes.concat(note));
      }

      //Delete a Note
          const deleteNote = async(id)=>{
            // TODO: API Call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
              },
            });
            // eslint-disable-next-line
          const json = await response.json();
          // eslint-disable-next-line
            const newNotes = notes.filter((note)=> {return note._id!==id})
            setNotes(newNotes);

          }

      //Edit a Note
      const editNote = async(id, title, description, tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description,tag}),
           // eslint-disable-next-line 
        });
         // eslint-disable-next-line
        const json= await response.json();
         // eslint-disable-next-line
        
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
           newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
          }
          
        }
        setNotes(newNotes);
      }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote, getNotes}}>
         {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
