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
                } else {
                    validate.push(true);
                }
            }
        });

        form_found.each(function () {
            var input = $(this).find('input');
            var inputType = input.attr('type');

            if(!$(this).hasClass('form-one')){
                if(!input.parents('.form-checkbox-item').hasClass('form-double') && (inputType != 'radio' && inputType != 'checkbox')){
                    if(!input.hasClass('input-inn')){
                        if(input.val() != ''){
                            validate.push(true);
                        } else {
                            validate.push(false);
                        }
                    } else {
                        if($.isNumeric(input.val()) && (input.val().length == 10 ||  input.val().length == 12)){
                            validate.push(true);
                        } else {
                            validate.push(false);
                        }
                    }
                }
            } else {
                $(this).find('.form-found-item:not(.form-hidden)').each(function () {
                    var input = $(this).find('input');
                    var inputType = input.attr('type');

                    if(!input.hasClass('input-inn')){
                        if(input.val() != ''){
                            validate.push(true);
                        } else {
                            validate.push(false);
                        }
                    }
                });
            }
        });

        div.find('.form-found-list:not(.form-hidden)').each(function () {
            var item = $(this);

            if(item.find('.form-copy').length != 0) {
                item.find('.form-copy').each(function () {
                    if (item.find('.form-copy').length == 1) {
                        $(this).find('input').each(function () {
                            if ($(this).val() == '') {
                                validate.push(false);
                            } else {
                                validate.push(true);
                            }
                        });
                    } else {
                        if (!$(this).is(':last-child')) {
                            $(this).find('input').each(function () {
                                if ($(this).val() == '') {
                                    validate.push(false);
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
                    var inputType = input.attr('type');
                    if(!input.hasClass('input-inn')){
                        if(input.val() != ''){
                            validate.push(true);
                        } else {
                            validate.push(false);
                        }
                    }
                });
            }
        });
    })

    return !validate.in_array(false);
}