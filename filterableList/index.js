function filtering(){
    document.getElementById('nameFilter').addEventListener('keyup',filter);
    function filter(){
        const name = document.getElementById('nameFilter').value;
        console.log(name);
        const nameList = document.querySelectorAll('.names li');
        Array.from(nameList).forEach(function(element){
            if(element.textContent.toLowerCase().indexOf(name.toLowerCase()) == -1){
                element.style.display = 'none';
            } else{
                element.style.display = 'block';
            }
        });
    }
}

function init(){
    filtering();
}
init();