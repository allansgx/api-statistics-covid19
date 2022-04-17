


function getStatisticCovid(pais = null) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'X-RapidAPI-Key': 'a2d077e94cmshdd4cadf79a71afdp19e124jsnd072d3c5e320'
        }
    };
    
    fetch('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/', options)
        .then(response => response.json())
        .then(response => {
            
            if (pais != null) {
                response.forEach(val => {
                    if (val.Country == pais) {
                        var casosRecuperados = formatarValor(parseInt(val.TotalRecovered));
                        var recuperadosRecente = formatarValor(val.NewRecovered);
                        
                        $('#casosRecuperados').html(casosRecuperados);
                        $('#recuperadosRecente').html(recuperadosRecente);
            
                        // Segundo card
                        var totalCasos = formatarValor(val.TotalCases);
                        var casosAtivos = formatarValor(val.ActiveCases);
                        var novosCasos = formatarValor(val.NewCases);
            
                        $('#totalDeCasos').html(`${totalCasos} <span id="novosCasos">+ ${novosCasos}</span>`);
                        $('#casosAtivos').html(casosAtivos);
            
                        // Terceiro card
                        var totalObitos = formatarValor(val.TotalDeaths);
                        var novosObitos = formatarValor(val.NewDeaths);
                        var taxaLetalidade = val.Case_Fatality_Rate;
            
                        $('#totalDeObitos').html(`${totalObitos} <span id="novosCasos">+ ${novosObitos}</span>`);
                        $('#taxaLetalidade').html(`${taxaLetalidade}%`);
                    }
                });
            } else {
                var val = response[0];
                // Primeiro card
                var casosRecuperados = formatarValor(parseInt(val.TotalRecovered));
                var recuperadosRecente = formatarValor(val.NewRecovered);
                
                $('#casosRecuperados').html(casosRecuperados);
                $('#recuperadosRecente').html(recuperadosRecente);
    
                // Segundo card
                var totalCasos = formatarValor(val.TotalCases);
                var casosAtivos = formatarValor(val.ActiveCases);
                var novosCasos = formatarValor(val.NewCases);
    
                $('#totalDeCasos').html(`${totalCasos} <span id="novosCasos">+ ${novosCasos}</span>`);
                $('#casosAtivos').html(casosAtivos);
    
                // Terceiro card
                var totalObitos = formatarValor(val.TotalDeaths);
                var novosObitos = formatarValor(val.NewDeaths);
                var taxaLetalidade = val.Case_Fatality_Rate;
    
                $('#totalDeObitos').html(`${totalObitos} <span id="novosCasos">+ ${novosObitos}</span>`);
                $('#taxaLetalidade').html(`${taxaLetalidade}%`);
            }
        })
        .catch(err => console.error(err));
}

function formatarValor(valor) {
    return valor.toLocaleString('pt-BR');
}

function listarRank() {
    var html = '';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'X-RapidAPI-Key': 'a2d077e94cmshdd4cadf79a71afdp19e124jsnd072d3c5e320'
        }
    };
    
    fetch('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(val => {

                if (val.rank > 0) {
                    var totalCasos = formatarValor(val.TotalCases);
                    var totalObitos = formatarValor(val.TotalDeaths);

                    html += `<tr>
                                <th class="w1">${val.rank}</th>
                                <th class="w2">${val.Country}</th>
                                <th class="w3">${totalCasos}</th>
                                <th class="w4">${totalObitos}</th>
                            </tr>`;

                    $('#dynamicTable').html(html);
                }
            });

        })
        .catch(err => console.error(err));

}

function listarOptionFiltro() {
    const select = document.querySelector('#slcPais');

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'X-RapidAPI-Key': 'a2d077e94cmshdd4cadf79a71afdp19e124jsnd072d3c5e320'
        }
    };
    
    fetch('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/', options)
        .then(response => response.json())
        .then(response => {

            response.forEach(val => {
                if (val.Country != "Total:") {
                    select.options[select.options.length] = new Option(val.Country, val.Country);
                }
            });

        })
        .catch(err => console.error(err));
}

getStatisticCovid();
listarRank()
listarOptionFiltro();