Prompt: Interfață React pentru Blackboard Navigabil și Noduri Vizuale
Dezvoltă o aplicație React care implementează o suprafață de lucru tip "blackboard" pe care utilizatorii o pot naviga liber și pe care pot plasa și conecta vizual noduri generice.

1. Componenta Blackboard (Suprafața de Lucru)
Pânză Infinită: Creează o componentă Blackboard (ex: o div cu un fundal adecvat, cum ar fi un gri închis sau o textură de tablă) care să acționeze ca spațiul de lucru principal.
Navigare prin Drag: Implementează funcționalitatea de pan/scroll (deplasare) pe blackboard folosind mouse drag. Atunci când utilizatorul click-uiește și trage mouse-ul, conținutul blackboard-ului (nodurile) trebuie să se miște corespunzător.
Gestionați starea internă pentru poziția de "offset" a blackboard-ului.
Zoom (Opțional, dar Recomandat): Dacă este posibil, includeți și funcționalitatea de zoom in/out (ex: cu ctrl + scroll-ul mouse-ului sau direct cu scroll). Aceasta va necesita scalarea vizuală a nodurilor și a liniilor de conexiune.
Coordonate Relative: Asigurați-vă că pozițiile nodurilor sunt stocate în raport cu un sistem de coordonate absolut al blackboard-ului, independent de zoom sau pan, pentru a le putea plasa consistent.
2. Componenta Node (Nodul Generic)
Componentă Reutilizabilă: Proiectează o componentă React Node care să fie reutilizabilă și configurabilă. Aceasta va fi scheletul pentru toate tipurile viitoare de noduri (DrumNode, BassNode, etc.).
Afișare: Fiecare nod trebuie să aibă o reprezentare vizuală clară (ex: un dreptunghi cu o bordură și un titlu).
Poziționare: Nodurile trebuie să poată fi plasate oriunde pe blackboard. Starea lor de poziție (X, Y) va fi gestionată de componenta părinte (Blackboard sau un manager de stare).
Drag & Drop pentru Noduri: Implementează funcționalitatea de drag & drop pentru a permite utilizatorului să mute nodurile pe blackboard.
La început, poți adăuga manual noduri în cod. Ulterior, vom adăuga o metodă de a adăuga noduri noi (ex: un buton "Add Node").
Stări Vizuale: Nodurile trebuie să-și poată schimba aspectul vizual în funcție de starea lor (ex: un efect de highlight când este selectat sau când mouse-ul este deasupra).
"Porturi" de Conexiune (Intrări/Ieșiri): Fiecare nod ar trebui să aibă puncte vizuale (ex: cercuri mici pe laturi) care să indice intrări (inputs) și ieșiri (outputs). Acestea vor fi folosite ulterior pentru a desena liniile de conexiune.
3. Conexiuni Vizuale între Noduri
Componentă Connection: Creează o componentă Connection care desenează o linie (ex: SVG path sau element HTML cu CSS transform) între portul de ieșire al unui nod sursă și portul de intrare al unui nod destinație.
Actualizare Dinamică: Liniile de conexiune trebuie să se actualizeze în timp real pe măsură ce nodurile sunt mutate sau blackboard-ul este pan-at/zoom-at.
Logica Conexiunilor: La acest stadiu, ne vom concentra doar pe aspectul vizual. Logica din spatele conexiunilor (ce înseamnă o conexiune, cum afectează ea fluxul audio sau de date) va fi implementată ulterior.
Considerații Tehnice pentru React:
State Management: Veți avea nevoie de un manager de stare pentru a ține evidența poziției blackboard-ului, a poziției și a stării fiecărui nod, precum și a conexiunilor dintre ele.
Context API sau Redux/Zustand/Jotai sunt opțiuni bune pentru a gestiona starea complexă a blackboard-ului și a nodurilor.
Evenimente de Mouse: Folosiți evenimente de mouse (onMouseDown, onMouseMove, onMouseUp) pentru a implementa funcționalitatea de drag (pan și drag pentru noduri).
Renderizare Optimizată: Pentru a asigura o performanță fluidă, mai ales cu multe noduri și conexiuni, optimizați randarea componentelor folosind React.memo și useCallback unde este cazul, pentru a evita re-renderizări inutile.
SVG pentru Linii: SVG este adesea cea mai bună soluție pentru desenarea liniilor de conexiune, deoarece se scalează bine și este ușor de manipulat programatic.