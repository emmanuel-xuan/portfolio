function formatList(list)
{
    if (!Array.isArray(list))
        return "";

    return list
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join(", ");
}


function generate_gallery(CONFIG, divParent)
{
    for (let i=0; i<CONFIG.length; i++)
    {
        const item = CONFIG[i]
;
        const divGridItem = document.createElement("div");
        const divBlockImg = document.createElement("div");
        const divBlockText = document.createElement("div");
        const aLinkProject = document.createElement("a");
        const imgVignette = document.createElement("img");
        const h3Title = document.createElement("h3");
        const pDescription = document.createElement("p");
        const pDepartement = document.createElement("p");


        divGridItem.className = "grid-item";
        divGridItem.id = item.id;

        divBlockImg.className = "item-img";
        divBlockText.className = "item-text";

        aLinkProject.href = `project.html?id=${item.id}`;
        aLinkProject.className = "container-vignette";

        imgVignette.src = item.vignette;
        h3Title.innerText = item.title;
        pDescription.innerText = item.description;
        pDepartement.innerText = `Rôles: ${formatList(item.departement)}`;
        pDepartement.className = "item-departement";


        divBlockImg.appendChild(imgVignette);

        divGridItem.appendChild(aLinkProject);
        divBlockText.appendChild(h3Title);
        divBlockText.appendChild(pDescription);
        divBlockText.appendChild(pDepartement);

        aLinkProject.appendChild(divBlockImg);
        aLinkProject.appendChild(divBlockText);

        divParent.appendChild(divGridItem);
    }


}


const ret_portfolio = await fetch("assets/config/portfolio.json");
const config_portfolio = await ret_portfolio.json();

const divGallery = document.getElementById("gallery");

generate_gallery(config_portfolio, divGallery);