import React from "react";
import { Button } from "react-bootstrap";
import FileSaver from "file-saver";
import {utils, write} from "xlsx";

const ExportCSV = ({ csvData, fileName, wscols }) => {
  // ******** XLSX with object key as header *************
  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // const fileExtension = ".xlsx";

  // const exportToCSV = (csvData, fileName) => {
  //   const ws = XLSX.utils.json_to_sheet(csvData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  // ******** XLSX with new header *************
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"; //Excel file construction
  const fileExtension = ".xlsx";

  const Heading = [ //Column names of the excel file
    {
        id: "id",
        date: "date",
        name: "name",
        surname: "surname",
        email: "email",
        phone:"phone",
        question:"question",
        options:"options",
        answer:"answer",
    }
  ];


  const exportToCSV = (csvData, fileName, wscols) => {
    const ws = utils.json_to_sheet(Heading, { //Column names of the excel file.
      header: ["id", "date", "name", "surname", "email","phone","question","options","answer"],
      skipHeader: true,
      origin: 0 //ok
    });
    ws["!cols"] = wscols;
    utils.sheet_add_json(ws, csvData, { //Writing corresponding data under the columns
      header: ["id", "date", "name", "surname", "email","phone","question","options","answer"],
      skipHeader: true,
      origin: -1 //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension); //Saving excel file
  };

  return (
    <Button
      variant="warning" style={{ marginLeft: "auto" }}
      onClick={e => exportToCSV(csvData, fileName, wscols)}
    >
      Verileri Excel'e Aktar
    </Button>
  );
};

export default ExportCSV;