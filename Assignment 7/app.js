const input = document.getElementById('input');

const container = document.getElementById('container');


const contain = document.getElementById('contain');


input.addEventListener('keydown',function f(e){


    

    var key = e.key;
    const val = input.value;
    
    if(val==='')
    {
        
    }
    else if(key==='Enter')
    {

    
        async function getData()
        {
               
            for (child of e.target.nextElementSibling.children) {
                child.classList.add('none');
            }

            const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${val}&appid=019e4f24f851f9ec78ddc828de419a2e&units=metric`);
            const data = res.json();
            return data;
                
            
        };

        getData().then(
            function(data){

                const city = data.name;
                const country = data.sys.country;
                const currTemp = data.main.temp;
                const minTemp = data.main.temp_min;
                const maxTemp = data.main.temp_max;
                const condition = data.weather[0].main;
                const date = new Date().toLocaleString();

                
                const cityCountry = document.createElement('h2');
                cityCountry.innerHTML = `<h2>${city} , ${country}</h2>`;

                const DateTime = document.createElement('h3');
                DateTime.innerHTML = `<h3>${date}</h3>`;

                const tmp = document.createElement('h2');
                tmp.innerHTML = `<h2>${currTemp}&deg;C</h2>`;

                const cond = document.createElement('h3');
                cond.innerHTML = `<h3>${condition}</h3>`;

                const minMax = document.createElement('h3');
                minMax.innerHTML = `<h3>${minTemp}&deg;C / ${maxTemp}&deg;C</h3>`;

                

                

                contain.append(cityCountry);
                contain.append(DateTime);
                contain.append(tmp);
                contain.append(cond);
                contain.append(minMax);

                e.target.value = '';






            }
        )
        .catch();

    }


});