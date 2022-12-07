function category_detail() {
    var e = $("#neworder_category").val();
    $.post(
        "ajax_data",
        { action: "services_list", category: e },
        function (e) {
            $("#neworder_services").html(e.services), service_detail();
            $("#neworder_services > option[value=" + $("#neworder_services").val() + "]").attr("selected", true);
            
            
            setList(0);
            setList(1);
            $("#orderform-service").html($("#orderform-service").attr("data-label")+": "+$("#neworder_services").val());

        },
        "json"
    );
}

function service_detail() {
    var e = $("#neworder_services").val();
    $.post(
        "ajax_data",
        { action: "service_detail", service: e },
        function (e) {
            
            if (e.avarageTime) {
                    $("#tamamlanmaSuresiDiv").show();
                    $("#tamamlanmaSuresi").text(e.avarageTime);
                } else {
                    $("#tamamlanmaSuresiDiv").hide();
                }
            
            
            1 == e.empty ? $("#charge_div").hide() : ($("#charge_div").show(), $("#neworder_fields").html(e.details), $("#charge").val(e.price)),
                $(".datetime")
                    .datepicker({ format: "dd/mm/yyyy", language: "en", startDate: new Date() })
                    .on("change", function (e) {
                        $(".datetime").datepicker("hide");
                    }),
                $("#clearExpiry").click(function () {
                    $("#expiryDate").val("");
                }),
                $("#dripfeedcheckbox").prop("checked") && $("#dripfeed-options").removeClass(),
                comment_charge(),
                $("#dripfeedcheckbox").prop("checked") && dripfeed_charge(),
                e.sub ? $("#charge_div").hide() : $("#charge_div").show();
                
                $("#orderform-service").html($("#orderform-service").attr("data-label")+": "+$("#neworder_services").val());
                
                
                
                
            if( jQuery.inArray( $("#neworder_services").val(), favoriServiceList ) >= 0 ){
                $(".favoriAddBtn").html('<span class="fa fa-star"></span> Favorilerden Ã‡Ä±kar').attr("data-id", $("#neworder_services").val());
            }else{
                $(".favoriAddBtn").html('<span class="fa fa-star"></span> Favorilere Ekle').attr("data-id", $("#neworder_services").val());
            }
                
        },
        "json"
    );
}

function comment_charge() {
    var e = $("#neworder_services").val(),
        r = $("#neworder_comment").val();
    r && $.post("ajax_data", {
        action: "service_price",
        service: e,
        comments: r
    }, function(e) {
        $("#neworder_quantity").val(e.commentsCount), $("#charge").val(e.price)
    }, "json")
}

function dripfeed_charge() {
    var e, r = $("#neworder_services").val(),
        n = $("#neworder_quantity").val(),
        a = $("#dripfeed-runs").val();
    e = $("#dripfeedcheckbox").prop("checked") ? "var" : "bos", $.post("ajax_data", {
        action: "service_detail",
        service: r,
        quantity: n,
        dripfeed: e,
        runs: a
    }, function(e) {
        $("#charge").val(e.price)
    }, "json")
}

function updateServiceList(e) {
    var r, n = window.sessionStorage.getItem("postservices"),
        a = $("#neworder_category").val(),
        i = 0;
    $("#neworder_services").html(""), $.each(serviceArray.services, function(e, r) {
        var t;
        r.cid == a && (i++, t = $("<option></option>").attr("value", r.id).text(r.name + " - " + priceFormat(r.price) + " " + generalList.currency_name).attr("data-type", r.type).attr("data-array", e), n == r.id && t.attr("selected", !0), $("#neworder_services").append(t))
    }), 0 == i ? (r = $("<option></option>").attr("value", 0).text(generalList.label_list.no_service), $("#neworder_services").append(r)) : updateDetail(e)
}

function deleteSession() {
    $.each(window.sessionStorage, function(e, r) {
        window.sessionStorage.removeItem(e)
    })
}

function getSession(e) {
    return window.sessionStorage.getItem("post" + e)
}

function clearFields() {
    $("#field-orderform-fields-link").val(""), $("#neworder_quantity").val(""), $("#neworder_comment").val(""), $("#username").val(""), $("#field-orderform-fields-posts").val(""), $('[name="min"]').val(""), $('[name="max"]').val(""), $("#field-orderform-fields-delay").val("0"), $("#expiryDate").val(""), $("#order_link").addClass("hidden"), $("#order_quantity").addClass("hidden"), $(".min-max").addClass("hidden"), $("#order_comment").addClass("hidden"), $("#order_username").addClass("hidden"), $("#order_auto").addClass("hidden"), $("#dripfeed").addClass("hidden")
}

