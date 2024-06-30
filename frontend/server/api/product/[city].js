import products from '@/data/products.json'

export default defineEventHandler((event)=>{
    const {city} = event.context.params
    const {make , minPrice , maxPrice} = getQuery(event)
    let filteredProducts = products;
    filteredProducts = filteredProducts.filter((car) => {
        return car.city.toLowerCase() == city.toLowerCase()
    })

    if(make){
        filteredProducts = filteredProducts.filter((car) => {
            return car.make.toLowerCase() == make.toLowerCase()
        })
    }
    if(minPrice){
        filteredProducts = filteredProducts.filter((car) => {
            return parseInt(car.price) >= parseInt( minPrice)
        })
    }
    if(maxPrice){
        filteredProducts = filteredProducts.filter((car) => {
            return parseInt(car.price) <= parseInt(maxPrice)
        })
    }
    return filteredProducts
})