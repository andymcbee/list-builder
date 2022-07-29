import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./smsRequestUi.css";

export default function SmsRequestUi() {
  const [phoneDisplay, setPhoneDisplay] = useState("(___) ___-____");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [accessAllowed, setAccessAllowed] = useState(false);

  const { pageId } = useParams();

  useEffect(() => {
    const checkAccessAllowed = async () => {
      try {
        const { data } = await axios.get(`/api/messages/access/${pageId}`);

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

  const handleNumClick = (num) => {
    if (phoneNumber.length >= 10) {
      toast.error("Max phone number length reached");
      return;
    }

    const updateDisplayState = (num) => {
      let currentDisplayNumber = phoneDisplay;
      let updatedDisplayString = currentDisplayNumber.replace(/_/, num);

      setPhoneDisplay(updatedDisplayString);
    };

    updateDisplayState(num);
    setPhoneNumber(phoneNumber.toString() + num.toString());
  };

  const deleteLastNumberInput = (phoneNumber) => {
    if (!phoneNumber) return;

    const updatePhoneDisplayState = (phoneNumber) => {
      let lastCharOfPhoneNumber = phoneNumber.charAt(phoneNumber.length - 1);

      const lastIndex = phoneDisplay.lastIndexOf(lastCharOfPhoneNumber);
      const replacement = "_";

      const updatedPhoneDisplay =
        phoneDisplay.substring(0, lastIndex) +
        replacement +
        phoneDisplay.substring(lastIndex + 1);

      setPhoneDisplay(updatedPhoneDisplay);
    };

    setPhoneNumber(phoneNumber.slice(0, -1));

    updatePhoneDisplayState(phoneNumber);
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
          <div
            className="button press"
            onClick={() => deleteLastNumberInput(phoneNumber)}
          >
            Back
          </div>
          <div className="button press">Submit</div>
        </div>
      </div>
    );
  }
}
