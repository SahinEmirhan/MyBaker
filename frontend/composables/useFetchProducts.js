
export default async(city , filters) => {
    const  {data, error }  = await useFetch(`/api/product/${city}` , {
        params : {
            ...filters,
        },
    });


    if(error.value){
        throw createError({
            statusCode: error.statusCode,
            statusMessage: 'Unable to fetch products'
        })
    }

    return {data };
}
