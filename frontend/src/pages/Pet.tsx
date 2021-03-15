import React from 'react'
import { postPet, getPet } from '../api'

function usePet({ match: { params } } : any) {
    const [pet, setPet] = React.useState({})
    React.useEffect(() => {
        getPet(params.id).then(res => {
            setPet(res.data)
        })
    }, [])
    const addPet = () => {
        postPet({
            id: 1,
            name: 'wanchan',
            category: {
                id: 2,
                name: 'kago'
            },
            photoUrls: ['http://diphylia.com'],
            tags: [{
                id: 2,
                name: 'f',
            }],
            status: 'done'
        }).then(res => {
            setPet(res.data)
        }).catch(e => {
            console.log(e)
        })
    }
    return { pet, addPet, setPet }
}

function Pet(props: any) {
    const { pet } = { ...usePet(props) }
    return (
        <div>data: {JSON.stringify(pet)}</div>
    )
}

export default Pet
