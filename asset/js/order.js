		  
		  function getAllUrlParams(url) {
		    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
		    var obj = {};
		    if (queryString) {
		      queryString = queryString.split('#')[0];
		      var arr = queryString.split('&');
		      for (var i=0; i<arr.length; i++) {
		        var a = arr[i].split('=');
		        var paramNum = undefined;
		        var paramName = a[0].replace(/\[\d*\]/, function(v) {
		          paramNum = v.slice(1,-1);
		          return '';
		        });
		        var paramValue = typeof(a[1])==='undefined' ? true : a[1];
		        paramName = paramName.toLowerCase();
		        paramValue = paramValue.toLowerCase();
		        if (obj[paramName]) {
		          if (typeof obj[paramName] === 'string') {
		            obj[paramName] = [obj[paramName]];
		          }
		          if (typeof paramNum === 'undefined') {
		            obj[paramName].push(paramValue);
		          }
		          else {
		            obj[paramName][paramNum] = paramValue;
		          }
		        }
		        else {
		          obj[paramName] = paramValue;
		        }
		      }
		    }
		    return obj;
		  }
	
		  $(document).ready(function(e) {
		    //ARE URL PARAMS SET
		    var bundle 			= getAllUrlParams().bundle;
		    var referral 		= getAllUrlParams().r;
		    var salesAgent 		= getAllUrlParams().sa;
		    var promo 	 		= getAllUrlParams().pc;
		    var referer 		= getAllUrlParams().referer;
			
			if(bundle == "res"){ bundle = "res4"}
			
		    if(!bundle){ 		bundle = "res4"; }
		    if(!referral){ 		referral = ""; }
		    if(!promo){ 		promo = ""; }
		    if(!referer){ 		referer = ""; }
		    if(!salesAgent){ 	salesAgent = ""; }
		    
		    $('.voyager-address-search').on('click', '.address-search-result', function(e) {
		        e.preventDefault();
		        var overlay = $('.address-preloader-overlay');
		        overlay.show();

                var gclid = document.getElementById('gclid_field').value;
                if (gclid != "") {
                    referer = "google:cpc:not-specified:gclid%3D" + gclid;
                }

		        var url = "{{ .Site.Params.signupwizard }}/api/orders?place_id=" + $(this).data('id') + "&product_group=" + bundle + "&promo_code=" + ( referral.toUpperCase() || promo.toUpperCase() ) + "&sales_agent=" + salesAgent.toUpperCase() + "&lead_source=" + referer;
		        var label = $(this).data('label');
		        var errorMsg = "";
		        var warning = $('.address-search-warning');
		        warning.click(); // hack to get search box out of focus
		        warning.hide();
		        $.post(url)
		            .done(function(guid) {
		            	gtag('event', 'addressSearch', {'event_category' : 'lookup', 'event_label' : 'success' });
		                document.location = "{{ .Site.Params.signupwizard }}/signup/order/" + guid
		            })
		            .fail(function (xhr) {
		                if (xhr.status === 404) {
		        			gtag('event', 'addressSearch', {'event_category' : 'lookup', 'event_label' : 'failed prequal' });
		        			gtag('event', 'failedSearch', {'event_category' : 'lookup', 'event_label' : label });
		                    errorMsg = "Sorry, we don???t seem to have enough information about what services are available at <b>" + label
		                        + "</b>. Please call us on 0800 4SPEED (0800 477333) and we???ll run a manual check so that you can proceed with your order."
		                } else {
		        			gtag('event', 'addressSearch', {'event_category' : 'lookup', 'event_label' : 'failed' });
		                    errorMsg = xhr.responseText || 'Sorry, something went wrong. Please try again later.'
		                }
		                warning.html(errorMsg).show();
		                overlay.hide();
		            })
		    });
		    
		    
		    
		    
		  });
