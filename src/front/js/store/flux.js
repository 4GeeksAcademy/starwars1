const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            urlBaseStarWars: "https://www.swapi.tech/api",
            people: JSON.parse(localStorage.getItem("people")) || [],
            planets: JSON.parse(localStorage.getItem("planets")) || [],
            favorites: []
        },
        actions: {
            getAllPeople: async () => {
                const store = getStore()
                if (store.people <= 0) {
                    try {
                        const response = await fetch(`${store.urlBaseStarWars}/people`)
                        const data = await response.json()

                        for (let person of data.results) {
                            const responsePerson = await fetch(person.url)
                            const dataPerson = await responsePerson.json()
                            dataPerson.result["image"] = `https://starwars-visualguide.com/assets/img/characters/${dataPerson.result.uid}.jpg`

                            setStore({
                                people: [...store.people, dataPerson.result]
                            })
                        }
                        localStorage.setItem("people", JSON.stringify(store.people))

                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            getAllPlanets: async () => {
                const store = getStore()
                if (store.planets <= 0) {
                    try {
                        const response = await fetch(`${store.urlBaseStarWars}/planets`)
                        const data = await response.json()

                        for (let planet of data.results) {
                            const responsePlanet = await fetch(planet.url)
                            const dataPlanet = await responsePlanet.json()
                            dataPlanet.result["image"] = `https://starwars-visualguide.com/assets/img/planets/${dataPlanet.result.uid}.jpg`

                            setStore({
                                planets: [...store.planets, dataPlanet.result]
                            })
                        }
                        localStorage.setItem("planets", JSON.stringify(store.planets))

                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            addFavorite: (fav) => {
                const store = getStore()
                const exist = store.favorites.some((item) => item._id == fav._id)

                if (exist) {
                    const newFav = store.favorites.filter((item) => item._id != fav._id)
                    setStore({
                        favorites: newFav
                    })
                } else {
                    setStore({
                        favorites: [...store.favorites, fav]
                    })
                }
            }
        }
    };
};

export default getState;