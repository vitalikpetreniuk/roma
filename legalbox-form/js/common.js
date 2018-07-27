var regions = [];

$(function() {
    $('.help-tip').on('click', function () {
        if($(this).find('p').is(':visible')){
            $(this).find('p').fadeOut();
        }else{
            $('.help-tip').find('p').fadeOut();
            $(this).find('p').fadeToggle();
        }
    });
    $.getJSON( "js/cities.json", function(json){
        $.each(json.regions, function(i, item){
            regions.push(item);
        });
    });

    $('.menu-toggle').on('click', function () {
        $('.menu-block').addClass('active');
    });

    $('.menu-block-close').on('click', function () {
        $('.menu-block').removeClass('active');
    });

    if($('.form-data-list').length){
        $('.form-data-list').scrollbar();
    }

    $('.section-form-bottom .bttn').on('click', function (e) {
        e.preventDefault();

        var validation = checkForm($('.question-in-slider'));
        if($('.question-in-slider .input-inn').length){
            var region = findINN($('.input-inn').val());

            console.log(region);
        }

        console.log(validation);
    });



    $('.form-double input[type="text"]').on('focus', function () {
        $(this).closest('.form-double').find('input').prop('checked', true);
        $(this).closest('.form-double').siblings('.add-form.bttn').removeClass('form-hidden');
    });

    //==========Pop-Up-Validity-Form===============//
    $('.pop-up__close').on('click', function () {
        $(this).parents($('.pop-up__validity')).removeClass('active');
    });
    //==========Pop-Up-Validity-Form===============//


    $("input[type='radio'], input[type='checkbox']").on('click', function () {
        var parent = $(this).parents('.form-checkbox-list');
        var inputType = $(this).attr('type');

        if(inputType == 'radio'){
            parent.find("input[type='radio']").removeClass('input-error');
        } else if(inputType == 'checkbox') {
            parent.find("input[type='checkbox']").removeClass('input-error');
        }

    });

    $("input").on('keydown', function () {
        var inputType = $(this).attr('type');
        if(inputType != 'radio' && inputType != 'checkbox'){
            $(this).removeClass('input-error');
        }
    });

});

function findINN(value){

    var name;

    $.each(regions, function(i, item){
        var code = value.substring(0, item.code.length);

        if(parseInt(code) == parseInt(item.code)){
            name  = item.name;

            return false;
        }
    });

    return name;

}

Array.prototype.in_array = function(p_val) {
    for(var i = 0, l = this.length; i < l; i++)	{
        if(this[i] == p_val) {
            return true;
        }
    }
    return false;
}


