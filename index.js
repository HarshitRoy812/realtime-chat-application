const submitBtn = document.getElementById('submit_btn');

submitBtn.addEventListener('click',async (e) => {
    e.preventDefault();
    var user_name = document.getElementById('name').value;
    
    if (user_name == ''){
        alert('Enter a name');
        return;
    }
    sessionStorage.setItem('name',user_name);

    window.open('http://127.0.0.1:5500/public/homepage.html','_self');
})