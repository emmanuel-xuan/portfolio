

function generateHeader(CONFIG, divParent)
{
    const divBanner = document.createElement("div");
    const divBlockMenu = document.createElement("div");
    const navMenu = document.createElement("nav");
    const h1Title = document.createElement("h1");
    const h2Subtitle = document.createElement("h2");

    divBanner.className = "banniere";
    divBlockMenu.className = "block-menu";

    h1Title.innerText = "Emmanuel-Xuân Portfolio";
    h2Subtitle.innerText = "Lighting / Compositing Artist";

    for (let i=0; i<CONFIG.length; i++)
    {
        const item = CONFIG[i];

        const aMenu = document.createElement("a");
        aMenu.className = "menu";
        aMenu.href = `${item.link}`;
        aMenu.innerText = `${item.name}`;

        divBlockMenu.appendChild(aMenu);
    }

    navMenu.appendChild(divBlockMenu);

    divBanner.appendChild(h1Title);
    divBanner.appendChild(h2Subtitle);
    divBanner.appendChild(navMenu);

    divParent.appendChild(divBanner);
}


function generateFooter(CONFIG, divParent)
{
    const divFooter = document.createElement("div");
    const pCopyright = document.createElement("p");

    divFooter.className = "block-footer";
    pCopyright.id = "copyright";
    pCopyright.innerText = "© 2026 by Emmanuel-Xuân Dubois";

    for (let i=0; i<CONFIG.length; i++)
    {
        const obj = CONFIG[i];

        const aLogo = document.createElement("a");
        const imgActive = document.createElement("img");
        const imgInactive = document.createElement("img");

        aLogo.href = obj.link;
        aLogo.className = "container-picto";

        imgActive.src = obj.active;
        imgActive.className = "pic-active";

        imgInactive.src = obj.inactive;
        imgInactive.className = "pic-inactive";

        aLogo.appendChild(imgActive);
        aLogo.appendChild(imgInactive);

        divFooter.appendChild(aLogo);
    }

    divParent.appendChild(divFooter);
    divParent.appendChild(pCopyright);
}




const response = await fetch("assets/config/components.json");
const config = await response.json();

const headerDiv = document.getElementById("HEADER");
const footerDiv = document.getElementById("FOOTER");


generateHeader(config.header, headerDiv);
generateFooter(config.footer, footerDiv);