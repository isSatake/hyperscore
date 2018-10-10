import * as abcjs from "abcjs";

type Link = {
    startChar: number,
    pageTitle: string
}

const SCRAPBOXURL = "https://scrapbox.io/stk-study-music-theory/";
const LINK_HIGHLIGHT_COLOR = "#3965ff";
const inputEl = document.getElementById("abcinput");

const parseLink = (abc: string): Link[] => {
    const parsedLinks: Link[] = [];
    const linkMached = abc.match(/%Links:.*/);
    console.log("parseLink", "linkMatched", linkMached[0]);
    if (!linkMached) {
        return [];
    }

    const linkStr = linkMached[0].replace(/%Links:/, "");
    const links = linkStr.split(",");
    console.log("parseLink", "links", links);
    if (links.length < 1) {
        return [];
    }

    for (let link of links) {
        const arr = link.split(" ");
        if (arr.length < 2) continue;
        parsedLinks.push({startChar: Number(arr[0]), pageTitle: arr[1]});
    }

    console.log("parseLink", "parsedLinks", parsedLinks);
    return parsedLinks;
};

const onInput = () => {
    console.log("inputEl", "oninput");
    const ABC: string = (inputEl as HTMLInputElement).value;
    render(ABC, inputEl as HTMLInputElement, parseLink(ABC));
};

const addLinkToABC = (abc: string, startChar: number): string => {
    let updatedABC: string;
    if (abc.match(/(%Links:$|,$)/)) {
        updatedABC = `${abc}${startChar} new`;
    } else if (abc.match(/%Links:.+$/)) {
        updatedABC = `${abc},${startChar} new`;
    } else if (abc.match(/\n$/)) {
        updatedABC = `${abc}%Links:${startChar} new`;
    } else {
        updatedABC = `${abc}\n%Links:${startChar} new`;
    }
    return updatedABC;
};

const generateClickListener = (inputEl: HTMLInputElement, links: Link[]) => {
    return (abcElem, tuneNumber, classes): void => {
        console.log("abcClickListener", abcElem, tuneNumber, classes);
        //abcjsによる赤ハイライトを取り消す
        abcElem.abselem.highlight(undefined, LINK_HIGHLIGHT_COLOR);

        const clickedNoteStartChar: number = abcElem.startChar;
        for (let link of links) {
            if (link.startChar === clickedNoteStartChar) {
                console.log("abcClickListener", "Linked note is clicked.", "startChar:", link.startChar);
                window.open(SCRAPBOXURL + link.pageTitle);
                return
            }
        }

        const ABC = inputEl.value;
        inputEl.value = addLinkToABC(ABC, clickedNoteStartChar);
        onInput();

    };
};

const isLink = (links: Link[], startChar: string): boolean => {
    for (let link of links) {
        if (link.startChar === Number(startChar)) {
            return true
        }
    }
};

const render = (abc: string, inputEl: HTMLInputElement, links: Link[]): void => {
    const options = {
        clickListener: generateClickListener(inputEl, links),
        add_classes: true
    };
    const tuneObjectArray = abcjs.renderAbc("svgoutput", abc, options);
    console.log("render", "tuneObjectArray", tuneObjectArray);

    //リンクをハイライト
    const voices = tuneObjectArray[0].lines[0].staff[0].voices;
    for (let voice of voices) {
        for (let element of voice) {
            if (!element.startChar) continue;
            if (isLink(links, element.startChar)) {
                element.abselem.highlight(undefined, LINK_HIGHLIGHT_COLOR);
            }
        }
    }
};

inputEl.addEventListener("input", onInput);
