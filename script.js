// ADD APPOINTMENT
document.getElementById("appointmentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const patient = document.getElementById("patient").value;
    const patient_id = document.getElementById("patient_id").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const body = { patient, patient_id, date, time };

    let res = await fetch("http://localhost:5000/add-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    let data = await res.json();
    alert("Appointment Saved!");
});

// LOAD APPOINTMENTS
document.getElementById("loadBtn").addEventListener("click", async () => {
    let res = await fetch("http://localhost:5000/appointments");
    let data = await res.json();

    let list = document.getElementById("appointmentsList");
    list.innerHTML = "";

    data.forEach(a => {
        let li = document.createElement("li");
        li.classList.add("appointment-card");

        li.innerHTML = `
            <strong>${a.patient} (ID: ${a.patient_id})</strong>
            <div class="appointment-time">
                ${new Date(a.date).toDateString()} — ${a.time}
            </div>
        `;
        list.appendChild(li);
    });
});
