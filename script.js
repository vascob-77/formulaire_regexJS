const form = document.querySelector('form');
const inputs = document.querySelectorAll("input[type=text],input[type='password']");
const progressBar = document.getElementById('progress-bar');
let pseudo,email,password,confirmPassword;

const errorDisplay = (tag,message,valid) => {
    
    const container = document.querySelector(`.${tag}-container`);
    const span = document.querySelector(`.${tag}-container > span`);

    if(!valid){
        container.classList.add('error');
        span.textContent = message;
    }else{
        container.classList.remove('error');
        span.textContent = "";
    }
}

const pseudoChecker = (value) => {
 
  if(value.length < 3 || value.length > 20){
    
    errorDisplay("pseudo","Le pseudo doit contenir entre 3 et 20 caractères",false);
    pseudo = null;

  }else if(!value.match(/^[a-zA-Z0-9_.-]*$/)){

    errorDisplay("pseudo","Le pseudo ne doit pas contenir de caractères spéciaux",false)
    pseudo = null;

  }else{
   
    errorDisplay("pseudo","",true);
    pseudo = value;

  }
};

const emailChecker = (value) => {

 if(!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
   
    errorDisplay("email","Le mail n'est pas valide",false);
    email = null;
    progressBar.classList.add('progressRed');
    
 }else{
     
     errorDisplay("email","",true);
     email = value;
 }

};


const passwordChecker = (value) => {

    progressBar.classList = "";

    if(!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)){
        errorDisplay('password','Le mot de passe doit contenir une majuscule, minimun 8 caractères et un chiffre',false);
        progressBar.classList.add('progressRed');
        password = null;

    }else if(value.length < 10){
        errorDisplay('password','',true)
        progressBar.classList.add('progressBlue');
        password = value;

    }else{
        errorDisplay('password','',true);
        progressBar.classList.add('progressGreen');
        password = value;
    }
    if(confirmPassword) confirmChecker(confirmPassword);
};


const confirmChecker = (value) => {

    if(value !== password){
       errorDisplay('confirm','Les mots de passe ne correspondent pas',false);
       confirmPassword = false;
    } else{
       console.log("mdp identique");
       errorDisplay('confirm','',true);
       confirmPassword = true;
    }

};


inputs.forEach((input) => {
    input.addEventListener('input',(e) => {
        switch(e.target.id){
            case 'pseudo':
                pseudoChecker(e.target.value);
                break;
            case 'email':
                emailChecker(e.target.value);
                break;
            case 'password':
                passwordChecker(e.target.value);
                break;
            case 'confirm':
                confirmChecker(e.target.value);
                break;
        }
    })
})

form.addEventListener('submit',(e) => {
    e.preventDefault();
    if(pseudo && email && password && confirmPassword){
        const data = {
            pseudo: pseudo,
            email: email,
            password: password,
        }
        
        progressBar.classList = "";
        inputs.forEach((input) =>  {
            input.value ="";
        })

        alert('Inscription validée !');
        pseudo,email,password,confirmPassword = null;
        
    }else{
        alert('Veuillez remplir tous les champs !');
    }
})