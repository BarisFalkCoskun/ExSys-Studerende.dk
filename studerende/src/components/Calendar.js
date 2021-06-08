import React from "react";

// const HOST = 'https://vm29.exsys2021.cs.au.dk/express/';
const HOST = 'http://localhost:3000/express/';

const url = HOST + "calendar";

console.log(url)

const Calender = () => {
  return (
    <React.Fragment>
      <form method="post" action={url} className="form" target='formresponse' style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
        <input type="checkbox" id="cal_a" name="cal_a" value="DA1" className={"calendar-option"}></input>
        <label for="cal_a">DA1</label>
        <input type="checkbox" id="cal_b" name="cal_b" value="DA2" className={"calendar-option"}></input>
        <label for="cal_b">DA2</label>
        <input type="submit" value="Submit"></input>
      </form>
      <iframe  src={HOST + "start.html"} frameBorder={"0"} style={{height: "100%", width: "100%" }} id="formresponse" name="formresponse"></iframe>
    </React.Fragment>
  );
};

export default Calender;
