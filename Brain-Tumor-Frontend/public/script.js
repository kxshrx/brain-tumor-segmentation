document.getElementById("imageInput").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("previewImage").src = e.target.result;
            document.getElementById("previewImage").style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const resultText = document.getElementById("result");
    const loadingText = document.getElementById("loading");
    const downloadBtn = document.getElementById("download-btn");

    if (!fileInput.files.length) {
        alert("Please select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    resultText.innerHTML = "";
    loadingText.style.display = "block";

    try {
        const response = await fetch("/upload", { method: "POST", body: formData });
        const data = await response.json();

        resultText.innerHTML = `<strong>Prediction:</strong> ${data.prediction} <br> <strong>Confidence:</strong> ${data.confidence}%`;

        // Store prediction data for PDF generation
        localStorage.setItem("mriResult", JSON.stringify(data));

        downloadBtn.style.display = "block";
    } catch (error) {
        console.error("Error:", error);
        resultText.innerHTML = "❌ Error occurred. Please try again.";
    } finally {
        loadingText.style.display = "none";
    }
}

// ✅ Fix: Define the `downloadPDF` function to generate a PDF report
function downloadPDF() {
    const resultData = JSON.parse(localStorage.getItem("mriResult"));
    if (!resultData) {
        alert("No report data available!");
        return;
    }

    const { prediction, confidence } = resultData;

    // Create a new PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // PDF Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Brain Tumor AI Detection Report", 20, 20);
    doc.setFontSize(12);
    doc.text("Generated by AI-powered medical analysis system", 20, 30);

    // Report Content
    doc.setFont("helvetica", "normal");
    doc.text(`Prediction: ${prediction}`, 20, 50);
    doc.text(`Confidence: ${confidence}%`, 20, 60);

    // Add MRI Image if Available
    const imgElement = document.getElementById("previewImage");
    if (imgElement.src) {
        doc.addImage(imgElement.src, "JPEG", 20, 80, 120, 100);
    }

    // Save the PDF
    doc.save("Brain-Tumor-Report.pdf");
}
