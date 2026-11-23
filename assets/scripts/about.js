async function readJson(path)
{
    const response = await fetch(path);
    return await response.json();
}


function format_date(start_date, end_date)
{
    const MONTH = {
        1 : "janvier",
        2 : "février",
        3 : "mars",
        4 : "avril",
        5 : "mai",
        6 : "juin",
        7 : "juillet",
        8 : "août",
        9 : "septembre",
        10 : "octobre",
        11 : "novembre",
        12 : "décembre",
    };

    const start_month = start_date.split("-")[1];
    const start_year = start_date.split("-")[0];
    const end_month = end_date.split("-")[1];
    const end_year = end_date.split("-")[0];

    return `${MONTH[start_month]} ${start_year} - ${MONTH[end_month]} ${end_year}`;
}


const config_cv = await readJson("assets/config/cv.json");

const TYPE = {
    "xp" : "cv-xp-content",
    "edu" : "cv-edu-content",
    "skill" : "cv-skill-content"
}





for (const item of config_cv)
{
    const divItem = document.createElement("div");
    const divRole = document.createElement("div");
    const divStudio = document.createElement("div");
    const divDate = document.createElement("div");
    const divDescription = document.createElement("div");

    divItem.className = "cv-item";
    divRole.className = "cv-role";
    divStudio.className = "cv-studio";
    divDate.className = "cv-date";
    divDescription.className = "cv-description";


    divRole.innerText = item.role;
    divStudio.innerText = item.client;
    divDate.innerText = format_date(item.start_date, item.end_date);
    divDescription.innerText = item.description;


    divItem.appendChild(divStudio);
    divItem.appendChild(divRole);
    divItem.appendChild(divDate);
    // divItem.appendChild(divDescription);

    const parent = document.getElementById(TYPE[item.type]);
    parent.appendChild(divItem);
}