function updateDetail(e) {
    var r = $("#neworder_services").find(":selected").attr("data-array"),
        n = serviceArray.services[r].type,
        a = serviceArray.services[r].max,
        i = serviceArray.services[r].min,
        t = serviceArray.services[r].link_type,
        l = serviceArray.services[r].dripfeed;
    t = 1 == t ? "link_url" : "link_username";
    updateDescription(e), 1 == n ? ($("#order_link > label").text(generalList.label_list[t]), $("#order_link").removeClass("hidden"), $("#order_quantity").removeClass("hidden"), $(".min-max").removeClass("hidden").text("Min: " + i + " Max:" + a), $("#neworder_quantity").attr("disabled", !1)) : 2 == n ? ($("#order_link > label").text(generalList.label_list[t]), $("#order_link").removeClass("hidden")) : 3 == n ? ($("#order_link > label").text(generalList.label_list[t]), $("#order_link").removeClass("hidden"), $("#order_quantity").removeClass("hidden"), $("#order_comment").removeClass("hidden"), $("#neworder_quantity").attr("disabled", !0)) : 4 == n ? ($("#order_link > label").text(generalList.label_list[t]), $("#order_link").removeClass("hidden"), $("#order_comment").removeClass("hidden")) : 5 == n ? ($("#order_link > label").text(generalList.label_list[t]), $("#order_link").removeClass("hidden"), $("#order_username").removeClass("hidden"), $("#order_quantity").removeClass("hidden"), $("#neworder_quantity").attr("disabled", !1)) : 11 == n || 12 == n ? ($("#order_username").removeClass("hidden"), $("#order_auto").removeClass("hidden"), $("#order_min > .min-max").removeClass("hidden").text("Min: " + i + " Max:" + a)) : 14 != n && 15 != n || $("#order_username").removeClass("hidden"), l && $("#dripfeed").removeClass("hidden"), $(".datetime").datepicker({
        format: "dd/mm/yyyy",
        language: "tr",
        startDate: new Date
    }).on("change", function(e) {
        $(".datetime").datepicker("hide")
    }), $("#clearExpiry").click(function() {
        $("#expiryDate").val("")
    }), getSession("link") && $("#field-orderform-fields-link").val(getSession("link")), getSession("quantity") && $("#neworder_quantity").val(getSession("quantity")), getSession("username") && $('[name="username"]').val(getSession("username")), getSession("posts") && $("#field-orderform-fields-posts").val(getSession("posts")), getSession("expiry") && $("#expiryDate").val(getSession("expiry")), getSession("min") && $('[name="min"]').val(getSession("min")), getSession("max") && $('[name="max"]').val(getSession("max")), getSession("delay") && $('[name="delay"]').val(getSession("delay")), getSession("comments") && $("#neworder_comment").val(getSession("comments").replace(new RegExp("<br>", "g"), "\r\n")), updateRate(e)
}

function updateDescription(e) {
    var r = $("#neworder_services").find(":selected").attr("data-array"),
        n = serviceArray.services[r].description;
    0 < n.length ? ($("#neworder_fields").append(e.description.replace("{{description}}", n)), $("#description").css("display", "")) : $("#description").css("display", "none")
}

function updateRate(e) {
    var r, n, a = $("#neworder_services").find(":selected").attr("data-array"),
        i = serviceArray.services[a].price,
        t = $("#neworder_quantity").val(),
        l = $("#neworder_comment").val(),
        o = $("#dripfeedcheckbox").prop("checked"),
        s = $("#dripfeed-runs").val();
    $.isNumeric(t) || (t = 0), o || (s = 1), s = s || 1, l = l || "", 2 == serviceArray.services[a].type || 4 == serviceArray.services[a].type || 14 == serviceArray.services[a].type || 15 == serviceArray.services[a].type || (1 == serviceArray.services[a].type || 5 == serviceArray.services[a].type && t ? i = i * t * s / 1e3 : 11 == serviceArray.services[a].type || 12 == serviceArray.services[a].type ? r = !0 : 3 == serviceArray.services[a].type && (0 == l.length ? (t = 0, i = null, $("#neworder_quantity").val("")) : (i = i * (t = l.split("\n").length) / 1e3, $("#neworder_quantity").val(t)))), r ? $("#charge_div").hide() : null != i && 0 != i ? ($("#charge_div").show(), $("#charge").val(priceFormat(i) + " " + generalList.currency_name)) : ($("#charge_div").show(), $("#charge").val("")), o && (0 == (n = t * s) && (n = ""), $("#dripfeed-totalquantity").val(n))
}

function priceFormat(e) {
    e.toString().split("."), e < 0 && (e = Math.abs(e)), console.log(parseFloat(e))
}

