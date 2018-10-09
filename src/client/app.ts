import * as abcjs from "abcjs";

const input = document.getElementById("input");
const div = document.getElementById("svgoutput");
const abcClickListener = (abcElem, tuneNumber, classes) => {
    console.log("abcClickListener", abcElem, tuneNumber, classes);
};

input.addEventListener("input", e => {
    const ABC: string = (e.target as HTMLInputElement).value;
    const options = {
        clickListener: abcClickListener,
        add_classes: true
    };
    abcjs.renderAbc("svgoutput", ABC, options);
});