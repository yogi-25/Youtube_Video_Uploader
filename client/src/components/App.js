import React from 'react';
import axios from 'axios'
const App = () =>
{
  const[form,setForm] = React.useState({
    title:"",
    description:"",
    file:null
  })
  function handleChange(event){
    const inputValue = event.traget.name === "file" ? event.target.files[0] : event.target.value;
    setForm({
      ...form,[event.target.name]:inputValue
    })

  }
  function handleSubmit(event){
    event.preventDefault();
    const videoData =new FormData();
    videoData.append("videoFile",form.file);
    videoData.append("title",form.description);
    axios.post("http://localhost:3000/uploads",videoData)
    .then(response => {
      console.log(response.data);
    })
  }
return (

<div>
  <h1>Upload Youtube Videos</h1>
  <form onSubmit={handleSubmit}>
    <div>
  <input onchange={handleChange} type="text" name="title" autoComplete="off" placeholder="Title"/>
    </div>
    <div>
  <input onchange={handleChange} type="text" name="description" autoComplete="off" placeholder="Description"/>
    </div>
    <div>
  <input onchange={handleChange} accept="video/mp4" type="file" name="file" placeholder="Add Video File"/>
    </div>
    <button type="submit">Upload Videos</button>
    </form>
</div>

)
}
export default App;