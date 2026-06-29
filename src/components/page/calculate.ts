//--Copyright (c) 2023-2026 Robert A. Howell

import RwbError from "../../../srcopen/models/rwbErrorBus.js";
import { PropagationLatencyCalculation } from "../../models/propagationLatencyCalculation.js";

/**
 * Propagation Latency component.
 */
const latencyCalculator = {
  init: () => {
    let distanceElem: HTMLInputElement;
    let mediumSpeedElem: HTMLInputElement;
    let packetSizeElem: HTMLInputElement;
    let transmissionRateElem: HTMLInputElement;
    let resetElem: HTMLInputElement;
    let calculateElem: HTMLInputElement;
    let exampleElem1: HTMLButtonElement;
    let exampleElem2: HTMLButtonElement;
    let exampleElem3: HTMLButtonElement;

    distanceElem = RwbError.TryDocumentQuerySelector(
      "latencyCalculator",
      "#distance",
      true,
      true
    ) as HTMLInputElement;
    mediumSpeedElem = RwbError.TryDocumentQuerySelector(
      "latencyCalculator",
      "#mediumSpeed",
      true,
      true
    ) as HTMLInputElement;
    packetSizeElem = RwbError.TryDocumentQuerySelector(
      "latencyCalculator",
      "#packetSize",
      true,
      true
    ) as HTMLInputElement;
    transmissionRateElem = RwbError.TryDocumentQuerySelector(
      "latencyCalculator",
      "#transmissionRate",
      true,
      true
    ) as HTMLInputElement;
    resetElem = RwbError.TryDocumentQuerySelector("latencyCalculator", "#reset", true, true) as HTMLInputElement;
    calculateElem = RwbError.TryDocumentQuerySelector(
      "latencyCalculator",
      "#calculate",
      true,
      true
    ) as HTMLInputElement;
    if (
      distanceElem == null ||
      mediumSpeedElem == null ||
      packetSizeElem == null ||
      transmissionRateElem == null ||
      resetElem == null ||
      calculateElem == null
    ) {
      console.warn("This page experienced an error and the components are degraded. Please refresh and retry.")
      return;
    }

    exampleElem1 = document.querySelector("#example1") as HTMLButtonElement;
    exampleElem2 = document.querySelector("#example2") as HTMLButtonElement;
    exampleElem3 = document.querySelector("#example3") as HTMLButtonElement;

    calculateElem.addEventListener("click", event => {
      event.preventDefault();
      if (distanceElem.value == null || distanceElem.value == "" ||
        mediumSpeedElem.value == null || mediumSpeedElem.value == "") {
        console.warn("Result view requires an input value.")
        return; //TODO: handle null elements alerts
      }
      if (RwbError.TryDocumentQuerySelector("CalcLatency", "#propcalcres output", true, true)) {
        let resultelem = document.getElementById("propcalcres") as HTMLDivElement;
        let alltodelete = document.querySelectorAll("#propcalcres output");
        for (let n of Array.from(alltodelete)) {
          resultelem.removeChild(n);
        }
      }
      else {
        console.warn("Expected: form validation completion.")
        return;
      }

      const validateNumberInput = (str: string) => {
        // Take user input and filter to an accepted string
        var regSTR: any;
        let numstr = str.split(",").join("");
        PropagationLatencyCalculation.numberValidation(numstr)
        ? (regSTR = Number(numstr))
        : (regSTR = "INVALID");
        return regSTR;
      };

      var distance = validateNumberInput(distanceElem.value);
      if (distance == "INVALID") {
        //TODO: for now, return.
        return;
      }
      var mediumSpeed = validateNumberInput(mediumSpeedElem.value);
      if (mediumSpeed == "INVALID") {
        //TODO: for now, return.
        return;
      } else if (mediumSpeed > 300000) {
        //TODO: for now, return.
        return;
      }
      var packetSize = validateNumberInput(packetSizeElem.value);
      if (packetSize == "INVALID") {
        //TODO: for now, return.
        return;
      }
      var transmissionRate = validateNumberInput(transmissionRateElem.value);
      if (transmissionRate == "INVALID") {
        //TODO: for now, return.
        return;
      }

      let calculation = Object.create(
        new PropagationLatencyCalculation(distance, mediumSpeed, packetSize, transmissionRate)
      );
      console.log(`Answer found: ${calculation.propagationDelay}`);

      latencyCalculator.resultmarkup(calculation);
    });
    resetElem.addEventListener("click", event => {
      let resultelem = document.getElementById("propcalcres") as HTMLDivElement;
      if (resultelem != null) {
        let alltodelete = document.querySelectorAll("#propcalcres output");
        for (let n of Array.from(alltodelete)) {
          resultelem.removeChild(n);
        }
      }
    });
    if (exampleElem1 == null || exampleElem2 == null || exampleElem3 == null) {
      console.error("An example element is null, preventing click event initialization");
    }
    exampleElem1.addEventListener("click", event => {
      event.preventDefault();
      distanceElem.value = "300";
      mediumSpeedElem.value = "300,000";
      packetSizeElem.value = "1500";
      transmissionRateElem.value = "1,000,000";
    });
    exampleElem2.addEventListener("click", event => {
      event.preventDefault();
      distanceElem.value = "150,000,000";
      mediumSpeedElem.value = "300,000";
      packetSizeElem.value = "4500";
      transmissionRateElem.value = "100,000";
    });
    exampleElem3.addEventListener("click", event => {
      event.preventDefault();
      distanceElem.value = "40,000";
      mediumSpeedElem.value = "300,000";
      packetSizeElem.value = "1500";
      transmissionRateElem.value = "56,000";
    });

    console.log(`%c<RWB>%cLatency component started.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
  },
  resultmarkup: (result: PropagationLatencyCalculation) => {
    let resultelem = document.getElementById("propcalcres") as HTMLDivElement;
    let newResult = document.createElement("output");
    newResult.innerHTML = `
      Propagation Delay: <span>${result.getPropagationDelay().toFixed(4)} s</span><br>
      Serialization Delay: <span>${result.getSerializationDelay().toFixed(4)} s</span><br>
      Network Latency: <span>${result.getNetworkLatency().toFixed(4)} s</span><br>
    `;

    resultelem.appendChild(newResult);
  },
};

export default latencyCalculator;
