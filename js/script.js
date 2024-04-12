function modifyContent(name) {
    const mdConv = new showdown.Converter();

    let elem = document.getElementById("mainContent")

    elem.textContent = "Cargando..."

    fetch(`pages/${name}.md`, {
        mode: "same-origin",
        credentials: "same-origin",
        referrerPolicy: "same-origin"
    }).then((data) => 
        data.text()
    ).then((text) => {
        console.log("begin" + text + "end")
        elem.textContent = mdConv.makeHtml(text)
    }).catch((e) => {
        elem.textContent = "Error al cargar!\n" + e
    })
}

let lastActiveLinkTo;

document.querySelectorAll(".linkto").forEach((link) => {
    // Renderiza los .md
    link.onclick = (e) => {
        e.preventDefault()

        modifyContent(e.target.getAttribute("render"))

        link.classList.add("active")

        if (lastActiveLinkTo !== undefined) {
            lastActiveLinkTo.classList.remove("active")
        }

        if (lastActiveLinkTo !== link) {
            lastActiveLinkTo = link;
        }
    }

    link.classList.add("clickable-text")
    link.classList.add("text-white")
})

document.querySelectorAll(".cst-nav-text").forEach((elemcls) => {
    // Clase global
    // Añadir margen - 2
    // Redondear bordes
    // Color azul
    // Texto centrado
    // Añadir padding - 2
    elemcls.classList.add("m-2")
    elemcls.classList.add("rounded")
    elemcls.classList.add("bg-secondary")
    elemcls.classList.add("text-center")
})

modifyContent("principal")