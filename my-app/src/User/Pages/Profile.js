import { FontSizeContext } from "../../Helper/Context";
import CreateNewAdmin from '../Components/CreateNewAdmin';
import CreateNewSuperAdmin from '../Components/CreateNewSuperAdmin';
import ChangePassword from '../Components/ChangePassword';
import PreviousTestAnswers from '../Components/PreviousTestAnswers';

import "../Styles/Profile.css";
import "../Styles/User.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { getAssessmentsAction, getAllAssessmentsAction } from "../../tool/actions";
import React, { useState, useEffect, useContext } from "react";
import { Assessment, AssessmentSharp } from "@material-ui/icons";

const Profile = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [chosenAssessmentId, setChosenAssessmentId] = useState(null);
  const { fontSize, setFontSize } = useContext(FontSizeContext);

  let userName = sessionStorage.getItem('userName');
  let userSurname = sessionStorage.getItem('userSurname');
  let userEmail = sessionStorage.getItem('userEmail');
  let userPhone = sessionStorage.getItem('userPhone');
  let userTypeId = sessionStorage.getItem('userTypeId');
  let userId = sessionStorage.getItem('userId');
  const [rows, setRows] = React.useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(id, name, surname, phone, email, date) {
    return { id, name, surname, phone, email, date };
  }

  useEffect(async () => {
    await createRows();
  }, []);

  async function createRows() {
    var jsonData = {
      "data": [{
        "UserId": userId
      }]
    };
    let assessments;
    let temprows = [];

    if (userTypeId === '3') {
      assessments = await getAllAssessmentsAction();
      for (var i = 0; i < assessments.length; i++) {
        temprows.push(createData(assessments[i]["id"], assessments[i]["name"], assessments[i]["surname"], assessments[i]["phone"], assessments[i]["email"], assessments[i]["date"]));
      }
    } else {
      assessments = await getAssessmentsAction(jsonData);
      for (var i = 0; i < assessments.length; i++) {
        temprows.push(createData(assessments[i]["id"], userName, userSurname, userPhone, userEmail, assessments[i]["date"]));
      }
    }

    setRows(temprows);
  }

  return (
    <div className="ProfileLayout">
      <div className="ProfileDiv1" style={{ "grid-row-start": "1", "font-size": fontSize }}>
        <h1 style={{ "font-size": fontSize * 2 }}>Profil</h1>
      </div>
      <div className="ProfileDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "2" }}>
        <form className="form" style={{ "font-size": fontSize }}>
          <div className="innerForm" style={{ "align-self": "flex-start", "font-size": fontSize }}>
            <div className="form-group" style={{ "font-size": fontSize }}>
              <label htmlFor="name" style={{ "font-size": fontSize }}>İsim: {userName}</label>
            </div>
            <div className="form-group" style={{ "font-size": fontSize }}>
              <label htmlFor="surname" style={{ "font-size": fontSize }}>Soyisim: {userSurname}</label>
            </div>
            <div className="form-group" style={{ "font-size": fontSize }}>
              <label htmlFor="email" style={{ "font-size": fontSize }}>Email: {userEmail}</label>
            </div>
            <div className="form-group" style={{ "font-size": fontSize }}>
              <label htmlFor="tel" style={{ "font-size": fontSize }}>Telefon Numarası: {userPhone}</label>
            </div>
          </div>
        </form>
        <button class="btn btn-secondary"

          // Update onClick function such that it will open a modal content structure
          onClick={() => {
            setModalShow3(true);
          }}
          style={{ "margin-top": "10px", "font-size": fontSize }}
        >Şifremi Değiştir</button>
        {userTypeId === '3' ? (
          <div>
            <button
              class="btn btn-secondary"
              // Update onClick function such that it will open a modal content structure
              onClick={() => {
                setModalShow2(true);
              }}
              style={{ "margin-top": "10px", "font-size": fontSize }}
            >Yeni Admin Ekle</button>
            <button
              class="btn btn-secondary"
              // Update onClick function such that it will open a modal content structure
              onClick={() => {
                setModalShow(true);
              }}
              style={{ "margin-top": "10px", "margin-left": "10px", "font-size": fontSize }}
            >
              Yeni Süper Admin Ekle</button>
          </div>
        ) : (
          null
        )}
      </div>
      <div className="PreviousTest" style={{ "grid-row-start": "3", "font-size": fontSize, "line-height": "2" }}>
        <div className="ProfileDiv1" style={{ "grid-row-start": "1", "font-size": fontSize }}>
          {userTypeId === '3' ? (
            <h1 style={{ "font-size": fontSize * 2 }}>Hastaların Test Bilgileri</h1>

          ) : (
            <h1 style={{ "font-size": fontSize * 2 }}>Önceki Test Bilgilerim</h1>
          )}
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {userTypeId === '3' ? (

                  <StyledTableCell >Id</StyledTableCell>
                ) : (
                  null
                )}
                {userTypeId === '3' ? (

                  <StyledTableCell align="center">İsim</StyledTableCell>
                ) : (
                  null
                )}
                {userTypeId === '3' ? (

                  <StyledTableCell align="center">Soyisim</StyledTableCell>
                ) : (
                  null
                )}
                {userTypeId === '3' ? (
                  <StyledTableCell align="center">Telefon</StyledTableCell>
                ) : (
                  null
                )}
                {userTypeId === '3' ? (
                  <StyledTableCell align="center">Email</StyledTableCell>
                ) : (
                  null
                )}
                <StyledTableCell align="center">Tarih</StyledTableCell>
                <StyledTableCell align="center">Test Cevapları</StyledTableCell>
                <StyledTableCell align="center">Öneriler</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.name}>
                  {userTypeId === '3' ? (

                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                  ) : (
                    null
                  )}
                  {userTypeId === '3' ? (

                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                  ) : (
                    null
                  )}
                  {userTypeId === '3' ? (

                    <StyledTableCell align="center">{row.surname}</StyledTableCell>
                  ) : (
                    null
                  )}
                  {userTypeId === '3' ? (
                    <StyledTableCell align="center">{row.phone}</StyledTableCell>
                  ) : (
                    null
                  )}
                  {userTypeId === '3' ? (
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                  ) : (
                    null
                  )}
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  {userTypeId === '3' ? (
                    <StyledTableCell align="center">
                      <button class="btn btn-secondary"
                        onClick={() => { setModalShow4(true); setChosenAssessmentId(rows[index]["id"]); }}>
                        Cevaplar
                      </button>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      <button class="btn btn-secondary"
                        onClick={() => { setModalShow4(true); setChosenAssessmentId(rows[index]["id"]); }}>
                        Cevaplarım
                      </button>
                    </StyledTableCell>
                  )}
                  {userTypeId === '3' ? (

                    <StyledTableCell align="center">
                      <button class="btn btn-secondary"
                        onClick={() => { setModalShow2(true); }}>Öneriler
                      </button>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      <button class="btn btn-secondary"
                        onClick={() => { setModalShow2(true); }}>Önerilerim
                      </button>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <div>
          <PreviousTestAnswers
            assessmentId={chosenAssessmentId}
            modalShow={modalShow4}
            show={modalShow4}
            onHide={() => {
              setModalShow4(false);
              setChosenAssessmentId(null);
            }}
          />
        </div>
        <div>
          <ChangePassword
            show={modalShow3}
            onHide={() => {
              setModalShow3(false);
            }}
          />
        </div>
        <div>

          <CreateNewAdmin
            show={modalShow2}
            onHide={() => {
              setModalShow2(false);
            }}
          />
        </div>

        <div>

          <CreateNewSuperAdmin
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
          />
        </div>
      </div>

    </div>

  );
};

export default Profile;