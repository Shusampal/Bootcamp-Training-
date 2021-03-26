const input = document.getElementById('do');

const btn = document.getElementById('btn');

const open = document.getElementById('open');

const op = document.getElementById('op');

var count=1;

console.dir(prompt);
btn.addEventListener('click',function (e) {

    if(input.value != '')
    {

        const cont = document.createElement('div');


        cont.innerHTML = `<i class="fas fa-trash-alt no"></i> <i class="fas fa-edit edit"></i> <li>${input.value}</li>`;

        open.append(cont);

        input.value = "";

        if (count % 2 == 0) {
            cont.className = 'exclude';

        }
        else {
            cont.className = 'include';
        }

        count++;

        const trash = document.getElementsByClassName('no');

        for (item of trash) {
            item.addEventListener('click', function (e) {
                e.target.parentElement.remove();
            })
        }


        const edit = document.getElementsByClassName('edit');

        for (i of edit) {
            i.addEventListener('click', function (e) {

                const x = document.createElement('input');
                x.type = 'text';
                x.className = 'temp';
                e.target.nextElementSibling.replaceWith(x);
                x.addEventListener('keydown', function (e) {
                    if (e.key == 'Enter') {
                        const newel = document.createElement('li');
                        newel.innerText = x.value;
                        x.replaceWith(newel);
                    }

                })

            })
        }

    }

    
    
   

})


input.addEventListener('keydown', function (e) {


    if (e.key === 'Enter' && input.value != '')
    {

        const cont = document.createElement('div');


        cont.innerHTML = `<i class="fas fa-trash-alt no"></i> <i class="fas fa-edit edit"></i> <li>${input.value}</li>`;

        open.append(cont);

        input.value = "";

        if (count % 2 == 0) {
            cont.className = 'exclude';

        }
        else {
            cont.className = 'include';
        }

        count++;

        const trash = document.getElementsByClassName('no');

        for (item of trash) {
            item.addEventListener('click', function (e) {
                e.target.parentElement.remove();
            })
        }


        const edit = document.getElementsByClassName('edit');

        for (i of edit) {
            i.addEventListener('click', function (e) {

                const x = document.createElement('input');
                x.type = 'text';
                x.className = 'temp';
                e.target.nextElementSibling.replaceWith(x);
                x.addEventListener('keydown', function (e) {
                    if (e.key == 'Enter') {
                        const newel = document.createElement('li');
                        newel.innerText = x.value;
                        x.replaceWith(newel);
                    }

                })

            })
        }

    }

    


})