var setupContactForm = function () {
    var contactFormHost = 'https://djorak-github-io-contact-form.herokuapp.com/',
        form = $('#contact-form'),
        notice = form.find('#notice');

    if (form.length) {
        form.submit(function(ev) {
            ev.preventDefault();

            console.log('FORM', form.serialize());

            $.ajax({
                type: 'POST',
                url: contactFormHost + 'send_email',
                data: form.serialize(),
                dataType: 'json',
                success: function(response) {
                    switch (response.message) {
                        case 'success':
                            form.fadeOut(function() {
                                form.html('<h4>' + form.data('success') + '</h4>').fadeIn();
                            });
                            break;

                        case 'failure_captcha':
                            notice.text(notice.data('captcha-failed')).fadeIn();
                            break;

                        case 'failure_email':
                            notice.text(notice.data('error')).fadeIn();
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    notice.text(notice.data('error')).fadeIn();
                }
            });
        });
    }
}

setupContactForm();
