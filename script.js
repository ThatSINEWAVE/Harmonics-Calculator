let harmonicsChart;

function calculateHarmonics() {
    const frequencyInput = document.getElementById("frequency");
    const frequency = parseFloat(frequencyInput.value);
    const tableBody = document.getElementById("harmonicsTableBody");

    if (isNaN(frequency) || frequency <= 0) {
        tableBody.innerHTML = "<tr><td colspan='6'>Please enter a valid frequency.</td></tr>";
        if (harmonicsChart) harmonicsChart.destroy();
        return;
    }

    // Calculate harmonics and properties
    const harmonics = [];
    for (let i = 1; i <= 10; i++) {
        const harmonicFreq = frequency * i;
        const wavelength = (300 / harmonicFreq).toFixed(3);  // Wavelength in meters
        const ml = (wavelength * 0.95).toFixed(3);  // Mechanical length with shorting factor k=0.95
        harmonics.push({
            harmonic: i,
            frequency: harmonicFreq.toFixed(3),
            wavelength,
            ml,
            mlHalf: (ml / 2).toFixed(3),
            mlQuarter: (ml / 4).toFixed(3),
        });
    }

    // Update table with harmonics data
    tableBody.innerHTML = harmonics
        .map(
            (h) => `
        <tr>
            <td>${h.harmonic}</td>
            <td>${h.frequency} MHz</td>
            <td>${h.wavelength} m</td>
            <td>${h.ml} m</td>
            <td>${h.mlHalf} m</td>
            <td>${h.mlQuarter} m</td>
        </tr>
    `
        )
        .join("");

    // Update chart with harmonics data
    updateGraph(harmonics, frequency);
}

function updateGraph(harmonics, baseFrequency) {
    const ctx = document.getElementById("harmonicsChart").getContext("2d");

    if (harmonicsChart) harmonicsChart.destroy();

    harmonicsChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: harmonics.map((h) => `H${h.harmonic}`),
            datasets: [
                {
                    label: `Harmonics of ${baseFrequency} MHz`,
                    data: harmonics.map((h) => parseFloat(h.frequency)),
                    backgroundColor: "rgba(33, 230, 193, 0.2)",
                    borderColor: "#21e6c1",
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: "#21e6c1",
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "#e0e0e0",
                    },
                },
                title: {
                    display: true,
                    text: `Harmonic Frequencies of ${baseFrequency} MHz`,
                    color: "#e0e0e0",
                    font: {
                        size: 16,
                    },
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Harmonic Order",
                        color: "#e0e0e0",
                    },
                    ticks: {
                        color: "#e0e0e0",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Frequency (MHz)",
                        color: "#e0e0e0",
                    },
                    ticks: {
                        color: "#e0e0e0",
                    },
                    grid: {
                        color: "#2e3b55",
                    },
                },
            },
        },
    });
}
