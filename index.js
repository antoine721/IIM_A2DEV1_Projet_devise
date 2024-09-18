const APIKey = "4edc80d91c293771ce8bc2ea";  // Your API key

// Populate the currency dropdowns
async function DeviseList() {
  const url = `https://v6.exchangerate-api.com/v6/${APIKey}/codes`;
    const response = await fetch(url);

// recupération de l'api exenchange
    const data = await response.json();

// initialisation des variables a mettre dans les devises
    const currencies = data.supported_codes;
    const deviseStart = document.getElementById("deviseStart");
    const deviseEnd = document.getElementById("deviseEnd");

// remplissage des options de devises debut et fin
    currencies.forEach(currency => {
      let devisestart = document.createElement("option");
      devisestart.value = currency[0];
      devisestart.text = currency[1];
      deviseStart.add(devisestart);

      let deviseend = document.createElement("option");
      deviseend.value = currency[0];
      deviseend.text = currency[1];
      deviseEnd.add(deviseend);
    })
}

// Fetch conversion rate and calculate the conversion
async function convertCurrency() {
  const deviseStart = document.getElementById("deviseStart").value;
  const deviseEnd = document.getElementById("deviseEnd").value;
  const amount = document.getElementById("amount").value;


  // si l'amout est vide
  if (!amount || isNaN(amount)) {
    document.getElementById("result").textContent = "Résultat : 0.00";
    return;
  }
  
  const url = `https://v6.exchangerate-api.com/v6/${APIKey}/pair/${deviseStart}/${deviseEnd}/${amount}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur : ${response.status}`);

    const data = await response.json();
    const conversionResult = data.conversion_result;
    document.getElementById("result").textContent = `Résultat : ${conversionResult.toFixed(2)}`;
}

// Event listeners
document.getElementById("amount").addEventListener("input", convertCurrency);
window.addEventListener("load", DeviseList);
