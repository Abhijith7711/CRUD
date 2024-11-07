var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
    if(validateForm()){
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm(); 

    }
}
        
 


function validateForm() {
    var isValid = true;
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Email pattern regex
    var mobilePattern = /^\d{10}$/; // Mobile number pattern regex

    // Validate email
    var email = document.getElementById("email").value;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        isValid = false;
    } else {
        var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
        for (var i = 0; i < table.rows.length; i++) {
            if (table.rows[i].cells[1].innerHTML === email) {
                alert("Email already exists. Please enter a different email address.");
                isValid = false;
                break;
            }
        }
    }

    // Validate mobile number
    var mobile = document.getElementById("mobile").value;
    if (!mobile.match(mobilePattern)) {
        alert("Invalid Mobile number.");
        isValid = false;
    }

    return isValid;
}



//Retrieve the data
function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["course"] = document.getElementById("course").value;
    formData["mobile"] = document.getElementById("mobile").value;
     // Retrieve selected gender
     var genderOptions = document.getElementsByName("gender");
     for (var i = 0; i < genderOptions.length; i++) {
         if (genderOptions[i].checked) {
             formData["gender"] = genderOptions[i].value;
             break;
         }
     }
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.course;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.mobile;
    cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
        cell5 = newRow.insertCell(4);  // New cell for gender
    cell5.innerHTML = data.gender; // Display gender value here

    
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("course").value = selectedRow.cells[2].innerHTML;
    document.getElementById("mobile").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.course;
    selectedRow.cells[3].innerHTML = formData.mobile;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("course").value = '';
    document.getElementById("mobile").value = '';
    selectedRow = null;
}
