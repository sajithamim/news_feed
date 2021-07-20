import React, { useState } from "react";

const PollContent = (props) => {
  const [questonFields, setQuestionFields] = useState([{ value: null }]);
  //   const [answerFields, setAnswerFields] = useState([{ value: null }]);

  //   function handleQuestionChange(i, event) {
  //     const values = [...questonFields];
  //     values[i].value = event.target.value;
  //     setQuestionFields(values);
  //   }

  if (props.questions && props.answers) {
    for (let i = 0; i <= 2; i++) {
      const questions = [...questonFields];

    
      questions.push({ value: null });
      setQuestionFields(questions);
    }
  }

  //   function handleAnswerChange(i, event) {
  //     const values = [...answerFields];
  //     values[i].value = event.target.value;
  //     setAnswerFields(values);
  //   }

  //   if (props.questions && props.answers) {
  //     const answer = [...answerFields];
  //     for (let i = 0; i < props.answers; i++) {
  //       answer.push({ akid: i, value: null });
  //     }
  //     setQuestionFields(answer);
  //   }

  //   function handleQuestionRemove(i) {
  //     const values = [...questonFields];
  //     values.splice(i, 1);
  //     setQuestionFields(values);
  //   }
  return (
    <div>
      {questonFields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <input
              type="text"
              placeholder="Enter text"
              value={field.value || ""}
              //   onChange={(e) => handleQuestionChange(idx, e)}
            />
            {/* {answerFields.map((afield, idx) => {
              return (
                <div key={`${afield}-${idx}`}>
                  <input
                    type="text"
                    placeholder="Enter text"
                    value={afield.value || ""}
                    onChange={(e) => handleAnswerChange(idx, e)}
                  />
                </div>
              );
            })} */}
            {/* <button type="button" onClick={() => handleQuestionRemove(idx)}>
              X
            </button> */}
          </div>
        );
      })}
      {/* <div>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Poll question :</span>
            </Grid>
            <Grid item md={6}>
              <Input type="text" key="question"></Input>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Answer title 1 :</span>
            </Grid>
            <Grid item md={6}>
              <Input type="text" key="a1"></Input>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Answer title 2 :</span>
            </Grid>
            <Grid item md={6}>
              <Input type="text" key="a2"></Input>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Answer title 3 :</span>
            </Grid>
            <Grid item md={6}>
              <Input type="text" key="a3"></Input>
            </Grid>
          </Grid>
          <hr />
        </div> */}
    </div>
  );
};

export default PollContent;
