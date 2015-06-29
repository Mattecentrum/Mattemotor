# Guide till räknefunktionen på Matteboken.se

Skriven av Marcus Näslund (marcus@mattecentrum.se)

Uppdaterad 2014-09-01

# 1. Inledning

Under hela dokumentet kommer personer som är tänkta att räkna uppgiften benämnas med "eleven". Exempeluppgifter har hållits så matematiskt enkla som möjligt, men förutsätter i vissa fall viss matematisk kunskap. Å andra sidan försöker du kanske inte skriva räkneuppgifter utan matematiska kunskaper.

## 1.1 Vad som krävs

Även om räknefunktionen inte fordrar några riktiga programmeringskunskaper är åtminstone en bekantskap med programmering en mycket stark fördel. För att redigera uppgifterna behöver du bara inloggningsuppgifter till Umbraco-systemet, som Matteboken.se använder.

## 1.2 Tekniska detaljer

Varje uppgift är en textfil I JSON-format som tolkas i en räknefunktionsmotor skriven i Javascript (AngularJS), vilket också gör att den matematiska funktionalitet inbyggd i Javascript går att utnyttja i uppgifterna. Det CMS som används för Matteboken.se är Umbraco.

Grafer och allt som hör till dem ritas upp med hjälp av jsxgraph. LaTeX-kod renderas upp med hjälp av MathJax.

Förmodligen ingår även en hel del magi för att få allt detta att fungera, vilket Trolldomsministeriet valt att inte kommentera.

## 1.3 Att komma igång

Under varje avsnitt i Umbraco ligger en mapp "Uppgifter". Om den inte existerar, högerklicka på avsnittet, välj "Create" och skriv in "Uppgifter". För att skapa en ny uppgift, högerklicka på den nya mappen "Uppgifter" och välj "Create".  Se till att publicera hela mappen "Uppgifter" för att uppgifterna ska synas på hemsidan.

# 2. Hur uppgifter är uppbyggda

## 2.1 Uppgifter

Följande är ett grundläggande exempel på hur en uppgift är uppbyggd:

{

    "name":"Lär dig addition",

    "exercise":"Räkna ut 2 kg + 0,5 kg.",

    "inputtype":"field",

    "expectedanswer":{"Svar:":"2,5"}

}

Uppgiften ser då ut såhär:

<BILD>

På första raden, vid "name", står uppgiftens titel inom citationstecken. Därefter följer uppgiftstexten, vid "exercise".

Det finns flera olika typer av uppgifter (se avsnitt 3), i detta fall valde vi typen "field", vilket ger en enkel inmatningsruta och en svarsknapp.

Det förväntade svaret står vid "expectedanswer". Först har vi texten "Svar:" (se avsnitt 3 för anledningen till detta) och sedan det förväntade svaret 2,5.

Varje rad måste avslutas med ett kommatecken, förutom den sista.

# 2.2 Mer detaljer

För denna typ av uppgift kan vi välja att ange vilken enhet som svaret ska ha vid "answerformat", och kilogram är ju det självklara valet, så därför skriver vi "kg". Om denna rad inte finns med så är svaret som innan utan enhet.

{

    "name":"Lär dig addition",

    "exercise":"Räkna ut 2 kg + 0,5 kg.",

    "inputtype":"field",

    "answerformat":"kg",

    "expectedanswer":{"Svar:":"2,5"},

}

Vi kan också välja att typsätta uträkningen med hjälp av LaTeX. Antingen med \\( LaTeX-kod \\) eller $$ LaTeX-kod $$. Den förra renderar formeln som "inline", det vill säga på samma rad som resten av texten, medan den senare lägger uträkningen på sin egen, centrerade, rad. Vi väljer här det första exemplet. Såhär ser uppgiften nu ut:

{

    "name":"Lär dig addition",

    "exercise":"Räkna ut $$2 kg + 0,5 kg$$.",

    "inputtype":"field",

    "answerformat":"kg",

    "expectedanswer":{"Svar:":"2,5"},

}

<BILD>

