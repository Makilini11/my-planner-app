import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReportSection({ expenses, buttonStyle }) {
  const reportRef = useRef();

  const handleExportPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Expenses_Report.pdf');
  };

  return (
    <div style={{ marginBottom: '20px', color: 'white' }}>
      <h3>Expense Report</h3>
      <div ref={reportRef} style={{ padding: '20px', backgroundColor: '#333', borderRadius: '10px' }}>
        {expenses.map(exp => (
          <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>{exp.description} ({exp.category})</span>
            <span>₹{parseFloat(exp.amount).toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
      <button style={{ ...buttonStyle, marginTop: '10px' }} onClick={handleExportPDF}>Export PDF</button>
    </div>
  );
}
