**Brain Tumor Detection - AI Web App**
======================================

**Overview**
------------

This is an **AI-powered web app** that allows users to **upload MRI scans** and analyze them for potential **brain tumors**. The app provides a **confidence score** and a **downloadable PDF report**.

* * * * *

**Features**
------------

✅ **Upload MRI images** (Drag & Drop or File Picker)\
✅ **AI-Powered Tumor Detection** using Deep Learning\
✅ **Displays Confidence Score** for predictions\
✅ **Downloadable PDF Report** with MRI scan & results\
✅ **Modern, Professional UI**

* * * * *

**Tech Stack**
--------------

-   **Frontend:** HTML, CSS, JavaScript, Google Fonts
-   **Backend:** Flask (Python), Express.js (Node.js)
-   **AI Model:** TensorFlow/Keras
-   **Tools:** jsPDF (PDF generation), Axios, Multer

* * * * *

**Installation & Setup**
------------------------

### **1️⃣ Clone the Repository**

bash

CopyEdit

`git clone https://github.com/yourusername/brain-tumor-ai.git
cd brain-tumor-ai`

### **2️⃣ Setup Backend (Flask - Python)**

bash

CopyEdit

`cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python app.py`

📌 **Flask Server Running at:** `http://127.0.0.1:8000`

### **3️⃣ Setup Frontend (Node.js & Express)**

bash

CopyEdit

`cd frontend
npm install
node server.js`

📌 **Express.js Server Running at:** `http://localhost:3000`

* * * * *

**Usage**
---------

1️⃣ Open `http://localhost:3000` in your browser\
2️⃣ Upload an MRI image\
3️⃣ AI analyzes the scan and shows the results\
4️⃣ Click **Download Report** for a PDF with details