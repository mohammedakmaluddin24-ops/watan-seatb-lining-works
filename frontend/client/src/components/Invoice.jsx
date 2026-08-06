import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function Invoice({ work }) {


  const generateInvoice = () => {


    const doc = new jsPDF();


    const formatDate = (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-GB");
    };


    const money = (value) => {
      return Number(value || 0).toFixed(2);
    };


    // Header

    doc.setFontSize(22);
    doc.text(
      "WATAN SEAT LINING",
      65,
      20
    );


    doc.setFontSize(14);
    doc.text(
      "WORK INVOICE",
      85,
      32
    );


    doc.setFontSize(11);


    // Customer Details

    doc.text(
      `Customer: ${work.company_name || ""}`,
      20,
      50
    );


    doc.text(
      `Phone: ${work.phone || ""}`,
      20,
      58
    );


    doc.text(
      `Address: ${work.address || ""}`,
      20,
      66
    );


    // Work Details

    doc.text(
      `Bus Number: ${work.bus_number || ""}`,
      20,
      80
    );


    doc.text(
      `Bus Model: ${work.bus_model || ""}`,
      20,
      88
    );


    doc.text(
      `Location: ${work.site_location || ""}`,
      20,
      96
    );


    doc.text(
      `Billing Date: ${formatDate(work.billing_date)}`,
      120,
      80
    );


    doc.text(
      `Start Date: ${formatDate(work.work_start_date)}`,
      120,
      88
    );


    doc.text(
      `Completion: ${formatDate(work.work_completion_date)}`,
      120,
      96
    );



    // Amount Table

    autoTable(doc, {

      startY:115,


      head:[
        [
          "Description",
          "Amount"
        ]
      ],


      body:[

        [
          "Total Amount",
          money(work.total_amount)
        ],

        [
          "Advance Payment",
          money(work.advance_payment)
        ],

        [
          "Due Amount",
          money(work.due_amount)
        ],

        [
          "Raw Material Cost",
          money(work.raw_material_cost)
        ],

        [
          "Employee Work Cost",
          money(work.employee_work_cost)
        ],

        [
          "Profit",
          money(work.profit)
        ]

      ]

    });



    doc.setFontSize(11);


    doc.text(
      `Status: ${work.status}`,
      20,
      190
    );


    doc.text(
      "Authorized Signature",
      20,
      230
    );


    doc.line(
      20,
      225,
      80,
      225
    );


    doc.save(
      `Invoice-${work.bus_number}.pdf`
    );

  };



  return (

    <button
      onClick={generateInvoice}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Generate Invoice 🧾
    </button>

  );

}


export default Invoice;
