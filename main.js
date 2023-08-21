
let data=[
    {
        id:0,
        name:'Lucy',
        age:'20',
        email:'lucy@gmail.com'
    },
    {
        id:1,
        name:'Adam',
        age:'24',
        email:'adam@gmail.com'
    }
]


function readData(){
    localStorage.setItem('object', JSON.stringify(data));
    let tableData=document.querySelector(".data_table");

    let object=localStorage.getItem('object');
    let objectData=JSON.parse(object);
    let elements='';

    objectData.forEach(record => {
        elements += `
        <tr>
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.age}</td>
            <td>${record.email}</td>
            <td class="action_btns">
                <button onclick="editData(${record.id})">Edit</button>
                <button onclick="deleteData(${record.id})">Delete</button>
            </td>
        </tr>`;
})
    tableData.innerHTML=elements;
}


function editData(id){
    document.querySelector('.update_form').classList.add('active');
    let obj=data.find(rec=>rec.id===id);
    let form = document.querySelector('.update_form');
    form.setAttribute('data-id', obj.id);
    document.querySelector('#name_update').value=obj.name;
    document.querySelector('#age_update').value=obj.age;
    document.querySelector('#email_update').value=obj.email; 
}


// update
function updateData(id){
    let name = document.querySelector('#name_update').value;
    let age = document.querySelector('#age_update').value;
    let email = document.querySelector('#email_update').value; 
    let idForm=event.target.parentElement.getAttribute('data-id');

    // console.log(event.target.parentElement.getAttribute('data-id'));

    let objIndex = data.findIndex(rec => rec.id === +idForm);
    console.log(objIndex);
    let errorMsg_update=document.querySelector('.errorMsg_update')
    if (objIndex !== -1) {
        if(updateValidation()){
            data[objIndex].name = name; 
            data[objIndex].age = age;
            data[objIndex].email = email;
            errorMsg_update.innerHTML='';

        } else{
            errorMsg_update.innerHTML="Please fill the inputs correctly!"
            return false;
        }
    }
        readData();
    document.querySelector('.update_form').classList.remove('active');
}


let update_btn=document.querySelector(".update_btn");


function deleteData(id){
    data=data.filter(rec=>rec.id!==id);
    readData();
}

function addData(){
    let name=document.querySelector('#name_create').value;
    let age=document.querySelector('#age_create').value;
    let email=document.querySelector('#email_create').value;
    let errorMsg=document.querySelector('#errorMsg')

    
    if(createValidation()){
        let newObj=
        {
            id:data.length+1,
            name:name,
            age:age,
            email:email
        }
        data.push(newObj);
        document.querySelector('#name_create').value = '';
        document.querySelector('#age_create').value = '';
        document.querySelector('#email_create').value = '';
        errorMsg.innerHTML='';
        readData();
    }else{
        errorMsg.innerHTML="Please fill all the inputs correctly!"
    }

}

function createValidation(){
    let name=document.querySelector('#name_create').value;
    let age=document.querySelector('#age_create').value;
    let email=document.querySelector('#email_create').value;
    if(name!=""&&age!=""&&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }
    else{
        return false;
    }
}

function updateValidation(){
    let name=document.querySelector('#name_update').value;
    let age=document.querySelector('#age_update').value;
    let email=document.querySelector('#email_update').value;
    if(name!=""&&age!=""&&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }
    else{
        return false;
    }
}