function formatList(list)
{
    if (!Array.isArray(list))
        return "";

    return list
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join(", ");
}


async function readJson(path)
{
    const response = await fetch(path);
    return await response.json();
}


// --------------------------------------------------
// Add Items in Project
// --------------------------------------------------

function addImageItem(parent, artwork)
{
    const divHover = document.createElement("div");
    const imgArtwork = document.createElement("img");
    const pDescription = document.createElement("p");

    divHover.className = "container-hover";
    imgArtwork.className = "artwork";
    pDescription.className = "artwork-description";

    imgArtwork.src = artwork.path;
    pDescription.innerText = artwork.description;

    parent.appendChild(imgArtwork);


    if (artwork.description)
    {
        divHover.appendChild(pDescription);
        parent.appendChild(divHover);
    }
}

function addVideoItem(parent, artwork)
{
    const iframe = document.createElement("iframe");
    if (artwork.type === "youtube")
    {
        iframe.src = `https://www.youtube.com/embed/${artwork.id}`;
        iframe.className = "artwork-video";
        iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture;";
        iframe.allowFullscreen = true;
    }
    else
    if (artwork.type === "vimeo")
    {
        iframe.src = `https://player.vimeo.com/video/${artwork.id}`;
        iframe.className = "artwork-video";
        iframe.allow = "autoplay; picture-in-picture;";
        iframe.allowFullscreen = true;
    }

    parent.appendChild(iframe);
}

function addTextItem(parent, artwork)
{
    const pText = document.createElement(artwork.balise);

    pText.className = "text-item";
    pText.innerText = artwork.text;

    parent.appendChild(pText);
}







async function initProject()
{
    const parms = new URLSearchParams(window.location.search);
    const projectId = parms.get("id");

    if (!projectId)
    {
        window.location.href = "404.html";
        return;
    }

    const config_portfolio = await readJson("assets/config/portfolio.json");
    const config_project = await readJson("assets/config/projects.json");


    const project = config_portfolio.find( item => item.id === projectId );
    const projectDetail = config_project.find( item => item.id === projectId );


    if (!project)
    {
        window.location.href = "404.html";
        return;
    }


    const h1Title = document.getElementById("project-title");
    const h2Subtitle = document.getElementById("project-subtitle");
    const pDepartement = document.getElementById("project-departement");
    const pSoftware = document.getElementById("project-software");
    const pDescription = document.getElementById("project-description");


    h1Title.innerText = project.title ?? "";
    h2Subtitle.innerText = project.client ?? "";
    pDepartement.innerText = formatList(project.departement) ?? "";
    pSoftware.innerText = formatList(project.software) ?? "";
    pDescription.innerText = projectDetail ? projectDetail.description : "";


    if (projectDetail)
    {
        const divGallery = document.getElementById("project-gallery");

        for (const artwork of projectDetail.artworks)
        {
            const divContainer = document.createElement("div");
            divContainer.className = "container-artwork";

            if (artwork.type === "image")
            {
                addImageItem(divContainer, artwork);
            }
            else
            if (artwork.type === "youtube" || artwork.type === "vimeo")
            {

                addVideoItem(divContainer, artwork);
            }
            else
            if (artwork.type === "text")
            {
                addTextItem(divContainer, artwork);
            }


            divGallery.appendChild(divContainer);
        }
    }



    // PROJECT NAV
    const prevLink = document.getElementById("project-prev");
    const nextLink = document.getElementById("project-next");

    const projectIndex = config_portfolio.findIndex( item => item.id === projectId );
    const prevIndex = (projectIndex - 1 + config_portfolio.length) % config_portfolio.length;
    const nextIndex = (projectIndex + 1) % config_portfolio.length;

    const prevProject = config_portfolio[prevIndex];
    const nextProject = config_portfolio[nextIndex];

    prevLink.href = `project.html?id=${prevProject.id}`;
    nextLink.href = `project.html?id=${nextProject.id}`;
    prevLink.innerText = `${prevProject.title}`;
    nextLink.innerText = `${nextProject.title}`;
}


initProject()