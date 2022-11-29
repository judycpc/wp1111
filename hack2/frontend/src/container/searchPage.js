/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    console.log('locationState', state)
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        console.log('getRestaurant')
        // TODO Part I-3-b: get information of restaurants from DB
        let { data } = await instance.get('/getSearch', {params: state});
        console.log(data);
        setRestaurant(data.contents);
    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
        console.log('click')
        navigate(`/restaurant/${id}`);
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    return (

        <div className='searchPageContainer'>
            {
                restaurants.map(({id, img, name, price, distance, tag}) => (
                    // TODO Part I-2: search page front-end
                    <div className='resBlock' id={id} key={id} onClick={() => ToRestaurant(id)}>
                        <div className='resImgContainer'>
                            <img className='resImg' src={img} />
                        </div>
                        <div className='resInfo'>
                            <div className='title'>
                                <p className='name'>{name}</p>
                                <p className='price'>{getPrice(price)}</p>
                                <p className='distance'>{String(distance/1000) + ' km'}</p>
                            </div>
                            <p className='description'>{tag.join(', ')}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default SearchPage