import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./smsRequestUi.css";

export default function SmsRequestUi() {
  const [phoneDisplay, setPhoneDisplay] = useState("(___) ___-____");
  const [phone, setPhone] = useState("");

  const [accessAllowed, setAccessAllowed] = useState(false);

  const { pageId } = useParams();

  useEffect(() => {
    const checkAccessAllowed = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/messages/access/${pageId}`
        );

        console.log(data.error);

        if (!data.error) {
          setAccessAllowed(true);
          console.log("DATA ERROR = FALSE");
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };

    checkAccessAllowed();
  }, [pageId]);

  //On page load, check and see if a pageId exists in MongoDB.
  // --> This will be done in Redux.
  //--> Keep in mind... the endpoint needs to be NOT protected... users on this
  // Be sure this check happens EVERY time a request is sent. This means
  //If the admin changes the URL, then new requests can't be sent out.
  //page won't be auth'd

  //If so, load page.
  //If not, show error page. (Blank page for now.)

  const handleNumClick = (num) => {
    //Return if no more input is allowed.
    if (phone.length >= 10) {
      toast.error("Max length reached");

      return;
    }

    let updatedNumber = phone.toString() + num.toString();
    let currentDisplayNumber = phoneDisplay;

    console.log(updatedNumber.length);

    const updateDisplayState = (num) => {
      let updatedDisplayString = currentDisplayNumber.replace(/_/, num);

      setPhoneDisplay(updatedDisplayString);
    };

    const updatePhoneState = (updatedNumber) => {
      setPhone(updatedNumber);
    };

    updatePhoneState(updatedNumber);
    updateDisplayState(num);
  };

  const deleteNum = (phone) => {
    // If phone is empty, return.
    if (!phone) return;

    let currentPhoneString = phone;

    // handle Phone Display string update. Find and replace
    // last num char with an underscore

    const updatePhoneDisplayState = (currentPhoneString) => {
      //find last Char in the num-only phone string (NOT display string)
      let lastChar = currentPhoneString.charAt(currentPhoneString.length - 1);

      const lastIndex = phoneDisplay.lastIndexOf(lastChar);
      const replacement = "_";

      const updatedPhoneDisplay =
        phoneDisplay.substring(0, lastIndex) +
        replacement +
        phoneDisplay.substring(lastIndex + 1);

      setPhoneDisplay(updatedPhoneDisplay);
    };

    //handle phone string update

    const updatePhoneState = (phone) => {
      setPhone(phone.slice(0, -1));
    };

    //call both update functions
    updatePhoneDisplayState(currentPhoneString);
    updatePhoneState(phone);
  };

  if (accessAllowed) {
    return (
      <div className="numPadFlexContainer">
        <div className="numPadRow">
          <div className="numberDisplay">{phoneDisplay}</div>
        </div>
        <div className="numPadRow">
          <div className="number press" onClick={() => handleNumClick(1)}>
            1
          </div>
          <div className="number press" onClick={() => handleNumClick(2)}>
            2
          </div>
          <div className="number press" onClick={() => handleNumClick(3)}>
            3
          </div>
        </div>
        <div className="numPadRow">
          <div className="number press" onClick={() => handleNumClick(4)}>
            4
          </div>
          <div className="number press" onClick={() => handleNumClick(5)}>
            5
          </div>
          <div className="number press" onClick={() => handleNumClick(6)}>
            6
          </div>
        </div>
        <div className="numPadRow">
          <div className="number press" onClick={() => handleNumClick(7)}>
            7
          </div>
          <div className="number press" onClick={() => handleNumClick(8)}>
            8
          </div>
          <div className="number press" onClick={() => handleNumClick(9)}>
            9
          </div>
        </div>
        <div className="numPadRow">
          <div className="number press" onClick={() => handleNumClick(0)}>
            0
          </div>
        </div>
        <div className="numPadRow">
          <div className="button press" onClick={() => deleteNum(phone)}>
            Back
          </div>
          <div className="button press">Submit</div>
        </div>
      </div>
    );
  }
}
