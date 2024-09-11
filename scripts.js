const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, name: arquivo.name });
        }

        leitor.onerror = () => {
            reject(`Erro no arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo);
    })

}

const imagemPricipal = document.querySelector(".main-img");
const nomeDaImagem = document.querySelector(".container-img-nome p");

inputUpload.addEventListener('change', async (event) => {
    const arquivo = event.target.files[0]

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPricipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.name;
        } catch (error) {
            console.error("Erro na leitura do arquivo");
        }
    }
});

/*------------------------------------------------------------------------------------------------------------*/

const criarTagsBtn = document.getElementById("categoria");
const containerTags = document.querySelector(".lista-tags");

containerTags.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-tag")) {
        const tagRemoveras = event.target.parentElement;
        containerTags.removeChild(tagRemoveras);
    }
})


const tagDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "Html", "Css", "JavaScript"];

async function verificaTagsDisponiveis(tagText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagDisponiveis.includes(tagText));
        }, 1000);
    });
}

criarTagsBtn.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        const textTags = criarTagsBtn.value.trim();

        if (textTags !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(textTags);
                if (tagExiste) {
                    const itemTag = document.createElement("li");
                    itemTag.innerHTML = `<p>${textTags}</p> <img src="./img/close-black.svg" class="remove-tag">`;

                    containerTags.appendChild(itemTag);
                    criarTagsBtn.value = "";
                } else {
                    alert("Tag não encontada.");
                }

            } catch (error) {
                console.error("Erro ao verificar a  existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.");
            }
        }
    }
});

/*------------------------------------------------------------------------------------------------------------*/

const btnPublicar = document.querySelector(".btn-publicar");

async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5

            if (deuCerto) {
                resolve("Projeto publicado com sucesso.");;
            } else {
                reject("Erro ao publicar o projeto.");
            }
        }, 2000);
    });
}

btnPublicar.addEventListener('click', async (event) => {
    event.preventDefault();

    const nomeProjeto = document.getElementById("nome").value;
    const descricaoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(containerTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo!");
    } catch (error) {
        console.log("Deu errado:", error);
        alert("Deu tudo errado!");
    }
    
})

/*------------------------------------------------------------------------------------------------------------*/

const btnDescartar = document.querySelector(".btn-descartar");

btnDescartar.addEventListener('click', (event) => {
    event.preventDefault();

    const form = document.querySelector("form");
    form.reset();

    imagemPricipal.src = "./img/imagem.png";
    nomeDaImagem.textContent = "image.png";

    containerTags.innerHTML = "";
})