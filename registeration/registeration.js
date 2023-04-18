

let UserData = JSON.parse(localStorage.getItem('UserData'))||[]; 
let Alert  = document.querySelector('#alert');

document.querySelector('form').addEventListener('submit',(event)=>{
    event.preventDefault();
    let id  = Math.floor(Math.random()*10 +10).toString();
    let name = document.getElementById('name').value;
    if(name.length<4){
        Alert.innerText = "Username should be atleast 4 character's"
        Alert.style.display = 'block';
        setTimeout(() => {
            Alert.style.display = 'none';
        }, 2000);
        return false;
    }
    let age = document.getElementById('age').value;
    if(age<18||age>40){
        Alert.innerText = "Only peoples who are between 18 or 40 are allowed";
        Alert.style.display = 'block';
        setTimeout(() => {
            Alert.style.display = 'none';
        }, 2000);
        return false;
    }
    let designation = document.getElementById('designation').value;
    let vaccine = document.getElementById('vaccine').value;
    let priority = document.querySelectorAll('input[type="radio"]');
    let  priorityResult =''
    for(let i=0;i<priority.length;i++){
        if(priority[i].checked){
         priorityResult=priority[i].value;
        }
    }    
    if(!name||!age||!designation||!vaccine||!priorityResult){
        alert("Plese fill all the details!!");
        return false;
    }
    let  valid = validateUser(name,designation);
    if(valid){
        let details = {
        id,
        name,
        age,
        designation,
        vaccine,
        priorityResult,
    } 
    console.log(details)
    UserData.push(details);
    localStorage.setItem('UserData',JSON.stringify(UserData));
        // alert("Congratulations!! Registeration Completed")
        swal({
            title: `Thanks for Registeration ${name}!`,
            text: "Congratulations!! Registeration Completed",
            icon: "success",
            button: "Click here to continue",
          })
        //   .then(()=>{
            // location.replace('/dashboard/dashboard.html')
            ///location replace is not working else all things are working 
            // transition property in registeration will learn and apply in another project thanks 
            // website should after click on ohk 
        // });
        let input = document.querySelectorAll('input');
            for(let i=0;i<input.length-1;i++){
                input[i].value='';
            }
    }else{
    //    alert('Account already exists Please sign in'); 
       swal({
        title: `Account with this name ${name} already exist!`,
        text: "Account already exists",
        icon: "error",
        button: "Try Again",
      })
    //   .then(()=>{
    //     window.location = "";
    // });
    }
})

function validateUser(name,designation){
   let resu =  UserData.find((item)=>{
        return (item.designation == designation&&item.name == name);
    });
    if(resu){
        return false;
    }else{
        return true;
    }
}
