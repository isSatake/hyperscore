import * as abcjs from "abcjs";

type Link = {
    startChar: number,
    pageTitle: string
}

const SCRAPBOXURL = "https://scrapbox.io/stk-study-music-theory/";
const inputEl = document.getElementById("abcinput");

const parseLink = (abc: string): Link[] => {
    const parsedLinks: Link[] = [];
    const linkMached = abc.match(/%Links:.*/);
    console.log("parseLink", "linkMatched", linkMached);
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
        if(arr.length < 2) continue;
        parsedLinks.push({startChar: Number(arr[0]), pageTitle: arr[1]});
    }

    console.log("parseLink", "parsedLinks", parsedLinks);
    return parsedLinks;
};

const generateClickListener = (links: Link[]) => {
    return (abcElem, tuneNumber, classes) => {
        console.log("abcClickListener", abcElem, tuneNumber, classes);
        if (!abcElem.el_type || !links.length) {
            return
        }
        for (let link of links) {
            if (link.startChar === abcElem.startChar) {
                console.log("abcClickListener", "Linked note is clicked.", "startChar:", link.startChar);
                window.open(SCRAPBOXURL + link.pageTitle);
            }
        }
    };
};

const render = (abc: string, links: Link[]): void => {
    const options = {
        clickListener: generateClickListener(links),
        add_classes: true
    };
    abcjs.renderAbc("svgoutput", abc, options);
};

inputEl.addEventListener("input", e => {
    const ABC: string = (e.target as HTMLInputElement).value;
    render(ABC, parseLink(ABC));
});