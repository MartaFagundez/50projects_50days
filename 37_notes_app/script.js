{
    // Setear los componentes de la app
    setModal();
    setFooter();
    
    // Generar las notas
    renderNotes();

    

    // ======================= FUNCIONES ============================ //
    // ============================================================== //

    // =========== Renderizar las notas a partir del LS ============= //
    function renderNotes() {
        let notesInLS = localStorage.getItem('notes');

        // Si hay notas en el localStorage
        if(notesInLS) {
            // Renderizarlas
            JSON.parse(notesInLS).forEach(note => addNewNote(note.content, note.color, note.id));
            // ... y formatearlas
            formatNotes();
        }
    }



    // ================== Añadir una nueva nota ================== //
    function addNewNote(mkdText = "", color = "white", id) {
        if (!id) {
            // Generar un id único
            id = Date.now();
        }

        const note = document.createElement("div");
        note.setAttribute("id", id);
        note.setAttribute("data-color", color);
        note.classList.add("note", color, "grid-item");
    
        note.innerHTML = `
        <!-- Note Menu -->
        <div class="note_menu hidden" id="noteMenu">
            <i class="fa-regular fa-pen-to-square" id="editBtn"></i>
            <i class="fa-regular fa-trash-can" id="deleteBtn"></i>
        </div>

        <!-- Note Nav -->
        <div class="note_nav flexRowEnd">
            <i class="fa-solid fa-ellipsis-vertical" id="menuBtn"></i>
        </div>

        <!-- Note Textarea -->
        <div class="note_textareaContainer flexRowCenter">
            <textarea class="note_textarea" id=${id}>${mkdText}</textarea>
        </div>

        <!-- Note Text -->
        <div class="note_text flexColumnStart"></div>

        <!-- Note Footer -->
        <div class="note_footer hidden" id="noteFooter">
            <p>...</p>
        </div>
        `

        // Añadir LISTENERS a los botones de la nota ================= //
        const noteMenu = note.querySelector("#noteMenu");
        const menuBtn = note.querySelector("#menuBtn");
        const editBtn = note.querySelector("#editBtn");
        const deleteBtn = note.querySelector("#deleteBtn");

        // Listener para desplegar el menú de la nota
        menuBtn?.addEventListener("click", () => noteMenu?.classList.toggle("hidden"));
    
        // Listener para borrar la nota
        deleteBtn?.addEventListener("click", () => {
            note.remove();
            updateLS();
            setMasonryGrid();
        })
    
        // Listener para abrir el modal para editar la nota
        editBtn?.addEventListener("click", () => {
            // Ocultar el menú de la nota
            noteMenu?.classList.toggle("hidden");

            // Guardar el id de la nota en el LS
            localStorage.setItem("noteInEdition", id);
            
            const modalTextarea = document.getElementById("modalTextarea");
            const modalPreviewText = document.getElementById("modalPreviewText");
            const noteTextarea = note.querySelector(".note_textarea");
            // Cargar el texto de la nota en el modal
            if(modalTextarea && noteTextarea && modalPreviewText) {
                modalTextarea.value = noteTextarea.value;
                modalPreviewText.innerHTML = marked.parse(modalTextarea.value);
                setPreviewBgColor(color || "white");
            }

            const modalContainer = document.getElementById("modalContainer");
            // Abrir el modal
            if (!modalContainer?.classList.contains("expanding")) {
                modalContainer?.classList.add("expanding");
            }
            if (modalContainer?.classList.contains("out")) {
                modalContainer?.classList.remove("out");
            }
        });
    
        // Agregar la nota a la UI
        document.querySelector(".notes.grid")?.prepend(note);
    }   
    


    // ================= Transformar el texto Mkd a Html ================= //
    function formatNotes() {
        const notes = document.querySelectorAll(".note");

        notes.forEach(n => {
            // Transformar el texto mkd en html
            const text = n.querySelector(".note_text");
            const textarea = n.querySelector(".note_textarea");
            if (textarea && text) {
                text.innerHTML = marked.parse(textarea.value);
            }

            // Gestión del footer
            const noteFooter = n.querySelector("#noteFooter");
            // Si el texto de la nota excede su altura...
            if (isTextOverflowing(text)) {
                // Hacer visible el footer
                noteFooter?.classList.remove("hidden");
            }
            else {
                noteFooter?.classList.add("hidden");
            }
        });

        setMasonryGrid();
    }


    // ============= Ajustar las notas en una grilla Masonry =========== //
    function setMasonryGrid() {
        const grid = document.querySelector('.grid');
        const msnry = new Masonry( grid, {
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
        });
    }



    // ====================== Setear el Modal ====================== //
    function setModal() {
        const modalContainer = document.getElementById("modalContainer");
        const modalTextarea = document.getElementById("modalTextarea");
        const modalPreviewText = document.getElementById("modalPreviewText");
        const closeBtn = document.getElementById("closeBtn");
        const saveBtn = document.getElementById("saveBtn");

        if (modalTextarea && modalPreviewText) {
            // Cargar la preview
            modalPreviewText.innerHTML = marked.parse(modalTextarea.value);

            // Agregar listener para mantener sincronía entre textarea y preview
            modalTextarea?.addEventListener("input", () => {
                modalPreviewText.innerHTML = marked.parse(modalTextarea.value);
            });
        }        

        closeBtn?.addEventListener("click", () => {
            localStorage.removeItem("noteInEdition");

            modalContainer?.classList.add("out");
        });

        saveBtn?.addEventListener("click", () => {
            const noteInEditionId = localStorage.getItem("noteInEdition");

            // Si se está editando una nota...
            if (noteInEditionId) {
                const notesTextareas = document.querySelectorAll(".note_textarea");
                notesTextareas.forEach(nt => {
                    if (Number(nt.getAttribute("id")) === Number(noteInEditionId)) {
                        nt.value = modalTextarea?.value;
                    }
                    
                });
                
                localStorage.removeItem("noteInEdition");
            }
            // Si se está creando una nueva nota...
            else {
                addNewNote(modalTextarea?.value, modalPreviewText?.getAttribute("data-color") || "white");
            }

            updateLS();
            formatNotes();

            modalContainer?.classList.add("out");
        });
    }



    // ======= Setear el footer de la app ======= //
    function setFooter() {
        const footer = document.querySelector("footer");
        const colorBtns = footer?.querySelectorAll(".color");
        const btnAdd = footer?.querySelector("#btnAdd");
        const footerInfo = footer?.querySelector(".footer_nav_info");
        const footerNavBtns = footer?.querySelector(".footer_nav_buttons");

        // Setear botón Add
        btnAdd?.addEventListener("click", () => {
            footerInfo?.classList.toggle("hidden");
            footerNavBtns?.classList.toggle("down");

            colorBtns?.forEach(btn => {
                btn.classList.toggle("visible");
            });
        })

        // Setear botones de colores
        colorBtns?.forEach(button => {
            button.addEventListener("click", () => {
                
                footerInfo?.classList.toggle("hidden");
                footerNavBtns?.classList.toggle("down");

                colorBtns?.forEach(btn => {
                    btn.classList.toggle("visible");
                });
                
                const modalTextarea = document.getElementById("modalTextarea");
                const modalPreviewText = document.getElementById("modalPreviewText");
                
                // Resetear la textarea y la preview del modal
                if(modalTextarea && modalPreviewText) {
                    modalTextarea.value = "";
                    modalPreviewText.innerHTML = marked.parse(modalTextarea.value);
                    setPreviewBgColor(button.getAttribute("id") || "white");
                }

                const modalContainer = document.getElementById("modalContainer");
                // Abrir el modal
                if (!modalContainer?.classList.contains("expanding")) {
                    modalContainer?.classList.add("expanding");
                }
                if (modalContainer?.classList.contains("out")) {
                    modalContainer?.classList.remove("out");
                }
            });
        });

    }


    // ======== Setear el color de fondo de la preview del modal ======= //
    function setPreviewBgColor(colorClass) {
        const modalPreviewText = document.getElementById("modalPreviewText");
        modalPreviewText?.setAttribute("data-color", colorClass);

        const colorClasses = ["white", "yellow", "red", "green", "blue"];

        // Quitar el nombre de clase de los demás colores
        colorClasses.filter(cc => cc !== colorClass).forEach(cc => {
            modalPreviewText?.classList.remove(cc);
        });

        // Añadir la clase del color correspondiente
        modalPreviewText?.classList.add(colorClass);
    }



    // ======= Verificar si el texto de la nota excede su altura ======= //
    function isTextOverflowing(element) {
        return (element.clientHeight < element.scrollHeight);
    }



    // ======================= Actualizar el LS ======================= //
    function updateLS() {
        const notesInDom = document.querySelectorAll(".note");

        const notes = [];
    
        notesInDom.forEach(noteInDom => notes.push(
            {
                id: noteInDom.getAttribute("id"),
                content: noteInDom.querySelector(".note_textarea")?.value,
                color: noteInDom.getAttribute("data-color")
            }
        ));

        // Ordenar las notas por id (que se obtuvo con la fecha), de la más antigua a la más reciente
        // Esto es importante porque en la función renderNotes, se va a ir agregando cada nota al principio del contenedor
        notes.sort((a, b) => a.id - b.id);
    
        localStorage.setItem('notes', JSON.stringify(notes));
    }

}