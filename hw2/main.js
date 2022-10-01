let isAnchored = true;
let attendees = document.getElementsByClassName("attendee");
let anchored = document.getElementById("anchored");
let side = document.getElementById('side');
let anchored_pill = document.getElementById('profile_pill');

function attendeeOnClick(attendee) {
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
    } else {
        isAnchored = true;
        const removed = attendee.parentNode.removeChild(attendee);
        let toAnchored = anchored.cloneNode(true);

        // name
        toAnchored.lastElementChild.lastElementChild.innerHTML = removed.lastElementChild.innerHTML;
        // pic
        toAnchored.children[1].firstElementChild.firstElementChild.outerHTML = removed.children[1].firstElementChild.outerHTML;
        toAnchored.children[1].firstElementChild.firstElementChild.setAttribute('class', 'circle');
        toAnchored.children[1].firstElementChild.firstElementChild.removeAttribute('style');
        
        side.parentNode.insertBefore(toAnchored, side);
        anchored = document.getElementById("anchored");
        side = document.getElementById('side');
        attendees = document.getElementsByClassName("attendee");
        anchored_pill = document.getElementById('profile_pill');
        anchored_pill.onclick = () => anchoredPillOnClick();
        setMainStyle(isAnchored);
    }
}

for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    
    attendee.firstElementChild.firstElementChild.onclick = () => {
        attendee.parentNode.removeChild(attendee);
        checkRemain(isAnchored);
    }

    attendee.children[1].lastElementChild.onclick = () => attendeeOnClick(attendee); 
}

function anchoredPillOnClick() {
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
            checkRemain(isAnchored);
        }
    }
    
    attendees[0].parentNode.appendChild(child);
    setMainStyle(isAnchored);

    const attendee = attendees[attendees.length - 1];
    attendee.children[1].lastElementChild.onclick = () => attendeeOnClick(attendee);
}

anchored_pill.onclick = () => anchoredPillOnClick();


function setMainStyle(isAnchored) {
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
    } else {
        side.removeAttribute('style');
        for (let i = 0; i < attendees.length; i++) {
            const attendee = attendees[i];
            attendee.removeAttribute('style');

            const pic = attendee.children[1].firstElementChild;
            pic.removeAttribute('style');
        }
    }
}

function remain(isAnchored) {
    return isAnchored ? (1 + document.getElementsByClassName("attendee").length) : document.getElementsByClassName("attendee").length;
}

function checkRemain(isAnchored) {
    if (remain(isAnchored) === 1) {
        if (isAnchored === false) {
            document.getElementsByClassName("attendee_pill")[0].click();
        }

        anchored = document.getElementById("anchored");
        // side = document.getElementById('side');
        side.parentNode.removeChild(side);
        anchored.style.flex = "1";
        anchored_pill.onclick = () => {};
    }
}