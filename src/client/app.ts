import * as abcjs from "abcjs";

const SCRAPBOXURL = "https://scrapbox.io/stk-study-music-theory/";

const abcClickListener = (abcElem, tuneNumber, classes) => {
    console.log("abcClickListener", abcElem, tuneNumber, classes);

    if (abcElem.el_type) {
        if (abcElem.startChar === 153) {
            window.open(SCRAPBOXURL + "middle C")
        }
    } else {
        if(abcElem.type === "treble"){
            window.open(SCRAPBOXURL + "treble clef")
        }
        if(abcElem.type === "common_time"){
            window.open(SCRAPBOXURL + "common_time")
        }
    }
};

const ABC: string = (
    "M:C\n" +
    "%%score (A B)\n" +
    "[V:A] [bcg]4 cd a2 | [Gdg]2 B2 ed c2 | [cdg]2 f[(c(e] [c)e)]c d2 | [Gce]2 d2 [Bdg]4 | [V:B] A,3 (A,A,4) | E,3 (E,E,4) | F,4 (F,4 | F,) (C3 C)D G2 |"
);

const options = {
    clickListener: abcClickListener,
    add_classes: true
};
abcjs.renderAbc("svgoutput", ABC, options);