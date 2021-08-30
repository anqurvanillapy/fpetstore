import React, { useState } from 'react'
import { postPet, getPet as getPetRequest, updatePet } from '../api'

function usePet({ match: { params } } : any) {
    const [pet, setPet] = React.useState({})
    const getPet = (id: number) => {
        getPetRequest(id).then(res => {
            setPet(res.data)
        })
    }
    const addPet = (pet: PostPet) => {
        postPet(pet).then(res => {
            setPet(res.data)
        }).catch(e => {
            console.log(e)
        })
    }
    const modifyPet = (pet: PostPet) => {
        updatePet(pet).then(res => {
            setPet(res.data)
        }).catch(e => {
            console.log(e)
        })
    }
    React.useEffect(() => {
        getPet(params.id)
    }, [])
    return { pet, addPet, setPet, modifyPet }
}



function Pet(props: any) {
    const { pet, addPet, setPet, modifyPet } = { ...usePet(props) }
    
    let [newPet, setNewPet] = useState({
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
    })
    return (<div>
        <div>data: {JSON.stringify(pet)}</div>
        <button onClick={() => addPet(newPet)}>添加</button>
        <button onClick={() => modifyPet(newPet)}>修改</button>
    </div>)
}

export default Pet
