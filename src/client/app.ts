import * as verovio from "verovio-dev";

// const input = document.getElementById("input");
const div = document.getElementById("svgoutput");
const vrvToolkit = new verovio.toolkit();

const render = (pae: string): void => {
    console.log("render", "pae:", pae);
    div.innerHTML = vrvToolkit.renderData(pae, {
        inputFormat: "pae",
        scale: 50,
        adjustPageHeight: 1,
        pageWidth: 1048,
        border: 0,
        spacingStaff: 2
    });
};

render("@clef:G-2@keysig:xFCGD@timesig:3/8@data:'6B/{8B+(6B''E'B})({AFD})/{6.E3G},8B-/({6'EGF})({FAG})({GEB})/4F6-");
// input.addEventListener("input", e => {
//     render((e.target as HTMLInputElement).value);
// });
