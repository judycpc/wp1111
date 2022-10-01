
let attendees = document.getElementsByClassName("attendee");
let anchored = document.getElementById("anchored");
let isAnchored = true;

for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    
    attendee.firstElementChild.firstElementChild.onclick = () => {
        attendee.parentNode.removeChild(attendee);
    }

    attendee.children[1].lastElementChild.onclick = () => {
        if (isAnchored === true) {
            // swap name
            let temp = attendee.lastElementChild.innerHTML;
            attendee.lastElementChild.innerHTML = anchored.lastElementChild.lastElementChild.innerHTML;
            anchored.lastElementChild.lastElementChild.innerHTML = temp;
        
            // swap pic
            let temp2 = attendee.children[1].firstElementChild.outerHTML;
            attendee.children[1].firstElementChild.outerHTML = anchored.children[1].firstElementChild.firstElementChild.outerHTML;
            anchored.children[1].firstElementChild.firstElementChild.outerHTML = temp2;
            attendee.children[1].firstElementChild.setAttribute('class', 'circle pic');

            // check close
            if (attendee.lastElementChild.innerHTML === "你") {
                attendee.firstElementChild.firstElementChild.style.visibility = "hidden";
            } else {
                attendee.firstElementChild.firstElementChild.style.visibility = "visible";
            }
        }
    }    
}

let anchored_pill = document.getElementById('profile_pill');
anchored_pill.onclick = () => {
    isAnchored = false;
    const removed = anchored.parentNode.removeChild(anchored);
    let child = attendees[0].cloneNode(true);

    // name
    child.lastElementChild.innerHTML = removed.lastElementChild.lastElementChild.innerHTML;
    // pic
    child.children[1].firstElementChild.outerHTML = removed.children[1].firstElementChild.firstElementChild.outerHTML;
    child.children[1].firstElementChild.setAttribute('class', 'circle pic');
    // check close
    if (child.lastElementChild.innerHTML === "你") {
        child.firstElementChild.firstElementChild.style.visibility = "hidden";
    } else {
        child.firstElementChild.firstElementChild.style.visibility = "visible";
        child.firstElementChild.firstElementChild.onclick = () => {
            child.parentNode.removeChild(child);
        }
    }
    
    attendees[0].parentNode.appendChild(child);
    setMainStyle(isAnchored);
}

function setMainStyle(isAnchored) {
    let side = document.getElementById('side');
    if (isAnchored === false) {
        side.style.flex = "1";
        side.style.padding = "0.5em";
        side.style.justifyContent = "center";
        for (let i = 0; i < attendees.length; i++) {
            const attendee = attendees[i];

            attendee.style.width = "32%";
            attendee.style.height = "49%";
            attendee.style.margin = "0.5em";

            const pic = attendee.children[1].firstElementChild;
            pic.style.width = "8em";
            pic.style.height = "8em";
        }
    }
}