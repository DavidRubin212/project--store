import React, { useEffect, useState } from 'react'
import { useSubmit } from 'react-router-dom'


const InStock = ({quantity}: number | undefined) => {


    const [inStock, setInStock] = useState<boolean>(true)
    useEffect(() => {
        setInStock(quantity > 0 ? true : false)
    }, [inStock])
    return (
        <h3 style={{ color: inStock ? 'green' : 'red' }}>
            {inStock ? 'In stock' : 'out of stock'}
        </h3>
    )
}

export default InStock