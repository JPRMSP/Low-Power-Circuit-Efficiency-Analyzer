document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

function analyzePower() {
    let gateType = document.getElementById("gateType").value;
    let voltage = parseFloat(document.getElementById("voltage").value);
    let frequency = parseFloat(document.getElementById("frequency").value);

    if (isNaN(voltage) || isNaN(frequency)) {
        document.getElementById("output").innerHTML = "Enter valid values!";
        return;
    }

    let switchingPower = 0, shortCircuitPower = 0, leakagePower = 0, glitchingPower = 0;
    let recommendation = "";

    switch (gateType) {
        case "nand":
            switchingPower = voltage * voltage * frequency * 0.6;
            shortCircuitPower = voltage * 0.02;
            leakagePower = voltage * 0.01;
            glitchingPower = voltage * frequency * 0.05;
            recommendation = "Use MTCMOS for better efficiency.";
            break;
        case "nor":
            switchingPower = voltage * voltage * frequency * 0.8;
            shortCircuitPower = voltage * 0.03;
            leakagePower = voltage * 0.015;
            glitchingPower = voltage * frequency * 0.07;
            recommendation = "Use pass-transistor logic to reduce power.";
            break;
        case "xor":
            switchingPower = voltage * voltage * frequency * 0.9;
            shortCircuitPower = voltage * 0.04;
            leakagePower = voltage * 0.02;
            glitchingPower = voltage * frequency * 0.06;
            recommendation = "Use transmission gate logic.";
            break;
        default:
            recommendation = "Invalid gate type.";
    }

    let totalPower = switchingPower + shortCircuitPower + leakagePower + glitchingPower;

    document.getElementById("output").innerHTML = `
        <b>Total Power Dissipation:</b> ${totalPower.toFixed(2)} µW<br>
        <b>Switching Power:</b> ${switchingPower.toFixed(2)} µW<br>
        <b>Short Circuit Power:</b> ${shortCircuitPower.toFixed(2)} µW<br>
        <b>Leakage Power:</b> ${leakagePower.toFixed(2)} µW<br>
        <b>Glitching Power:</b> ${glitchingPower.toFixed(2)} µW<br>
        <b>Optimization:</b> ${recommendation}
    `;

    updateGraph(switchingPower, shortCircuitPower, leakagePower, glitchingPower, totalPower);
}

function updateGraph(switching, shortCircuit, leakage, glitching, total) {
    document.getElementById("switchingPower").style.width = (switching / total) * 100 + "%";
    document.getElementById("shortCircuitPower").style.width = (shortCircuit / total) * 100 + "%";
    document.getElementById("leakagePower").style.width = (leakage / total) * 100 + "%";
    document.getElementById("glitchingPower").style.width = (glitching / total) * 100 + "%";
}

function exportReport() {
    let outputText = document.getElementById("output").innerText;
    let blob = new Blob([outputText], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Power_Report.txt";
    link.click();
}