function priceFormat(e) {
    var r = e.toString().split(".");
    return r[1] ? 1 == r[1].length ? e + "0" : e : e + ".00"
}
$(document).ready(function() {
    category_detail(), $("#neworder_category").change(function() {
        category_detail()
    }), $("#neworder_services").change(function() {
        service_detail()
    }), $(document).on("keyup", "#order_quantity", function() {
        var e, r = $("#neworder_services").val(),
            n = $("#neworder_quantity").val(),
            a = $("#dripfeed-runs").val();
        e = $("#dripfeedcheckbox").prop("checked") ? "var" : "bos", $.post("ajax_data", {
            action: "service_price",
            service: r,
            quantity: n,
            dripfeed: e,
            runs: a
        }, function(e) {
            $("#charge").val(e.price), $("#dripfeed-totalquantity").val(e.totalQuantity)
        }, "json")
    }), $(document).on("keyup", "#dripfeed-runs", function() {
        var e, r = $("#neworder_services").val(),
            n = $("#neworder_quantity").val(),
            a = $("#dripfeed-runs").val();
        e = $("#dripfeedcheckbox").prop("checked") ? "var" : "bos", $.post("ajax_data", {
            action: "service_price",
            service: r,
            quantity: n,
            dripfeed: e,
            runs: a
        }, function(e) {
            $("#charge").val(e.price), $("#dripfeed-totalquantity").val(e.totalQuantity)
        }, "json")
    }), $(document).on("keyup", "#neworder_comment", function() {
        comment_charge()
    }), $(document).on("change", "#dripfeedcheckbox", function() {
        $(this).prop("checked") ? $("#dripfeed-options").removeClass() : $("#dripfeed-options").addClass("hidden"), dripfeed_charge()
    })
}), $(document).ready(function() {
    var e, r = {
        description: '<div class="form-group hidden fields" id="description">\n<label for="service_description" class="control-label">' + generalList.label_list.description + '</label>\n<div class="panel-body border-solid border-rounded" id="service_description">\n{{description}}</div>\n</div>',
        quantity: '<div class="form-group hidden fields" id="order_quantity">\n<label class="control-label" for="field-orderform-fields-quantity">' + generalList.label_list.quantity + '</label>\n<input class="form-control" name="quantity" value="" type="text" id="neworder_quantity" disabled="" autocomplete="off">\n</div>\n<small class="help-block hidden min-max">Min: {{min}} - Max: {{max}}</small>',
        link: '<div class="form-group hidden fields" id="order_link">\n<label class="control-label" for="field-orderform-fields-link">{{label}}</label>\n<input class="form-control" name="link" value="" type="text" id="field-orderform-fields-link">\n</div>',
        comments: '<div class="form-group hidden fields" id="order_comment">\n<label class="control-label">' + generalList.label_list.comments + '</label>\n<textarea class="form-control counter" name="comments" id="neworder_comment" cols="30" rows="10" data-related="quantity"></textarea>\n</div>',
        username: '<div class="form-group hidden fields" id="order_username">\n<label class="control-label" for="field-orderform-fields-quantity">' + generalList.label_list.link_username + '</label>\n<input class="form-control" name="username" value="" type="text">\n</div>',
        dripfeed: '<div class="hidden" id="dripfeed">\n<div class="form-group fields" id="order_check">\n<label class="control-label has-depends " for="dripfeedcheckbox">\n<input name="check" value="1" type="checkbox" id="dripfeedcheckbox">\n' + generalList.label_list.dripfeed + '\n</label>\n<div class="hidden" id="dripfeed-options">\n<div class="form-group">\n<label class="control-label" for="dripfeed-runs">' + generalList.label_list.runs + '</label>\n<input class="form-control" name="runs" value="" type="text" id="dripfeed-runs">\n</div>\n<div class="form-group">\n<label class="control-label" for="dripfeed-interval">' + generalList.label_list.interval + '</label>\n<input class="form-control" name="interval" value="" type="text" id="dripfeed-interval">\n</div>\n<div class="form-group">\n<label class="control-label" for="dripfeed-totalquantity">' + generalList.label_list.totalquantity + '</label>\n<input class="form-control" name="total_quantity" value="" type="text" id="dripfeed-totalquantity" readonly="">\n</div>\n</div>\n</div>\n</div>',
        auto: '<div id="order_auto" class="hidden"><div class="form-group fields">\n<label class="control-label" for="field-orderform-fields-posts">' + generalList.label_list.posts + '</label>\n<input class="form-control" name="posts" value="" type="text" id="field-orderform-fields-posts">\n</div>\n<div class="form-group fields" id="order_min">\n<label class="control-label" for="order_count">' + generalList.label_list.quantity + '</label>\n<div class="row">\n<div class="col-xs-6">\n<input type="text" class="form-control" id="order_count" name="min" value="" placeholder="Minimum">\n</div>\n<div class="col-xs-6">\n<input type="text" class="form-control" id="order_count" name="max" value="" placeholder="Maksimum">\n</div>\n</div>\n<small class="help-block min-max">Min: {{min}} - Max: {{max}}</small>\n</div>\n<div class="form-group fields" id="order_delay">\n<div class="row">\n<div class="col-xs-6">\n<label class="control-label" for="field-orderform-fields-delay">' + generalList.label_list.delay + '</label>\n<select class="form-control" name="delay" id="field-orderform-fields-delay">\n<option value="0">' + generalList.label_list.no_delay + '</option>\n<option value="300">5 ' + generalList.label_list.minute + '</option>\n<option value="600">10 ' + generalList.label_list.minute + '</option>\n<option value="900">15 ' + generalList.label_list.minute + '</option>\n<option value="1800">30 ' + generalList.label_list.minute + '</option>\n<option value="3600">60 ' + generalList.label_list.minute + '</option>\n<option value="5400">90 ' + generalList.label_list.minute + '</option>\n</select>\n</div>\n<div class="col-xs-6">\n<label for="field-orderform-fields-expiry">' + generalList.label_list.expiry + '</label>\n<div class="input-group" id="datetimepicker">\n<input class="form-control datetime" name="expiry" id="expiryDate" value="" type="text" autocomplete="off">\n<span class="input-group-btn">\n<button class="btn btn-default clear-datetime" id="clearExpiry" type="button"> <span class="fa fa-trash-o"></span></button>\n</span>\n</div>\n</div>\n</div>\n</div></div>',
        bank_template: '<div class="form-group payment_field">\n<label for="method" class="control-label">{{sender}}</label>\n<input class="form-control" name="payment_gonderen" value="">\n</div>',
        coupon_template: '<div class="form-group coupon_field">\n<label for="method" class="control-label">' + generalList.label_couponCode + '</label>\n<input class="form-control" name="coupon">\n</div>'
    };
    getSession("categories") && $("#neworder_category").val(getSession("categories")), null == $("#neworder_category").val() && $("#neworder_category").append("<option value='0'>" + generalList.label_list.no_category + "</option>"), $("#neworder_fields").append(r.link), $("#neworder_fields").append(r.quantity), $("#neworder_fields").append(r.comments), $("#neworder_fields").append(r.username), $("#neworder_fields").append(r.auto), $("#neworder_fields").append(r.dripfeed), "undefined" != typeof paymentMethods && (e = $('[name="payment_type"]'), paymentMethods[e.val()] && $.each(paymentMethods[e.val()].fields, function(n, a) {
        "bank_template" == n && 1 == a && (e.parent().after(generalList.bank_list), $("form button").before(r[n].replace("{{sender}}", generalList.label_list.addfunds_sender))), "coupon_code" == n && 1 == a && ($("form button").before(r.coupon_template), $('[name="payment_amount"]').parent().addClass("hidden"))
    }), getSession("payment_gonderen") && $('[name="payment_gonderen"]').val(getSession("payment_gonderen")), e.change(function() {
        $(".payment_field").remove(), $(".coupon_field").remove(), $('[name="payment_amount"]').parent().removeClass("hidden"), paymentMethods[e.val()] && $.each(paymentMethods[e.val()].fields, function(n, a) {
            "bank_template" == n && 1 == a && (e.parent().after(generalList.bank_list), $("form button").before(r[n].replace("{{sender}}", generalList.label_list.addfunds_sender))), "coupon_code" == n && 1 == a && ($("form button").before(r.coupon_template), $('[name="payment_amount"]').parent().addClass("hidden"))
        })
    })), "undefined" != typeof serviceArray && (updateServiceList(r), $("#neworder_category").change(function() {
        clearFields(), updateServiceList(r)
    }), $("#neworder_services").change(function() {
        clearFields(), updateDetail(r)
    }), $("#neworder_quantity").on("keyup", function() {
        updateRate(r)
    }), $("#dripfeed-runs").on("keyup", function() {
        updateRate(r)
    }), $("#neworder_comment").on("keyup", function() {
        updateRate(r)
    }), $("#dripfeedcheckbox").on("change", function() {
        $("#dripfeedcheckbox").prop("checked") ? $("#dripfeed-options").removeClass() : $("#dripfeed-options").addClass("hidden"), updateRate(r)
    })), deleteSession()
});
sdfsdf