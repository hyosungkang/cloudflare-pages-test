$(document).ready(function() {

    $('.voyager-address-search').on('click', '.address-search-result', function(e) {
        e.preventDefault();
        var overlay = $('.address-preloader-overlay');
        overlay.show();
        var url = "https://signup.voyager.nz/api/orders?place_id=" + $(this).data('id') + "&product_group=res&referral_code=testing&referer=facebook";
        var label = $(this).data('label');
        var errorMsg = "";
        var warning = $('.address-search-warning');
        warning.click(); // hack to get search box out of focus
        warning.hide();
        $.post(url)
            .done(function(guid) {
            	ga('send', 'event', 'addressSearch', 'lookup', 'success');
                document.location = "https://signup.voyager.nz/signup/order/" + guid
            })
            .fail(function (xhr) {
                if (xhr.status === 404) {
					ga('send', 'event', 'addressSearch', 'lookup', 'failed prequal');
					ga('send', 'event', 'failedAddress', 'lookup', label);
                    errorMsg = "Sorry, we don’t seem to have enough information about what services are available at <b>" + label
                        + "</b>. Please call us on 0800 4SPEED (0800 477333) and we’ll run a manual check so that you can proceed with your order."
                } else {
					ga('send', 'event', 'addressSearch', 'lookup', 'failed');
                    errorMsg = xhr.responseText || 'Sorry, something went wrong. Please try again later.'
                }
                warning.html(errorMsg).show();
                overlay.hide();
            })
    })
});