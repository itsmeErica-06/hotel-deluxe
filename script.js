function showSection(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

// 🌤️ Weather API
async function getWeather() {
  const city = document.getElementById("weather-city").value.trim();
  const output = document.getElementById("weather-output");

  if (!city) {
    output.textContent = "⚠️ Please enter a city name first.";
    return;
  }

  output.textContent = "Fetching weather... Please wait.";

  try {
    const apiKey = "8e6cf0e8c79d7c6df2a5d77b8f6b07b7"; // Replace with your real key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Invalid response");

    output.innerHTML = `
      🌍 City: <b>${data.name}</b><br>
      🌡️ Temperature: <b>${data.main.temp}°C</b><br>
      ☁️ Condition: <b>${data.weather[0].description}</b><br>
      💨 Wind Speed: <b>${data.wind.speed} m/s</b>
    `;
  } catch (err) {
    output.textContent = "⚠️ Could not fetch weather. Please check your city name or internet connection.";
  }
}

// 💱 Currency Converter
async function getCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;
  const output = document.getElementById("currency-output");

  if (!amount || amount <= 0) {
    output.textContent = "⚠️ Please enter a valid amount.";
    return;
  }

  output.textContent = "Converting, please wait...";

  try {
    const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.result) throw new Error("Conversion failed");

    output.innerHTML = `💰 <b>${amount} ${from}</b> = <b>${data.result.toFixed(2)} ${to}</b>`;
  } catch {
    output.textContent = "⚠️ Error converting currency. Please try again later.";
  }
}

// 🌟 TripAdvisor (mock)
function getTripAdvisor() {
  const hotel = document.getElementById("hotel-name").value.trim();
  const output = document.getElementById("tripadvisor-output");

  if (!hotel) {
    output.textContent = "⚠️ Please enter a hotel name.";
    return;
  }

  output.textContent = `Sample reviews for ${hotel}: ★★★★☆ (4.5/5) - Excellent stay and friendly staff!`;
}

// 📧 Email Verification
async function verifyEmail() {
  const email = document.getElementById("email-input").value.trim();
  const output = document.getElementById("email-output");

  if (!email) {
    output.textContent = "⚠️ Please enter an email address.";
    return;
  }

  output.textContent = "Verifying email... Please wait.";

  try {
    const res = await fetch(`https://api.eva.pingutil.com/email?email=${email}`);
    const data = await res.json();

    if (data && data.data && typeof data.data.deliverable !== "undefined") {
      output.textContent = data.data.deliverable
        ? `✅ ${email} is a valid email address!`
        : `❌ ${email} appears to be invalid or undeliverable.`;
    } else {
      throw new Error("Unexpected API response");
    }
  } catch {
    output.textContent = "⚠️ Unable to verify email. Please check your internet connection.";
  }
}
