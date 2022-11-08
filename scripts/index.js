
const userInput = document.querySelector('#country-input')
const searchBtn = document.querySelector('#search-btn')
const divRow = document.querySelector('#info')

searchBtn.addEventListener('click', async ()=>{
    let countryName = userInput.value
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    if (divRow.childNodes.length > 1){
      divRow.innerHTML= ''  
    } 
    if(userInput.value == 0){
        document.getElementById('error-info').style.display = 'inline-block'
        document.getElementById('error-info').style.color = 'red'
        document.getElementById('error-info').innerText = 'Input field must not be empty!'
    } else{
        document.getElementById('error-info').innerText = ''
        document.getElementById('error-info').style.display = 'none'
    }

try {
	    if(response.status === 200){
	        const country = await response.json()
	        userInput.value = ''
	        
			
	        //Flag
	        const countryFlag = document.createElement('img')
	        divRow.appendChild(countryFlag)
			countryFlag.src = country[0].flags.png 
	        countryFlag.setAttribute('id', 'flag')
	        countryFlag.setAttribute('class', 'mx-auto')
	        
	        //Country Name
	        const countryActualName = document.createElement('p')
	        countryActualName.innerText = country[0].name.common
	        countryActualName.setAttribute('class', 'h1 mt-3 mb-3')
	        countryActualName.setAttribute('id', 'country-name')
	        divRow.appendChild(countryActualName)
	        
	        //Captial
	        const countryCapital = document.createElement('p')
	        countryCapital.innerHTML = `<strong>Capital</strong>: ${country[0].capital}`
	        countryCapital.setAttribute('class', 'h4 info text-lg-start text-sm-center ms-lg-5 ps-lg-5 mb-4')
	        divRow.appendChild(countryCapital)
	        
	        //Continent
	        const countryContinent = document.createElement('p')
	        countryContinent.innerHTML = `<strong>Continent</strong>: ${country[0].continents[0]}`
	        countryContinent.setAttribute('class', 'h4 info text-lg-end text-sm-center me-lg-5 pe-lg-5 mb-4')
	        divRow.appendChild(countryContinent)
	        
	        //Population
	        const countryPop = document.createElement('p')
	        countryPop.innerHTML = `<strong>Population</strong>: ${country[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
	        countryPop.setAttribute('class', 'h4 info text-lg-start text-sm-center ms-lg-5 ps-lg-5 mb-4')
	        divRow.appendChild(countryPop)
	
	        //Currency
	        const countryCurrency = document.createElement('p')
	        countryCurrency.innerHTML = `<strong>Currency</strong>: ${country[0].currencies[Object.keys(country[0].currencies)].name} -
	         ${Object.keys(country[0].currencies)[0]} - ${country[0].currencies[Object.keys(country[0].currencies)].symbol} `
	        countryCurrency.setAttribute('class', 'h4 info text-lg-end text-sm-center me-lg-5 pe-lg-5 mb-4')
	        divRow.appendChild(countryCurrency)
	        
	        //Languages
	        const countryLang = document.createElement('p')
	        countryLang.innerHTML = `<strong>Common Languages</strong>: ${Object.values(country[0].languages).join(', ')}`
	        countryLang.setAttribute('class', 'h4 info text-lg-start text-sm-center ms-lg-5 ps-lg-5 mb-4')
	        divRow.appendChild(countryLang)
	        
	    } else{
	        throw new Error('Failed to get country, try again.')
	    }
} catch (e) {
	    document.getElementById('error-info').style.display = 'inline-block'
        document.getElementById('error-info').style.color = 'red'
        document.getElementById('error-info').innerText = `${e.message}`
}
  
})

document.getElementById('reset-btn').addEventListener('click', ()=>{
    location.reload()
})
