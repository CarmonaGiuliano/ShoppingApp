//https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js

function newListClick() {
  var newPost = document.getElementById("newPost");
  var newListBtn = document.getElementById("newListBtn");
  if (newPost.style.display === "none") {
    newPost.style.display = "block";
    newListBtn.style.display = "none";
    document.getElementById("ptype").selectedIndex = "-1";
  } else {
    newPost.style.display = "none";
    newListBtn.style.display = "block";
  }
}
function validateForm(){
  var formData = new FormData();
  var myForm = document.getElementById('productForm');
  formData = new FormData(myForm);
  console.log(formData);

  var check = checkForNum(document.getElementById("pamount").value);
  if (check === true){
    document.getElementById("flagNum").style.display = "block";
  }
  else {
    document.getElementById("flagNum").style.display = "none";
  }
/*  check = checkForNum(document.getElementById("pprice").value);
  if (check === true){
    document.getElementById("flagPrice").style.display = "block";
  }
  else {
    document.getElementById("flagPrice").style.display = "none";
  }*/

}
function checkForNum(inputValue) {
  // Get the value of the input field with id="numb"
 // inputValue = document.getElementById("pamount").value;
  const limitQuantity = 10000;

  // If x is Not a Number or less than one or greater than 10
  if (isNaN(inputValue) || inputValue < 1 || inputValue > limitQuantity) {
    return true;
  } else {
    return false;
  }
}

$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() {
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") { return; }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(",") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(",");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "R$" + left_side + "," + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "R$" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ",00";
    }
  }

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}
