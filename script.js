async function searchCondition() {
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

        displayResult(results);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.getElementById('btnSearch').addEventListener('click', searchCondition);

function displayResult(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

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
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''
}

document.getElementById('btnClear').addEventListener('click', clearResult)