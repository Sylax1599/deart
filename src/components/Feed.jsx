import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';

import {client} from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout'; 
import Spinner from './Spinner'; 


const Feed = () => {


    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const {categoryId}= useParams();

    useEffect(() => {
        setLoading(true)
        //Preguntamos si le dio en una categoria
       if(categoryId){
            const query= searchQuery(categoryId)
            client.fetch(query)
            .then((data)=>{
                setPins(data)
                setLoading(false)
            })
       }
       //O si quiere traer todas las imagenes independientemente de su categoria
       else{
            client.fetch(feedQuery)
            .then((data) =>{
                setPins(data)
                setLoading(false)
            })
       }
    }, [categoryId])
    
    if(loading) return <Spinner message="Estamos cargando las mejores publicaciones para ti!" />

    if(!pins?.length) return <h2>No hay publicaciones</h2>
    return (
        <div>
            {
                pins && <MasonryLayout pins={pins} />
            } 
        </div>
    )
}

export default Feed
