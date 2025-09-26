import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AdmitCard from "./AdmitCard";
import { QRCodeService as QRCode } from './services/QrCodeService';

const AdmitCardPage = () => {
  const componentRef = useRef();
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const qrData = {
      id: 1,
      name: "as",
      serial: "as",
      barcode: "as",
    };

    QRCode.generate(qrData)
      .then(setQrCodeUrl)
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
        setQrCodeUrl('');
      });
  }, []);

  const handleDownload = async () => {
    const element = componentRef.current;

    // Convert to canvas
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Create PDF (A4 size)
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add extra pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("AdmitCard.pdf");
  };

  return (
    <div>
      {/* Admit Card Preview */}
      <div ref={componentRef}>
        <AdmitCard
          qrcode={qrCodeUrl}
          name="SNEHA RAUTELA"
          fname="GOVIND SINGH"
          gender="Male"
          categ="General"
          dob="05-03-2004"
          address="Almora"
          roll_t1="230101001"
          lang1_1="हिंदी"
          lang1_2="अंग्रेज़ी"
          lang2_1="संस्कृत"
          lang2_2="अंग्रेज़ी"
          subject="गणित"
          photo="/photo.jpg"
          sign="/sign.jpg"
          centre_name="रा0क0इ0का0 ज्वालापुर हरिद्वार (नोडल केन्द्र)"
          city_name="हरिद्वार"
          idtype="आधार"
          idno="4849-3400-6181"
        />
      </div>

      {/* Download PDF button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleDownload}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📥 Download Admit Card PDF
        </button>
      </div>
    </div>
  );
};

export default AdmitCardPage;
