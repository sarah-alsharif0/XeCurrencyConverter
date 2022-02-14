export const getCurrencies = () => {
    return fetch("https://restcountries.com/v3.1/all")
        .then(async (res) => {
            return await res.json();
        })
        .catch((err) => {
            console.log(err);
        });
}
export const getCurrencyRates = (currency) => {
    return fetch(`http://www.floatrates.com/daily/${currency}.json`)
    .then(async (res)=>{
        return await res.json();
    })
    .catch((err)=>{
        console.log(err);
    })
}