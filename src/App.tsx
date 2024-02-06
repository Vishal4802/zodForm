import { FC } from "react";
import Form from "./form/Form";
import './App.css'

const App:FC = () => {

  return (
    <div className="app">
      <h1>Zod Form</h1>
      <Form />
      <h2>Best way to control forms</h2>
    </div>
  )
}

export default App
