import { useState } from 'react'

export default function List() {
    const [count, setCount] = useState(0)
  
    return (
        <div>
            <h1>Hello! this is List!</h1>
        </div>
    )
}