Notera att uträkningen nu renderas som LaTeX-kod, samt att "kg" har dykt upp som enhet bredvid inmatningsrutan. För mer information om LaTeX, som krävs för att skriva mer komplicerade formler, se till exempel [http://en.wikibooks.org/wiki/LaTeX](http://en.wikibooks.org/wiki/LaTeX).

Det går också att lägga in bilder genom att någonstans lägga in en rad med taggen "image" följt av en länk till bilden som ska visas.

"image":"http://...",

Adressen kan gå till en extern hemsida, men det kan göra ägaren till hemsidan lite sur. Det rekommenderas att lägga in bilderna i det lokala systemet. Gör det genom att klicka på "Media" i nedre vänstra hörnet. Markera en mapp i kolumnen till vänster och klicka på den lilla gröna ikonen under fliken "Contents" för att ladda upp en fil.

När bilden laddats upp, markera den och välj fliken "Properties". Därunder finns länken till bilden du kan använda.

## 2.3 Variation

Det rekommenderas att skriva uppgifter som på ett automatiskt vis kan varieras så mycket som möjligt, så att uppgiften kan göras igen utan att den blir exakt likadan.

För detta ändamål använder vi variabler. Istället för att uppgiften ska gälla 2 kg + 0,5 kg gör vi om den till att handla om x kg + 0,y kg, där x och y är variabler. De definieras såhär:

"variables":{"x":[1,9],"y":[1,9]}

Vi har nu två stycken variabler, x och y. Varje gång uppgiften laddas kommer deras värden att slumpas mellan talen 1 och 9.  För att använda dem i text skriver vi variabelns namn innanför {{ }} för att visa att vi menar variabeln, och inte bokstaven x eller y. Såhär blir hela uppgiften:

{

    "name":"Lär dig addition",

    "exercise":"Räkna ut $$ {{x}} kg + 0,{{y}} kg $$",

    "inputtype":"field",

    "variables":{"x":[1,9],"y":[1,9]},

    "answerformat":"kg",

    "expectedanswer":{"Svar:":"{{x + y/10}}"}

}

<BILD>

I det här fallet kommer, när uppgiften laddas, värden för x respektive y att slumpas fram, och skrivas in på respektive plats där {{x}} och {{y}} står i uppgiftstexten. Notera att rätt svar alltså inte alltid är 2,5, men det är alltid x + y/10, vilket vi skrivit vid "expectedanswer". Du kan, som du ser, skriva kompletta aritmetiska uttryck innanför {{ }}-taggarna, inklusive bland annat trigonometriska funktioner. Variabler kan också användas på andra sätt, bland annat för att slumpa fram text och decimaltal. Se avsnitt 4 för mer detaljer kring variabler och matematiska beräkningar.

## 2.4 Feedback

Eleven förtjänar att få veta mer information när svaret blivit fel, men ibland passar det också med en djupare förklaring när svaret blivit rätt. Ha alltid i åtanke att lärandet står i fokus, inte att svara rätt på uppgifterna. Som exempel lägger vi till speciell feedback både vid fel och rätt svar:

{

    "name":"Lär dig addition",

    "exercise":"Räkna ut $$ {{x}} kg + 0,{{y}} kg $$",

    "inputtype":"field",

    "variables":{"x":[1,9],"y":[1,9]},

    "answerformat":"kg",

    "expectedanswer":{"Svar:":"{{x + y/10}}"},

    "error":{"message":"Nu blev det inte rätt."},

    "correct":{"message":"Men nu blev det rätt."}

}


<BILDER AV FEEDBACK>

De sista två raderna ger meddelanden för fel respektive rätt svar. Vi kan även ge olika feedback för olika svar (eller svarsintervall). Det här detaljeras vidare i avsnitt 6.

## 2.5 Länkar

Det går utmärkt, och det rekommenderas, att länka nyckelord till motsvarande teoriavsnitt på matteboken.se. Länkar går att skapa både i uppgiftstexten och i all feedback.

Om, när eleven svarar fel, får följande feedback:

"error":{"message":"Öva på andragradsekvationer och försök igen."},

Är det mer värdefullt om ordet andragradsekvationer går till ett teoriavsnitt om andragradsekvationer (på rätt nivå). Gå in på matteboken.se, navigera fram till rätt teoriavsnitt, och kopiera adressen. Länkar skapas på samma sätt som i HTML, det vill säga:

<a href='Länk'>Text</a>

Så i det här fallet blir feedbacken:

"error":{"message":"Öva på <a href='http://www.matteboken.se/lektioner/matte-2/andragradsekvationer/andragradsekvationer'>andragradsekvationer</a> och försök igen."},

<BILD FÖRE OCH EFTER>

Notera att länkens adress står inom enkla citationstecken.

# 3. Olika typer av uppgifter

## 3.1 Field

I avsnitt 2 såg vi exempel på en uppgift av typen "field". Nu ska vi upptäcka lite mer av vad "field"-uppgifter kan göra för oss genom att ha flera olika svarsrutor. Vi gör en uppgift där eleven ska fylla i några olika tal med vissa egenskaper:

- Ã¯ÂÂ·.Ett positivt tal som ÃÂ¤r delbart med bÃÂ¥de 2 och 3.ÃÂ
- Ã¯ÂÂ·.Ett primtal mellan 10 och 20.ÃÂ
- Ã¯ÂÂ·.Ett negativt tal.ÃÂ

Den uppgiften skrivs såhär:

{

    "name":"Typer av tal",

    "exercise":"Fyll i ett tal som uppfyller respektive beskrivning.",

    "inputtype":"field",

    "expectedanswer":{"Positivt tal delbart med 2 och 3:":"{{answer>0 && answer%6==0?answer:6}}", "Ett primtal mellan 10 och 20:":["11", "13", "17", "19"], "Ett negativt tal":"{{answer>0 ? answer : -1}}"},

    "error":{"message":"Inte rätt."}

}

<BILD>

Notera den mycket långa raden vid "expectedanswer". Där har vi, separerade av kommatecken, lagt in de tre beskrivningarna och deras önskade svar.

Om uttrycken efter ser krångliga ut så får de sina förklaringar i avsnitt 4 och 6.

## 3.2 Multifield

När vi har flera inmatningsfält kan vi istället anvnända uppgifter av typen "multifield". Den ger oss mer frihet att sätta text mellan flera inmatningsrutor.

Vi gör ett exempel med att lösa en andragradsekvation med hjälp av pq-formeln. I det här fallet ska vi lösa x2+2x−8=0 ![](data:image/*;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWAAAADAAAABgAAAAYAAAADAAAADw8PAAlAAAADAAAAAEAAABUAAAAVAAAAO0GAADCAQAARAgAAGgDAAABAAAAAAAAAAAAAADtBgAAwgEAAAEAAABMAAAAAgAAAAAAAAAAAAAAAAAAAAAAAABQAAAAPQAAAFgBAAAiAAAADAAAAP////8UAAAADAAAAA0AAAAhAAAACAAAACUAAAAMAAAACgAAgCgAAAAMAAAAAQAAAFIAAABMAQAAAQAAAFr+//8AAAAAAAAAAAAAAACQAQAAAAAAAAAAAABUAGkAbgBvAHMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFgAAAAwAAAAYAAAAGAAAAAwAAAA8PDwAJQAAAAwAAAABAAAAVAAAAFQAAABFCAAAwgEAABgJAACDAwAAAQAAAAAAAAAAAAAARQgAAMIBAAABAAAATAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAUAAAADAAAADUAAAAIgAAAAwAAAD/////FAAAAAwAAAANAAAAIgAAAAwAAAD/////FAAAAAwAAAANAAAADgAAABQAAAAAAAAAEAAAABQAAAA=)
vilken ju har lösningen
x=1±9 ![](data:image/*;base64,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)
. Vi söker både talet före och under rot-tecknet, vilka ska skrivas in i två olika inmatningsfält.

När vi skriver en uppgift av typen "multifield" så måste vi fylla i ett fält som heter "inputformat" som beskriver hur inmatningsfälten ska placeras i relation till all annan text. I det här fallet blir det, med LaTeX-kod, såhär:

"inputformat":"\\(x = \\) [[input1]] \\(\\pm \\sqrt \\left( \\) [[input2]] \\( \\right) \\)"

Som du ser är [[input1]] och [[input2]] platshållare för de två inmatningsfälten. Du kan ha hur många som helst.

Hela uppgiften ser ut såhär:

{

    "name":"Lös andragradsekvationen",

    "exercise":"Lös andragradsekvationen $$x^2 + 2x – 8 = 0$$",

    "inputtype":"multifield",

    "inputformat":"\\(x = \\) [[input1]] \\(\\pm \\sqrt \\left( \\) [[input2]] \\( \\right) \\)",

    "expectedanswer":{"input1":"1", "input2":"9"},

    "error":{"message":"Inte rätt."}

}

<BILD>

Precis som när vi hade flera inmatningsfält i avsnitt 3.1 måste vi också här, för de båda inmatningsfälten input1 och input2, ange motsvarande rätta svar vid "expectedanswer". I det här fallet ska "1" stå i det första fältet och "9" i det andra.

## 3.3 Button

När det finns flera olika svarsalternativ, eller vi har en Rätt/fel- eller Sant/falskt-fråga, kan vi använda uppgiftstypen "button".

Visa exempel med Ja/Nej: Både rätt och fel feedback

Exempel+kod+bild

Visa exempel med en bild som tabell, vilket land har 20 % av X?

Exempel+kod+bild

Kom ihåg att göra alternativen trovärdiga, men att åtminstone ha ett uppenbart fel svar är bra för elevens motivation. Här finns också ypperligt bra tillfällen att lägga till specifik feedback för varje alternativ, vare sig det är rätt eller inte. Mer om detta i avsnitt 6.4.

## 3.4 Dropdown

Precis som att vi kan utöka "field" till uppgiftstypen "multifield" kan vi också utöka möjligheten med flera svarsalternativ till att i samma uppgift ha flera frågor med flera svarsalternativ. Detta har vi uppgiftstypen "dropdown" till.

Vi gör här ett exempel där eleven ska matcha längder mätta i vissa enheter till lika stora längder i andra enheter.

Förklaring+kod+bild

## 3.5 Graph

Den sista och största uppgiftstypen är "graph", som används för att rita upp grafer, punkter och geometriska figurer. Den kan också användas i kombination med alla ovanstående uppgiftstyper för att skapa riktigt komplicerade uppgifter.

Nedan följer en kort sammanställning av vad som kan göras, men annars täcks detta i ett helt eget kapitel (avsnitt 5).

Lista på möjligheter

Exempel+kod+bild

# 4. Programmeringsmöjligheter

## 4.1 Matematiska funktioner

Inom {{ }}-taggarna kan alla fyra räknesätt +, -, \* och / användas för att skriva uttryck, samt modulo-operatorn %. Därutöver fungerar vanliga trigonometriska funktioner sin, cos, tan, asin, acos, atan. Dessa tar alla argument i radianer, så om du räknar med grader måste du först omvandla till radianer. Följande är exempelvis godkänt:

{{2 + 3\*(4-cos(3.14159)+tan(atan(sin(1))))}}

Andra standardfunktioner som stöds är till exempel ln och exp. För en fullständig lista, se [http://www.w3schools.com/jsref/jsref\_obj\_math.asp](http://www.w3schools.com/jsref/jsref_obj_math.asp) .

Observera att decimaler måste skrivas med punkt, inte kommatecken. Alla uttryck avrundas till högst två decimaler, oavsett hur många decimaler som inkluderas i uttrycket.

## 4.2 Variabler

Variabler med heltal gick delvis igenom i avsnitt 2.3. Även negativa tal är tillåtna.

Variabler behöver inte heller begränsa sig till heltal utan kan vara vilket reellt tal som helst. Följande kod ger oss en variabel "vinkel" som antar värden mellan -pi och pi:

"variables":{"vinkel":[-3.14,3.14]}

Notera att precis som i {{ }}-taggar måste decimaltecknet vara en punkt och inte ett kommatecken. och flyttal. Namnet på variabeln behöver inte begränsas till en bokstav, men får endast bestå av bokstäver och vara unikt. För enkelhetens skull rekommenderas det att endast använda gemener.

Alla uttryck där variabeln ingår kommer slutligen alltid avrundas till två decimaler, men uträkningar sker med högre precision. Kom ihåg att datorer inte kan representera tal exakt med oändligt många decimaler, någonstans sker en avrundning. Inte heller kan alla tal representeras exakt med hjälp av flyttal. För en mer teknisk förklaring, se: [http://en.wikipedia.org/wiki/Floating\_point](http://en.wikipedia.org/wiki/Floating_point)

I grund och botten är regeln denna: Var inte beroende av hög precision och tolerera gärna ungefärliga svar (se avsnitt 6.3).

För att få positiva och negativa tal, men inte noll, använd (2\*x-1)\*y där x är [0,1].

## 4.3 Ännu mer variation

Med hjälp av programmeringens if-satser kan vi ytterligare variera uppgifterna, både i text och i svarsalternativ. Låt oss konstruera en uppgift där eleven ska ange vinkelsumman för en viss geometrisk figur. Denna figur kan antingen vara en triangel, en kvadrat, en rektangel eller en femhörning.

Vi har alltså fyra alternativ, så vi väljer att skapa en variabel "figur" som antar värden 1-4. Om figur är lika med 1 så handlar uppgiften om trianglar, och rätt svar är 180. Om figur är lika med 2 handlar uppgiften om kvadrater, och rät svar är 360. Och så vidare.

För att åstadkomma detta använder vi följande kod:

{{ påstående ? sant : falskt }}

Påståendet har i det här fallet att göra med värdet på variabeln "figur". Om påståendet är sant så kommer uttryck anta värdet som står vid "sant", och annars vid "falskt". Ett exempel:

{{ figur==1 ? 180 : 360 }}

Men nu täcker vi bara in två möjligheter, men det finns ju faktiskt fyra alternativ. Då gör vi såhär:

{{ figur==1 ? 180 : figur==2 ? 360 : figur==3 ? 360 : 540 }}

Vi kan gör a på samma sätt för att skriva ut namnet på de olika figurerna. Text skrivs inom enkla citationstecken:

{{ figur==1 ? 'triangel' : figur==2 ? 'kvadrat' : figur==3 ? 'rektangel' : 'femhörning' }}

Hela uppgiften ser ut såhär:

{

    "name":"Vinkelsumma",

    "exercise":"Angel vinkelsumman för en {{ figur==1 ? 'triangel' : figur==2 ? 'kvadrat' : figur==3 ? 'rektangel' : 'femhörning' }}.",

    "inputtype":"field",

    "variables":{"figur":[1,4]},

    "answerformat":"\\({}^{\\circ}\\)",

    "expectedanswer":{"Svar:":"{{ figur==1 ? 180 : figur==2 ? 360 : figur==3 ? 360 : 540 }}"},

    "error":{"message":"Rita upp figuren och mät."}

}

Lägg märke till det subtila gradtecknet som ges vid "answerformat" som visar att vinkelsummna ska anges i grader.

## 4.4 Mer komplexa uttryck

Vi kan också kombinera flera påståenden till ett genom bindeorden "och" respektive "eller", som vi skriver med && och ||. Detta fungerar  på samma sätt som i programmerings- och logiksammanhang och kommer därför inte beskrivas närmare här.

# 5. Grafer

Hur grafer byggs upp, punkter, linjer etc. JÄTTEMYCKET.

Länka till jsxgraph.

# 6. Rätt svar, fel svar, ledtråd

# 6.1 Rätt och fel

Vi börjar med att repetera hur vi angav feedback i avsnitt 2.4:

"error":{"message":"Nu blev det inte rätt."},

"correct":{"message":"Men nu blev det rätt."}

Vad som är rätt och fel svar avgörs av vad som står under "expectedanswer".

"expectedanswer":{"Svar: \\(x=\\)":"{{x}}"}

Om flera svar kan anges, till exempel vid uppgifter av typen multifield eller dropdown, så är uppgiften endast rätt om alla svar är rätt, annars visas feedback för fel svar.

För till exempel ja/nej-frågor, där ju eleven har en 50 %-ig chans att svara rätt helt utan kunskaper, se till att alltid inkludera en förklaring även för rätt svar. Men se till att generellt alltid inkludera feedback för fel svar, då det är lärandet och inte besvara uppgifter rätt som är det viktigaste.

I kommande avsnitt går vi igenom hur vi kan hantera flera rätta svar, flera felaktiga svar, samt ungefärliga svar.

## 6.2 Flera rätta svar

Låt oss säga att vi har en uppgift där eleven ska ange ett primtal mindre än 10. Rätta svar är då 2, 3, 5 och 7. Uppgiften ser alltså ut såhär:

{

    "name":"Små primtal",

    "exercise":"Ange ett primtal mindre än 10.",

    "inputtype":"field",

    "expectedanswer":{"Svar:":"2"},

    "error":{"message":"Vad är ett primtal?"}

}

Om vi nu skriver in "2" så får vi rätt, medan 3, 5 och 7 markeras som fel svar. Vi måste modifiera vårt inlägg för expectedanswer för att acceptera även dessa. Det kan vi göra såhär:

"expectedanswer":{"Svar:":["2","3","5","7"]},


Hakparenteserna [] indikerar att det blir en lista (array) med flera inlägg, och dessa skrivs sedan separerade av komma-tecken. Nu blir det rätt!

Vi kan också åstadkomma samma effekt genom att använda den programmeringsfunktionalitet som vi gick igenom i avsnitt 4. Variabelnamnet "answer" är reserverat för det svar som eleven matar in och vi kan skriva följande:

"expectedanswer":{"Svar:":"{{answer==2 || answer==3 || answer==5 || answer==7 ? answer : answer-1}}"}

Om svaret är lika med 2, eller om svaret är lika med 3, eller 5, eller 7, så är rätt svar "answer", det vill säga att rätt svar är vad eleven matat in. Annars är rätt svar "answer – 1", det vill säga INTE det som eleven matat in, och uppgiften markeras som felaktigt besvarad.

Det senare alternativet är klart krångligare, men har sina fördelar i andra sammanhang. Vi tar som exempel en annan uppgift där eleven ska ange ett jämnt tal större än 100. Det finns oändligt många rätta svar, så vi kan inte skriva en lista! Men vi kan matematiskt generalisera alla rätta svar till att vara större än 100 OCH vara kongruenta med 0 modulo 2. Det blir:

"expectedanswer":{"Svar:":"{{answer>100 && answer%2==0 ? answer : answer-1}}"}

På detta sätt täcker vi in alla de rätta svar som finns, och underkänner de andra talen. Perfekt!

## 6.3 Ungefärliga svar

På grund av bristande noggrannhet när datorer räknar med decimaltal är det inte alltid säkert att alla decimaler blir rätt. Låt oss säga att eleven ska beräkna en viss vinkel i en triangel med givna sidor, och rätt svar finns i variabeln "angle", som nu har värdet 56.78.

Det är sällan bra att endast tillåta svaret 56,78. Anledningen är den tidigare nämnda bristande nogrannheten, och att du heller kanaske inte kan ange triangelns sidor så att svaret kan avrundas till exakt 56,78. Bättre är att acceptera svar som är ungefär 56,78. På det viset täcker vi också de fall när eleven avrundar till 56,8 eller 57, men anser att 60 är en alldeles för grov avrudning.

För detta använder vi den reserverade variabeln "answer" som är elevens inmatning. Vi vill att answer >= 56 OCH att answer <= 57. I så fall är rätt svar "answer", men annars är det "angle".

"expectedanswer":{"Svar:":{{answer>=56 && answer <= 57 ? answer : angle}}

Här har vi använt && som diskuteras i avsnitt 4.4.

## 6.4 Olika feedback för olika svar

I avsnitt 6.1 definierar vi feedback för felaktigt svar. Men vi kan också tänka oss situationer där olika felsvar förtjänar olika feedback. Till exempel:

{

    "name":"Prioriteringsregler",

    "exercise":"Räkna ut: $$ {{x}} + {{y}} \\cdot {{z}} $$",

    "inputtype":"field",

    "variables":{"x":[1,4], "y":[2,3], "z":[4,5],},

    "expectedanswer":{"Svar:":"{{x+y\*z}}"},

    "error":{"message":"Inte rätt."}

}

Om eleven inte räknat enligt prioriteringsreglerna, det vill säga svarat (x+y)\*z, så borde vi påminna om prioriteringsreglerna. Vi kan lägga in särskild feedback med hjälp av "definederrors":

{

    "name":"Prioriteringsregler",

    "exercise":"Räkna ut: $$ {{x}} + {{y}} \* {{z}} $$",

    "inputtype":"field",

    "variables":{"x":[1,4], "y":[2,3], "z":[4,5],},

    "expectedanswer":{"Svar:":"{{x+y\*z}}"},

    "error":{
        "definederrors":
        [
            {"match":"{{(x+y)\*z}}", "message":"Tänk på prioriteringsreglerna!"}
        ]
        "message":"Inte rätt." }

}

I det här fallet matchar vi svaret (x+y)\*z med ett särskilt meddelande. Vi kan ha så många definierade fel som vi vill genom att ha flera olika upplagor av match- och message-taggar. Om inget definederror matchar så används standard-feedbacken.

Dessa definederrors fungerar bara där det finns ett enda svarsalternativ, alltså till exempel inte för uppgifter av typen "multifield" eller "dropdown".

# 7. Avslutning

## 7.1 Tänk på

Försök variera uppgift varje så mycket som möjligt. Tänk på att {{ }}-uttryck även kan variera uppgiftstexten, som vi såg i avsnitt 4.3. Men var noga med att svaret anges på rätt sätt. Om du anger rätt svar i grader, berätta i uppgiften att eleven måste svara i grader.

Tänk alltid på att avrundningsfel i uppgiften och var inte beroende av för stor exakthet. Tolerera hellre lite mer än exakt rätt svar om decimaler är inblandade. Om eleven är på rätt spår bör svaret vara bra ändå och vi undviker missar på grund av datorers inneboende dumhet.

Ge alltid mycket feedback och hellre en ledtråd för mycket än en för lite. Inkludera gärna länkar (avsnitt 2.5) till motsvarande teoriavsnitt både i feedback och, om det behövs, i uppgiftstexten. Om teoriavsnittet är detsamma som det avsnitt som uppgiften är placerad inom är det inte lika viktigt.

För enlighetens och utseendets skull, se till att alla tal och alla matematiska uttryck (även simpla sådana som 2+2) ritas upp som LaTeX.

## 7.2 Vanliga fel

Följande är en lista på vanliga fel, som gör att uppgiften inte fungerar som den ska eller inte visas alls:

* Glömt att publicera bÃÂ¥de uppgiften och den mapp den ligger under i Umbraco.
* Glömt att skriva \\ istället för \ i LaTeX-uttryck.
* Glömt att avsluta varje del i uppgiftskoden, förutom den sista, med ett kommatecken.
* Glömt att avsluta {{ med }} eller \\( med \\), eller $$ med $$.
* Skrivit fel variabelnamn, eller anvÃÂ¤nder en variabel som inte definierats.
* Skrivit ett inkorrekt uttryck innanfÃÂ¶r {{ }}.
* Den angivna svarsalternativet ÃÂ¤r ett som inte existerar.

Avslutningsvis är det viktigt att påpeka att det bästa sättet att lära sig uppgiftsmotorn är att försöka skriva egna uppgifter. Kopiera gärna från gamla uppgifter (antingen bland de som redan finns i Umbraco och/eller från avsnitt 9) och gör nya. Var kreativ!

Men några misstag kommer alltid ske, det vet alla programmerare alltför väl. Var vaksam på kommatecknen.

# 8. Vidare utveckling

Nedan följer en lista på hur räknefunktionen skulle kunna utvecklas i framtiden.

* Bättre feedback
* Sammankoppling med eventuellt nytt forum
* Debug-funktioner
* Ett inmatningsfält som beror på ett annat (två inmatningsrutor)

# 9. Kodexempel

Nedan följer exempel på uppgifter som både är vanliga men också vissa avancerade exempel för att visa på räknefunktionens kraftfullhet.