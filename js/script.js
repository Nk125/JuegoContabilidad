let lastElemLoadedName

function modifyContent(name) {
	const mdConv = new showdown.Converter();

	if (lastElemLoadedName === name) {
		return
	}
	else {
		lastElemLoadedName = name
	}

	let elem = document.getElementById("mainContent")

	//elem.textContent = "Cargando..."

	fetch(`pages/${name}.md`, {
		mode: "same-origin",
		credentials: "same-origin",
		referrerPolicy: "same-origin",
		redirect: "follow"
	}).then((data) =>
		data.text()
	).then((text) => {
		elem.innerHTML = mdConv.makeHtml(text)
	}).catch((e) => {
		elem.textContent = "Error al cargar!"
	})
}

function toggleColMainContent(isShown) {
	let mainContent = document.getElementById("mainContent")

	if (isShown) {
		mainContent.classList.remove("col-12")
		mainContent.classList.add("col-8")
	}
	else {
		mainContent.classList.add("col-12")
		mainContent.classList.remove("col-8")
	}
}

let lastActiveLinkTo;

document.querySelectorAll(".linkto").forEach((link) => {
	// Renderiza los .md
	link.onclick = (e) => {
		e.preventDefault()

		modifyContent(e.target.getAttribute("render"))

		link.parentNode.classList.add("bg-info")
		link.parentNode.classList.remove("bg-primary")


		if (lastActiveLinkTo !== undefined && lastActiveLinkTo !== link) {
			lastActiveLinkTo.parentNode.classList.remove("bg-info")
			lastActiveLinkTo.parentNode.classList.add("bg-primary")
		}

		lastActiveLinkTo = link;

	}

	link.classList.add("clickable-text")
	link.classList.add("text-white")
})

document.querySelectorAll(".cst-nav-text").forEach((elemcls) => {
	// Clase global
	// Añadir margen - 2
	// Redondear bordes
	// Texto centrado
	// Añadir padding - 2
	elemcls.classList.add("m-2")
	elemcls.classList.add("rounded")
	elemcls.classList.add("bg-secondary")
	elemcls.classList.add("d-flex")
	elemcls.classList.add("justify-content-center")
	elemcls.classList.add("p-1")
})

document.querySelectorAll(".cst-nav-text a").forEach((elemLink) => {
	let elemTgt = elemLink.parentNode.classList;
	elemTgt.remove("bg-secondary")
	elemTgt.add("bg-primary")
})

document.querySelector(".linkto").click()
