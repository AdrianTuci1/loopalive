Prompt: Dezvoltare "Digitakt Digital" cu Navigare și Design Patterns
Obiectiv: Dezvoltă o simulare software robustă a funcționalităților cheie ale unui Elektron Digitakt, integrând-o fluid în UI-ul existent al aplicației "Loop Alive". Nu vei utiliza MIDI extern, ci vei recrea logica și interfața de control digital, punând accent pe utilizarea săgeților pentru navigare și selecție, și aplicând Design Patterns pentru o arhitectură curată și mentenabilă.

I. Arhitectura de Bază și Secvențiator
Arhitectura Track-urilor:

Implementează conceptul de 8 track-uri audio pentru gestionarea sample-urilor/loop-urilor. Fiecare track trebuie să poată conține un sample încărcat și să aibă propriile setări de parametri.

Grila de Secvențiator Vizuală:

Afișează o grilă de 16 pași per track. Aceasta va fi principala interfață pentru programarea secvențelor.

Plasare/Ștergere Trig-uri: Permite utilizatorului să activeze/dezactiveze digital "trig-uri" (pași) pe grilă printr-o acțiune de "Select/Enter" atunci când cursorul este pe un pas. Un trig activ declanșează redarea sample-ului track-ului la pasul respectiv.

P-Locks Digitale (Parameter Locks): Când un trig este selectat (și activ), implementează posibilitatea de a ajusta digital următorii parametri, specifici doar acelui pas (trig):

Volum (Level)

Pitch (Tune)

Punct de Start Sample

Punct de End Sample

Decay (Amp Envelope)

Cutoff Filtru

Micro Timing: Implementează ajustarea subtilă înainte/înapoi a momentului de declanșare pentru fiecare pas (trig), oferind un control fin asupra "groove-ului".

II. Manipularea Sample-urilor și Efecte (Panouri Digitale)
Fiecare dintre următoarele secțiuni va reprezenta un "panou" digital cu controale virtuale (knob-uri, slidere) aplicabile track-ului selectat.

Panou "Sample" (SRC):

Funcționalitate de încărcare sample-uri în track-uri (gestionarea fișierelor audio).

Controale digitale (knob-uri/slidere virtuale) pentru:

Volum track global

Panoramă track global

Pitch track global

Start/End Point track global (pentru sample-ul încărcat)

Mod de redare (one-shot, loop continuu)

Reverse (redare inversă a sample-ului)

Panou "Filter" (FLTR):

Controale digitale pentru Cutoff și Resonance ale filtrului aplicat track-ului.

Selectare tip filtru (ex: Low-Pass, High-Pass).

Controale Attack/Decay pentru anvelopa filtrului.

Panou "Amplifier" (AMP):

Controale digitale pentru:

Volum track global

Panoramă track global

Overdrive digital (simularea distorsiunii)

Bit Reduction

Sample Rate Reduction

Controale Attack/Decay/Hold/Release pentru anvelopa de volum a track-ului.

Panou "LFO" (Low-Frequency Oscillator):

Controale digitale pentru Waveform (Sine, Square, Triangle), Speed, Depth.

Funcționalitate de mapare LFO la parametri selectabili ai track-ului (ex: Pitch, Volum, Cutoff filtru, Panoramă).

Efecte Master (REVERB, DELAY):

Implementează efecte digitale de Reverb și Delay la nivel de master (aplicate mixului general al track-urilor).

Controale globale digitale pentru Time/Decay, Feedback și Mix pentru fiecare efect.

Controale digitale (send-uri) per track pentru a regla cât semnal din fiecare track este trimis către aceste efecte master.

III. Control Transport și Navigare UI
Control Transport:

Controale digitale (butoane/input numeric) pentru Tempo (BPM) și Swing.

Butoane digitale Play/Stop pentru controlul redării secvențiatorului.

Navigare cu Săgeți și Cursor Digital (Integrare cu UI-ul existent):

Cursor Vizual pe Grilă: Implementează un cursor vizual (ex: un chenar sau o evidențiere a fundalului) pe grila de secvențiator a track-ului curent. Acest cursor este controlat de săgețile Stânga/Dreapta pentru a naviga între pași.

Schimbare Track: Săgețile Sus/Jos vor schimba track-ul audio selectat (mutând vizual cursorul pe rândul corespunzător de pași și actualizând panourile de parametri pentru noul track).

Acțiune "Select/Enter":

Când cursorul este pe un pas: Activează/Dezactivează trig-ul.

Dacă trig-ul este deja activ și butonul "Select/Enter" este apăsat din nou: Intră în "modul de editare P-Lock" pentru acel pas.

În "modul de editare P-Lock": Dacă săgețile au focalizat un parametru, "Select/Enter" poate confirma selecția sau activa editarea valorii.

