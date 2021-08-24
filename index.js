$("select#site").change(function ()
    {
        siteIblock = $(this).val();
        if (siteIblock == 44) $("input[name=SORT_FIELD]").val("PROVIDERS_SADOVOD");
        else $("input[name=SORT_FIELD]").val("DATE_CREATE");

        $.blockUI({
            message: "<p>Пожалуйста подождите...</p>",
            css: { backgroundColor: "#f00", color: "#fff" },
            overlayCSS: { backgroundColor: "#000", opacity: 0.1, cursor: "wait" }
        });
        $("#catalogs").load(
            "/local/ajax/pro.php",
            { id: siteIblock, obj: "catalog" },
            function ()
            {
                $("#intable").html("");
                $.unblockUI();
            }
        );

        $.blockUI({
            message: "<p>Пожалуйста подождите...</p>",
            css: { backgroundColor: "#f00", color: "#fff" },
            overlayCSS: { backgroundColor: "#000", opacity: 0.1, cursor: "wait" }
        });
        $("#providers").load(
            ajaxPath + "/ajax.php",
            { id: siteIblock, code: "providers" },
            function ()
            {
                if (siteIblock == 44) $("#providers").attr("name", "providers_sadovod");
                else $("#providers").attr("name", "providers");

                if (typeof option[siteIblock] == "undefined")
                {
                    optionHTML[siteIblock] = $("#providers").html();
                    option[siteIblock] = $("#providers option").clone();
                }

                $.unblockUI();
            }
        );

        if (newItem)
        {
            $("#dev-table")
                .find("tr.new-item")
                .html("");
            newItem = false;
        }
    });