// example: div = $('.question-in-slider')
function checkForm(div) {
    var validate = new Array();
    var form_found = div.find('.form-found:not(.form-hidden)');

    div.each(function () {
        form_found.each(function () {
            var validateRd = new Array();
            var notFilledRd = true;

            $(this).find('.form-checkbox-item').each(function () {
                var radio = $(this).find('input[type="radio"]');
                var inputType = radio.attr('type');

                if(inputType == 'radio'){
                    // console.log('radio');

                    if(radio.is(':checked') && radio.parent().hasClass('form-double')){
                        radio.parent().find('input[type="text"]').each(function () {
                            if($(this).val() != '') {
                                validateRd.push(true);
                            } else {
                                validateRd.push(false);
                                notFilledRd = false;
                            }
                        });
                    } else if(radio.is(':checked')) {
                        validateRd.push(true);
                    } else {
                        validateRd.push(false);
                    }

                    if(radio.is(':checked')){
                        validateRd.push(true);
                    } else {
                        validateRd.push(false);
                    }
                }
            });

            if($(this).find('input[type="radio"]').length != 0){
                if(!validateRd.in_array(true) || !notFilledRd){
                    validate.push(false);
                    $(this).find('input[type="radio"]').addClass('input-error');
                } else {
                    validate.push(true);
                }
            }
        });

        form_found.each(function () {
            var validateCh = new Array();
            var notFilledCh = true;

            $(this).find('.form-checkbox-item').each(function () {
                var checkbox = $(this).find('input[type="checkbox"]');
                var inputType = checkbox.attr('type');

                if(inputType == 'checkbox'){
                    // console.log('checkbox');

                    if(checkbox.is(':checked') && checkbox.parent().hasClass('form-double')){
                        checkbox.parent().find('input[type="text"]').each(function () {
                            if($(this).val() != '') {
                                validateCh.push(true);
                            } else {
                                validateCh.push(false);
                                notFilledCh = false;
                            }
                        });
                    } else if(checkbox.is(':checked')) {
                        validateCh.push(true);
                    } else {
                        validateCh.push(false);
                    }
                }

            });

            if($(this).find('input[type="checkbox"]').length != 0){
                if(!validateCh.in_array(true) || !notFilledCh){
                    validate.push(false);
                    $(this).find('input[type="checkbox"]').addClass('input-error');
                } else {
                    validate.push(true);
                }
            }
        });

        form_found.each(function () {
            var input = $(this).find('input');

            if(!$(this).hasClass('form-one') && !input.parents('.form-found-item').hasClass('form-hidden')){
                input.each(function () {
                    var inputType = $(this).attr('type');

                    if(!$(this).parents('.form-checkbox-item').hasClass('form-double') && (inputType != 'radio' && inputType != 'checkbox') && !$(this).parents('.form-found-list').hasClass('form-hidden')){
                        if(!$(this).hasClass('input-inn')){
                            if($(this).val() != ''){
                                validate.push(true);
                            } else {
                                validate.push(false);
                                $(this).addClass('input-error');
                            }
                        } else {
                            if($.isNumeric($(this).val()) && ($(this).val().length == 10 ||  $(this).val().length == 12)){
                                validate.push(true);
                            } else {
                                validate.push(false);
                                $(this).addClass('input-error');
                            }
                        }
                    }
                })
            } else {
                // console.log('text');
                $(this).find('.form-found-item:not(.form-hidden)').each(function () {
                    var input = $(this).find('input');

                    input.each(function () {
                        var inputType = $(this).attr('type');

                        if(!$(this).hasClass('input-inn')){
                            if($(this).val() != ''){
                                validate.push(true);
                            } else {
                                validate.push(false);
                                $(this).addClass('input-error');
                            }
                        }
                    })

                });
            }
        });

        div.find('.form-found-list:not(.form-hidden)').each(function () {
            var item = $(this);

            if(item.find('.form-copy').length != 0) {
                item.find('.form-copy').each(function () {
                    // console.log('text');
                    if (item.find('.form-copy').length == 1) {
                        $(this).find('input').each(function () {
                            if ($(this).val() == '') {
                                validate.push(false);
                                $(this).addClass('input-error');
                            } else {
                                validate.push(true);
                            }
                        });
                    } else {
                        if (!$(this).is(':last-child')) {
                            $(this).find('input').each(function () {
                                if ($(this).val() == '') {
                                    validate.push(false);
                                    $(this).addClass('input-error');
                                } else {
                                    validate.push(true);
                                }
                            });
                        }
                    }
                });
            } else {
                item.find('.form-found-item:not(.form-hidden)').each(function () {
                    var input = $(this).find('input');

                    input.each(function () {
                        var inputType = $(this).attr('type');

                        if(!$(this).hasClass('input-inn')){
                            if($(this).val() != ''){
                                validate.push(true);
                            } else {
                                validate.push(false);
                                $(this).addClass('input-error');
                            }
                        }
                    });
                });
            }
        });
    });
    // console.log(validate);
    return !validate.in_array(false);
}


function documentsJson(form) {
    var documents = [];
    var i = 1;

    form.find('.form-copy').each(function () {
        var document = $(this).find('.form-document').val();
        var place = $(this).find('.form-place').val();

        if (form.find('.form-copy').length == 1) {
            var this_doc = new Object();

            this_doc.document = document;
            this_doc.place = place;

            documents.push(this_doc);
        } else {
            if (!$(this).is(':last-child')) {
                var this_doc = new Object();

                this_doc.document = document;
                this_doc.place = place;

                documents.push(this_doc);
            }
        }

//
    });

    // alert(JSON.stringify(documents));
    return JSON.stringify(documents);
}

function goalsJson(form) {
    var goals = [];
    var i = 1;

    form.find('.form-input').each(function () {
        var goal = $(this).val();

        goals.push(goal);
//
    });

    // alert(JSON.stringify(goals));
    return JSON.stringify(goals);
}