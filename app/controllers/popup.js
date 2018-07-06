// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function defineName(e){
    if($.txt_name.getValue().trim() != ""){
        args.params.index.remove($.popup);
        args.params.callback($.txt_name.getValue());
    }
}

$.txt_name.addEventListener("change", function(e){
    if($.txt_name.getValue().trim() == "")
        $.btn_confirm.setBackgroundColor("#969696");
    else
        $.btn_confirm.setBackgroundColor("#2188c7");
});
