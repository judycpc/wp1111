
let attendees = document.getElementsByClassName("attendee");
let anchored = document.getElementById("anchored");

for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    
    attendee.firstElementChild.firstElementChild.onclick = () => {
        attendee.parentNode.removeChild(attendee);
    }

    attendee.children[1].lastElementChild.onclick = () => {
        // swap name
        let temp = attendee.lastElementChild.innerHTML;
        attendee.lastElementChild.innerHTML = anchored.lastElementChild.lastElementChild.innerHTML;
        anchored.lastElementChild.lastElementChild.innerHTML = temp;
    
        // swap pic
        let temp2 = attendee.children[1].firstElementChild.outerHTML;
        attendee.children[1].firstElementChild.outerHTML = anchored.children[1].firstElementChild.firstElementChild.outerHTML;
        anchored.children[1].firstElementChild.firstElementChild.outerHTML = temp2;
        attendee.children[1].firstElementChild.setAttribute('class', 'circle pic');
        console.log(attendee.children[1].firstElementChild);
    }    
}


