document.addEventListener("DOMContentLoaded", function() {

    const showInvisible = window.showInvisible;

    if (!showInvisible) {
        return;
    }

    const dmNoteElements = document.getElementsByClassName('invisible');

    Array.from(dmNoteElements).forEach(function(element) {
        element.classList.remove('invisible');
    })
});