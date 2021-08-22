let currentPage = 1;
let totalPages;

function getUser(page) {
    function render(){
        let response = this.responseText;
        let responseData = JSON.parse(response);
        

        //render logical
        var fragment = document.createDocumentFragment();

        responseData.data.forEach(item => {
            let li = document.createElement('li');
            li.classList.add('users-li')

            let span = document.createElement('span');
            span.textContent = item.first_name;

            let img = document.createElement('img');
            img.src = item.avatar;
            img.classList.add('image')
            li.appendChild(img);
            li.appendChild(span);
            fragment.appendChild(li)
        });
        document.getElementById('list').innerHTML = '';
        document.getElementById('list').appendChild(fragment);

        totalPages = responseData.total_pages;

    }
    let requist = new XMLHttpRequest();
    requist.addEventListener('load',render);
    // requist.addEventListener('error',errorfunction);
    requist.open('get','https://reqres.in/api/users?page=' + page);
    requist.send();

  
}

    document.getElementById('previous').addEventListener('click', function() {
        if (currentPage === 1) {
            return
        }
        currentPage -= 1;
        getUser(currentPage);
    })
    document.getElementById('next').addEventListener('click', function() {
        if (currentPage === totalPages) {
            return
        }
        currentPage += 1;
        getUser(currentPage);
    })

    getUser(currentPage);
