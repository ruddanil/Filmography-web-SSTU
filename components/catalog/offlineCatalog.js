class OfflineCatalog {
    getFilmList() {
        let filmListJson = localStorage.getItem("offlineFilmList");
        if (filmListJson !== null) {
            return JSON.parse(filmListJson);
        }
        return [];
    }

    deleteFromFilmList(id) {
        let filmList = this.getFilmList();
        const index = filmList.findIndex(n => n.id === id);
        filmList.splice(index, 1);
        localStorage.setItem('offlineFilmList', JSON.stringify(filmList));
        this.renderCatalogByFilter();
    }

    renderCatalogByFilter() {
        let filmList = this.getFilmList();
        let country = document.getElementById("country-filter").value;
        let genre = document.getElementById("genre-filter").value;
        let yearFrom = document.getElementById("yearFrom-filter").value;
        let yearTo = document.getElementById("yearTo-filter").value;

        if (country !== "0") {
            filmList = filmList.filter(n => n.country === country);
        }
        if (genre !== "0") {
            filmList = filmList.filter(n => n.genre === genre);
        }
        if (yearFrom !== "" || yearTo !== "") {
            filmList = filmList.filter(n => n.releaseDate <= yearTo && n.releaseDate >= yearFrom);
        }
        this.catalogRender(filmList);
    }

    catalogRender(filmList) {
        let htmlCatalog = '';
        if (filmList.length > 0) {
            filmList.forEach(({
                                  id,
                                  name,
                                  country,
                                  genre,
                                  screenwriter,
                                  producer,
                                  operator,
                                  composer,
                                  budget,
                                  worldFees,
                                  ageRate,
                                  filmLength,
                                  releaseDate,
                                  posterUrl,
                                  director
                              }) => {
                htmlCatalog += `
                <li class="catalog-element">
                    <span class="catalog-element__name">${name}</span>
                    <img class="catalog-element__img" src="${posterUrl}" />
                    <span class="catalog-element__description">????????????: ${countries.find(item => item.id == country).country}</span>
                    <span class="catalog-element__description">????????: ${genres.find(item => item.id == genre).genre}</span>
                    <span class="catalog-element__description">??????????????: ${director}</span>
                    <span class="catalog-element__description">??????????????????: ${screenwriter}</span>
                    <span class="catalog-element__description">????????????????: ${producer}</span>
                    <span class="catalog-element__description">????????????????: ${operator}</span>
                    <span class="catalog-element__description">????????????????????: ${composer}</span>
                    <span class="catalog-element__description">????????????: ${budget}</span>
                    <span class="catalog-element__description">?????????????? ??????????: ${worldFees}</span>
                    <span class="catalog-element__description">???????????????????? ??????????????: ${ageRate}</span>
                    <span class="catalog-element__description">????????????????????????: ${filmLength}</span>
                    <span class="catalog-element__description">???????? ????????????: ${releaseDate}</span>
                    <div id="buttons">
                        <button class="catalog-element__btn" onclick="commentMethods.renderCommentList('${id}','${name}')">??????????????????????</button>
                        <button class="catalog-element__btn" onclick="commentMethods.renderAddComment('${id}')">???????????????? ??????????????????????</button>
                        <button class="catalog-element__btn" onclick="offlineCatalog.deleteFromFilmList('${id}')">?????????????? ??????????</button>
                    </div>

                </li>
            `;
            });
            document.getElementById('catalog').innerHTML = `
            <ul class="catalog-container">
                ${htmlCatalog}
            </ul>
        `;
        } else {
            document.getElementById('catalog').innerHTML = `
            <ul class="catalog-container">
                <h1>???????????? ???? ??????????????</h1>
            </ul>
        `;
        }
    }
}

const offlineCatalog = new OfflineCatalog();
filter.filterRender();
offlineCatalog.renderCatalogByFilter();
