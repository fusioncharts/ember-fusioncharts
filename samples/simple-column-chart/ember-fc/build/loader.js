/* eslint-disable */
$.ajax({
    url: '../../data.json',
    async: true,
    success: function(data) {
        $('#status').hide();
        window.loadApp(data);
    },
    error: function(err) {
        $('body').html(`<span class="error">Error</span>: Sample data could not be loaded!`);
    }
});
