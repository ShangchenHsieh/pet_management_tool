import React, {useContext, useEffect} from 'react'
import axios from 'axios'

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'

const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php' 

const AppContext = React.createContext()

const fetchMeals = async (url) => {
    try {
        const response = await axios(url)
        
        console.log(response.data )
    } catch (error) {
        console.log(error.response)
    }
}
 
const AppProvider = ({children}) => {
    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    return (
        <AppContext.Provider value={{name:'john', role:'student'}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}