Acțiune "Back/Cancel":

Ieșire din "modul de editare P-Lock" și revenire la navigarea pe grilă.

Navigare înapoi în ierarhia meniului (ex: de la un sub-meniu la panoul principal).

Ajustare Parametri cu Săgețile: Când un control digital (knob/slider virtual) este "focalizat" (fie prin click, fie prin navigarea cursorului în modul editare P-Lock), săgețile Sus/Jos vor ajusta valoarea acelui parametru. Săgețile Stânga/Dreapta pot naviga între controale pe aceeași pagină de parametri.

Schimbare Pagini de Parametri: Definește un mecanism clar (ex: folosind săgeți într-un mod dedicat sau butoanele specifice existente în UI) pentru a comuta între panourile de control (Sample, Filter, Amp, LFO, Reverb, Delay).

IV. Interfața Utilizator (UI/UX) și Feedback Vizual
Controale Digitale Vizibile: Utilizează reprezentări grafice pentru knob-uri, slidere sau input-uri numerice pentru toți parametrii menționați, imitând pe cât posibil aranjamentul și aspectul controalelor de pe Digitakt.

Feedback Vizual Dinamic și Intuitiv:

Grila de Secvențiator: Pașii activi sau cei care redau în prezent ar trebui să se lumineze distinct. Cursorul pe grilă trebuie să fie clar vizibil și să se miște fluid.

Knob-uri/Slidere: Atunci când o valoare este ajustată, valoarea numerică a parametrului sau o bară de progres ar trebui să se actualizeze în timp real, oferind feedback imediat.

Vizualizare Sample: Când un track este selectat, afișează forma de undă a sample-ului încărcat cu indicatori vizuali pentru Start/End Point, care pot fi ajustați interactiv.

Indicator Track Curent: Un indicator vizual clar (ex: text, evidențiere colorată) al track-ului audio selectat în prezent.

BPM și Stare Play/Stop: Afișate permanent într-o zonă vizibilă a interfeței.

Mod Editare P-Lock: Afișează clar că ești în acest mod (ex: un mesaj pe ecran, o schimbare subtilă de culoare a UI-ului relevant) și evidențiază parametrii ce pot fi editați în contextul P-lock-ului.

V. Arhitectură Software și Design Patterns
Aplică următoarele Design Patterns pentru a asigura o structură modulară, extensibilă și ușor de mentenut:

State Pattern:

Utilizare: Gestionează diferitele stări ale aplicației, definind cum se comportă UI-ul și logica la diferite interacțiuni. Exemple de stări: NormalState (navigare pe grilă, selecție track), P-LockEditState (ajustare parametri per pas), TrackSelectState (focalizare pe schimbarea track-ului), ParameterPageSelectState (focalizare pe schimbarea panoului de parametri). Fiecare stare va implementa o interfață comună pentru a gestiona input-ul (săgeți, "Select/Enter").

Command Pattern:

Utilizare: Încapuslează fiecare acțiune declanșată de UI (ex: apăsarea unui buton, mișcarea unei săgeți, click pe un knob virtual) într-un obiect Command (ex: MoveCursorRightCommand, ToggleTrigCommand, AdjustParameterCommand). Un Command Processor va executa aceste comenzi, decuplând logica de UI. Aceasta facilitează funcționalități precum Undo/Redo.

Observer Pattern:

Utilizare:

Logica Secvențiatorului (Subject): Obiectul care gestionează starea trig-urilor va notifica elementele UI ale grilei când starea trig-urilor se schimbă (activ/inactiv, redare).

Parametrii Track-urilor (Subjects): Fiecare obiect parametru (ex: TrackVolume, FilterCutoff) va fi un Subject care notifică controalele UI (knob-uri/slidere virtuale) când valorile lor se modifică (fie prin interacțiunea utilizatorului, fie prin aplicarea P-lock-urilor).

Cursorul (Subject): Obiectul care gestionează poziția cursorului va notifica elementele UI relevante pentru a actualiza poziția sa vizuală pe grilă.

Strategy Pattern (Opțional, dar recomandat pentru flexibilitate):

Utilizare: Pentru implementarea diferitelor moduri de redare a sample-urilor (ex: OneShotPlaybackStrategy, LoopPlaybackStrategy, PingPongPlaybackStrategy). Aceasta permite schimbarea ușoară a comportamentului de redare fără a modifica logica de bază a track-ului.

Factory Method (Opțional, pentru complexitate crescută și extensibilitate):

Utilizare: Dacă anticipezi adăugarea de noi tipuri de track-uri în viitor (ex: track-uri MIDI virtuale, track-uri de sinteză internă), folosește un Factory Method pentru a gestiona crearea acestor obiecte de track, abstractizând procesul de instanțiere.