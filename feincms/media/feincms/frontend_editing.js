jQuery(function($){
    var admin_base = '/admin/page/page/';

    fe_init_animations();

    var fe_tools = $('#fe_tools');
    fe_tools.children('a').click(function(){
        var fe_box = $(this).parents('div.fe_box');

        if(this.id == 'fe_tools_edit') {
            res = fe_box.attr('id').match(/([^\-]+)-(\d+)-(\d+)/);

            window.open(admin_base+res[2]+'/'+res[1]+'/'+res[3]+'/',
                'fe_editor',
                'height=500,width=800,resizable=yes,scrollbars=yes');
        }

        return false;
    });

    /* TODO: Make this use the same hotlinking setting as the other admin tools */
    $.getScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js", function () {
        $(".fe_box").parent().sortable({
            forceHelperSize: true,
            forcePlaceholderSize: true,
            handle: ".thumb",
            helper: "clone",
            items: ".fe_box",
            placeholder: "ui-sortable-placeholder",
            tolerance: "pointer", 

            start: function (evt, ui) {
                $(ui.item).parent().find(".fe_box > .content").height(48);
                $(this).sortable('refreshPositions');
            },
            stop: function (evt, ui) {
                $(ui.item).parent().find(".fe_box > .content").height("auto");
            }
        });
    });
});

/*
    These are outside of the on-load closure so they're visible to outside
    callers such as feincms/templates/admin/feincms/fe_editor_done.html
*/

function fe_init_animations() {
    var fe_tools = $('#fe_tools');
    $('.fe_box').hover(
        function(){
            $(this).css('background', '#e8e8ff').animate({'opacity': 1}, 100).append(fe_tools);
            fe_tools.show();
        },
        function(){
            $(this).animate({'opacity': 0.6}, 100).css('background', 'none');
            fe_tools.hide();
        }
    );
}

function fe_update_content(identifier, content) {
    var region = $('#'+identifier);
    region.animate({'opacity': 0}).html(content);
    region.animate({'opacity': 1.5}).animate({'opacity': 0.6});
    fe_init_animations();
}