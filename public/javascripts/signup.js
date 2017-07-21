function validarSenha() {
  if (password.value.length >= 6 && confirm_password.value.length >= 6) {
    if (password.value == confirm_password.value) {
      password.setCustomValidity('');
      confirm_password.setCustomValidity('');
    } else {
      confirm_password.setCustomValidity("Senhas diferentes!");
    }
  } else {
    password.setCustomValidity("A senha deve conter pelo menos 6 caracteres");
  }
  if (phone.value.length >= 13) {
    phone.setCustomValidity('');
  } else {
    phone.setCustomValidity("Telefone inválido");
  }
}

function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mascaraTelefone(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1)$2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos

    return v;
}
