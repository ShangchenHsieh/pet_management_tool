import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php' 

const AppContext = React.createContext()



 
const AppProvider = ({children}) => {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const {data} = await axios(url)

            if(data.meals) {
                setMeals(data.meals)
            }
            else {
                setMeals([])
            }
            
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false)
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }


    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if(!searchTerm) {
            return
        } 
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    return (
        <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}