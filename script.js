const COUNTER_API_URL = "https://qfnwlajj87.execute-api.us-east-1.amazonaws.com/counter";

async function updateVisitorCount() {
  const counter = document.getElementById("visitor-count");

  if (!counter) {
    return;
  }

  try {
    const response = await fetch(COUNTER_API_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Counter API returned ${response.status}`);
    }

    const data = await response.json();

    if (typeof data.visits === "number") {
      counter.textContent = data.visits.toLocaleString();
    } else {
      throw new Error("Counter API response did not include a numeric visits value");
    }
  } catch (error) {
    console.error("Visitor counter error:", error);
    counter.textContent = "—";
  }
}

document.addEventListener("DOMContentLoaded", updateVisitorCount);
