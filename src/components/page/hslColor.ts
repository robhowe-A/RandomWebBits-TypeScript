//--Copyright (c) 2023-2026 Robert A. Howell

const hslColorWidget = {
  init: () => {
    let hslOne = document.querySelector("#HSLColorONE") as HTMLDivElement;
    let hslTwo = document.querySelector("#HSLColorTWO") as HTMLDivElement;
    let hslThree = document.querySelector("#HSLColorTHREE") as HTMLDivElement;

    class boxcolor {
      hue = 0;
      saturation = 100;
      lightness = 50;

      constructor(hue = 0, saturation = 100, lightness = 50) {
        if (hue == 0) {
          this.hue = 0;
        } else if (hue == 120) {
          this.hue = 120;
        } else if (hue == 240) {
          this.hue = 240;
        }
        if (hue < 0 || hue >= 360 || saturation < 0 || saturation > 100 || lightness < 0 || lightness > 100) {
          let err = new RangeError();
          console.log(
            `%c<RWB>%cHSL color value out of acceptable range:\n%o\n%c</RWB>`,
            "color:gray;font-weight:bold;",
            "color:gray;",
            err,
            "color:gray;font-weight:bold;"
          );
        }
        this.saturation = saturation;
        this.lightness = lightness;
      }
    }

    let red = 0;
    let green = 120;
    let blue = 240;

    let hslBoxColorRed = Object.create(new boxcolor(red, 100, 50));
    let hslBoxColorGreen = Object.create(new boxcolor(green, 100, 50));
    let hslBoxColorBlue = Object.create(new boxcolor(blue, 100, 50));
    let topRectHue = document.querySelector("#HSLColorONE span.val1") as HTMLSpanElement;
    let topRectSat = document.querySelector("#HSLColorONE span.val2") as HTMLSpanElement;
    let topRectLight = document.querySelector("#HSLColorONE span.val3") as HTMLSpanElement;
    let midRectHue = document.querySelector("#HSLColorTWO span.val1") as HTMLSpanElement;
    let midRectSat = document.querySelector("#HSLColorTWO span.val2") as HTMLSpanElement;
    let midRectLight = document.querySelector("#HSLColorTWO span.val3") as HTMLSpanElement;
    let botRectHue = document.querySelector("#HSLColorTHREE span.val1") as HTMLSpanElement;
    let botRectSat = document.querySelector("#HSLColorTHREE span.val2") as HTMLSpanElement;
    let botRectLight = document.querySelector("#HSLColorTHREE span.val3") as HTMLSpanElement;
    topRectHue.textContent = hslBoxColorRed.hue;
    topRectSat.textContent = hslBoxColorRed.saturation;
    topRectLight.textContent = hslBoxColorRed.lightness;
    midRectHue.textContent = hslBoxColorGreen.hue;
    midRectSat.textContent = hslBoxColorGreen.saturation;
    midRectLight.textContent = hslBoxColorGreen.lightness;
    botRectHue.textContent = hslBoxColorBlue.hue;
    botRectSat.textContent = hslBoxColorBlue.saturation;
    botRectLight.textContent = hslBoxColorBlue.lightness;

    hslOne.style.backgroundColor = `hsl(${hslBoxColorRed.hue}, ${hslBoxColorRed.saturation}%, ${hslBoxColorRed.lightness}%)`;
    hslTwo.style.backgroundColor = `hsl(${hslBoxColorGreen.hue}, ${hslBoxColorGreen.saturation}%, ${hslBoxColorGreen.lightness}%)`;
    hslThree.style.backgroundColor = `hsl(${hslBoxColorBlue.hue}, ${hslBoxColorBlue.saturation}%, ${hslBoxColorBlue.lightness}%)`;

    const hueSldr = document.querySelector(`#Hue`) as HTMLInputElement;
    const saturationSldr = document.querySelector(`#Saturation`) as HTMLInputElement;
    const lightnessSldr = document.querySelector(`#Lightness`) as HTMLInputElement;

    hueSldr.addEventListener("input", () => {
      let hueInputValue = hueSldr.value;
      hslOne.style.backgroundColor = `hsl(${hueInputValue}, ${hslBoxColorRed.saturation}%, ${hslBoxColorRed.lightness}%)`;
      hslTwo.style.backgroundColor = `hsl(${hueInputValue}, ${hslBoxColorGreen.saturation}%, ${hslBoxColorGreen.lightness}%)`;
      hslThree.style.backgroundColor = `hsl(${hueInputValue}, ${hslBoxColorBlue.saturation}%, ${hslBoxColorBlue.lightness}%)`;
      hslBoxColorRed.hue = hueInputValue;
      hslBoxColorGreen.hue = hueInputValue;
      hslBoxColorBlue.hue = hueInputValue;
      topRectHue.textContent = hslBoxColorRed.hue;
      midRectHue.textContent = hslBoxColorGreen.hue;
      botRectHue.textContent = hslBoxColorBlue.hue;
    });

    saturationSldr.addEventListener("input", () => {
      let saturationInputValue = saturationSldr.value;
      hslOne.style.backgroundColor = `hsl(${hslBoxColorRed.hue}, ${saturationInputValue}%, ${hslBoxColorRed.lightness}%)`;
      hslTwo.style.backgroundColor = `hsl(${hslBoxColorGreen.hue}, ${saturationInputValue}%, ${hslBoxColorGreen.lightness}%)`;
      hslThree.style.backgroundColor = `hsl(${hslBoxColorBlue.hue}, ${saturationInputValue}%, ${hslBoxColorBlue.lightness}%)`;
      hslBoxColorRed.saturation = saturationInputValue;
      hslBoxColorGreen.saturation = saturationInputValue;
      hslBoxColorBlue.saturation = saturationInputValue;
      topRectSat.textContent = hslBoxColorRed.saturation;
      midRectSat.textContent = hslBoxColorGreen.saturation;
      botRectSat.textContent = hslBoxColorBlue.saturation;
    });

    lightnessSldr.addEventListener("input", () => {
      let lightInputValue = lightnessSldr.value;
      hslOne.style.backgroundColor = `hsl(${hslBoxColorRed.hue}, ${hslBoxColorRed.saturation}%, ${lightInputValue}%)`;
      hslTwo.style.backgroundColor = `hsl(${hslBoxColorGreen.hue}, ${hslBoxColorGreen.saturation}%, ${lightInputValue}%)`;
      hslThree.style.backgroundColor = `hsl(${hslBoxColorBlue.hue}, ${hslBoxColorBlue.saturation}%, ${lightInputValue}%)`;
      hslBoxColorRed.lightness = lightInputValue;
      hslBoxColorGreen.lightness = lightInputValue;
      hslBoxColorBlue.lightness = lightInputValue;
      topRectLight.textContent = hslBoxColorRed.lightness;
      midRectLight.textContent = hslBoxColorGreen.lightness;
      botRectLight.textContent = hslBoxColorBlue.lightness;
    });

    console.log(`%c<RWB>%cHSL color component started.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
  },
};

export default hslColorWidget;
