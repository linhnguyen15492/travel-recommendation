let resultDiv = document.getElementById('result');


async function searchCondition() {
    resultDiv.innerHTML = '';

    const keywords = { "beach": "beaches", "temple": "temples", "country": "countries" }

    let input = document.getElementById('conditionInput').value.toLowerCase();

    keys = Object.keys(keywords)
    for (key of keys) {
        if (input.includes(key)) {
            input = keywords[key]
            break;
        }
    }

    try {
        const response = await fetch('./travel_recommendation_api.json')

        const data = await response.json();

        results = data[input]

        console.log(results)

        if (input == 'countries') {
            for (country of results) {
                results = country.cities
                displayResult(results)
            }
        } else {
            displayResult(results);
        }

    }


    catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.getElementById('btnSearch').addEventListener('click', searchCondition);

function displayResult(results) {
    results.forEach(element => {
        resultDiv.innerHTML += `<img src="${element.imageUrl}" alt="hjh">`;
        resultDiv.innerHTML += `<h2>${element.name}</h2>`;
        resultDiv.innerHTML += `<p>${element.description}</p>`;
        resultDiv.innerHTML += `<br></br>`;
    });
}

function clearResult() {
    let input = document.getElementById('conditionInput');

    input.value = ''

    resultDiv.innerHTML = ''
}

document.getElementById('btnClear').addEventListener('click', clearResult)