import * as React from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import "./Form.css";
import DEFAULT_COLOR from "../../Utils/Color";
const Form = (props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmitChange(input);
    setInput("");
  };

  return (
    <div>
      <h2 className="form_header">Query By {props.name}</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="text">
          <FormLabel className="form_label">{props.input}</FormLabel>
          <FormControl
            autoFocus
            type="text"
            placeholder={props.name}
            value={input}
            className="form_control"
            onChange={(e) => setInput(e.target.value)}
          />
        </FormGroup>
        <Button
          style={{
            backgroundColor: DEFAULT_COLOR,
            color: "white",
          }}
          variant="contained"
          className="submit_form"
          type="submit"
        >
          Query
        </Button>
      </form>
    </div>
  );
};

export default Form;
