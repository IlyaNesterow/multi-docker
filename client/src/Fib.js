import React, { useState, useEffect } from 'react'


const Fib = () => {
  const [ seenIndexes, setSeenIndexes ] = useState([])
  const [ values, setValues ] = useState({})
  const [ index, setIndex ] = useState('')

  const fetchValues = async () => {
    try {
      let values = await fetch('/api/values/all')
      values = await values.json()
      //console.log(values)
      if(values && values.values)
        setSeenIndexes(values.values)
    } catch(err) {
      console.log(err.message)
    }
  }

  const fetchIndexes = async () => {
    try {
      let indexes = await fetch('/api/values/current')
      indexes = await indexes.json() 
      //console.log(indexes)
      if(indexes.values)
        setValues(indexes.values)
    } catch(err) {
      console.log(err.message)
    }
  }

  const createIndex = async e => {
    e.preventDefault()
    try {
      const result = await (await fetch('/api/values/new', {
        method: 'PUT',
        body: JSON.stringify({ index }),
        headers: {
          'content-type': 'application/json'
        }
      }))
        .json()
      console.log(result)
    } catch(err) {
      console.log(err)
    }
  }

  const handleOnChange = e => {
    const val = e.target.value
    if(isNaN(val)){
      e.target.value = val.substr(0, val.length - 1)
      return 
    }
    setIndex(val)
  }

  const renderSeenIndexes = () => 
    seenIndexes.length > 0
      ? <ul>{ seenIndexes.map(({ number }, i) => <li key={i}>{ number }</li>) }</ul>
      : <p>No indexes yet</p>

  const renderValues = () => {
    if(Object.keys(values).length === 0)
      return <p>No values yet</p>

    const items = []

    for (let key in values){
      items.push(
        <li key={ key }>
          For index { key }, we have a value of { values[ key ] }
        </li>
      )
    }
    return items
  }

  useEffect(() => {
    fetchIndexes()
    fetchValues()
  }, [])

  return(
    <div>
      <form>
        <label>Enter your index here</label>
        <input 
          type="number"
          value={ index }
          onChange={ handleOnChange }
        />
        <button
          onClick={ createIndex }
        >Submit</button>
        <div>
          <h3>Indexes I had seen:</h3>
          { renderValues() }
        </div>
        <div>
          <h3>Values I had calculated:</h3>
          { renderSeenIndexes() }
        </div>
      </form>
    </div>
  )
}

export default Fib